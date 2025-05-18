chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "ping") {
        sendResponse({ ready: true });
        return true;
    }

    if (request.action === "analyze") {
        (async () => {
            const reviews = findReviews();
            if (reviews.length === 0) {
                sendResponse({ count: 0 });
                return;
            }

            const results = await analyzeReviews(reviews);
            highlightElements(results);
            sendResponse({ count: results.length });
        })();

        return true;
    }
});

// Review detection
const REVIEW_SELECTORS = {
    'amazon.com': ['.review-text-content', '.a-expander-content'],
    'twitter.com': ['[data-testid="tweetText"]'],
    'default': ['.review-content', '.review-text', '.comment-content']
};

function findReviews() {
    const hostname = window.location.hostname.replace('www.', '');
    const selectors = REVIEW_SELECTORS[hostname] || REVIEW_SELECTORS['default'];

    return Array.from(document.querySelectorAll(selectors.join(',')))
        .filter(el => !el.dataset.sentimentProcessed)
        .map(el => {
            el.dataset.sentimentProcessed = 'true';
            return {
                element: el,
                text: el.textContent.trim()
            };
        });
}

// Sentiment highlighting
function highlightElements(results) {
    chrome.storage.local.get(['highlightEnabled'], (result) => {
        if (result.highlightEnabled === false) return;

        results.forEach(item => {
            item.element.style.cssText = `
          background-color: ${getColorForSentiment(item.sentiment)};
          padding: 5px;
          border-radius: 3px;
          margin: 2px 0;
        `;
        });
    });
}

function getColorForSentiment(sentiment) {
    return {
        'positive': '#d4edda',
        'negative': '#f8d7da',
        'neutral': '#e2e3e5'
    }[sentiment] || '#e2e3e5';
}

// Backend communication
async function analyzeReviews(reviews) {
    try {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texts: reviews.map(r => r.text) })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        return reviews.map((review, i) => ({
            ...review,
            sentiment: data.results[i].sentiment
        }));

    } catch (error) {
        console.error('Backend failed, using mock analysis:', error);
        return reviews.map(review => ({
            ...review,
            sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)]
        }));
    }
}