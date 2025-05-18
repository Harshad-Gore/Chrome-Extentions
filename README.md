# Sentiment Analysis Chrome Extension

A Chrome extension that performs sentiment analysis on web page content, helping users understand the emotional tone of the text they're reading.

## Project Structure

The project consists of two main parts:
- **Chrome Extension**: Frontend part that interfaces with the browser
- **Server**: Backend Python service that handles sentiment analysis

## Features

- Real-time sentiment analysis of web content
- Popup interface showing sentiment scores
- Visual indicators of positive/negative/neutral sentiment
- Support for analyzing selected text or entire pages

## Installation

### Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `extension` folder from this project
4. The Sentiment extension icon should appear in your browser toolbar

### Server Setup

1. Make sure you have Python installed
2. Navigate to the `server` directory
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the server:
   ```
   python app.py
   ```

## How to Use

1. Click on the extension icon in your browser toolbar to see the current page's sentiment
2. Select specific text on a webpage and right-click to analyze just that selection
3. The popup will display sentiment scores and analysis

## Technical Details

- The extension uses content scripts to extract text from webpages
- Background scripts handle communication with the server
- The server uses a pre-trained machine learning model to analyze sentiment
- The model is trained on a dataset of text with labeled sentiments

## Development

To modify or extend this extension:
- Frontend code is in the `extension` directory
- Backend code is in the `server` directory
- The sentiment model is saved as `sentiment_model.pkl`
- The TF-IDF vectorizer is saved as `tfidf_vectorizer.pkl`

## License

[MIT License](LICENSE)
