# Sentiment Analysis Chrome Extension

A Chrome extension that performs sentiment analysis on web page content, helping users understand the emotional tone of the text they're reading.

## Project Structure

The project consists of two main parts:
- **Chrome Extension**: Frontend part that interfaces with the browser
- **Server**: Backend Python service that handles sentiment analysis

## Features

- **Real-time Sentiment Analysis**: Analyze web page content instantly as you browse
- **Interactive Popup Interface**: Clean, intuitive popup showing detailed sentiment scores
- **Visual Sentiment Indicators**: Color-coded indicators for positive (green), negative (red), and neutral (gray) sentiment
- **Selective Text Analysis**: Analyze specific text selections or entire web pages
- **Background Processing**: Non-intrusive analysis that doesn't interfere with browsing
- **Machine Learning Powered**: Uses pre-trained ML models for accurate sentiment detection
- **Cross-site Compatibility**: Works on most websites and text content
- **Lightweight Design**: Minimal impact on browser performance
- **Privacy Focused**: Text analysis is processed securely through local server

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

## Contact & Contributing

**Contact**: Discord - `raybyte`

Interested in contributing to this project? Feel free to reach out on Discord! I'm always open to:
- Bug reports and feature requests
- Code contributions and improvements
- Ideas for new sentiment analysis features
- General feedback and suggestions

You can also:
- Fork this repository and submit pull requests
- Open issues for bugs or feature requests
- Star the project if you find it useful!
