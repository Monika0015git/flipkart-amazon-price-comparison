# 📊 Product Price Comparison using Playwright

This project compares the price of **iPhone 15 Plus** on **Flipkart** and **Amazon** using Playwright and TypeScript.

## 🚀 Features

- Opens both Flipkart and Amazon.
- Verifies page URL and title to ensure successful navigation.
- Searches for iPhone 15 Plus on both sites.
- Ensures the same product appears in the search results and selects it.
- Extracts the price of the first matching product from each website.
- Compares the prices:
        ✅ If Flipkart's price is lower than Amazon’s, the test passes.
        ❌ Otherwise, the test fails and shows both prices in the console message.

## 🛠️ Tech Stack

- Playwright – for end-to-end browser automation
- TypeScript – for strong typing and modern JavaScript features
- Node.js – JavaScript runtime environment
- Visual Studio Code (VS Code) – as the code editor and development environment
- npm – to manage and install packages


## 📦 Installation

# Clone the repository
git clone https://github.com/Monika0015git/flipkart-amazon-price-comparison.git
# Navigate into the project directory
cd flipkart-amazon-price-comparison
# Install dependencies
npm install

## ▶️ Run the Test

Run the test on all three browsers supported by Playwright — Chromium, Firefox and WebKit — enabling effective cross-browser testing:

    npx playwright test


## 📝 Notes

- This test fetches live data, so a stable internet connection is needed.
- Flipkart sometimes shows popups — don’t worry, the script handles them.
- Product prices keep changing — results might differ each time you run the test.

### 📸 Test Execution Screenshot
