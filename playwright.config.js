// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      headless: false,
      launchOptions: {
        slowMo: 150,
      },
      viewport: { width: 1280, height: 720 },
      screenshot: 'only-on-failure',
      ignoreHTTPSErrors: true,
      video: 'on-first-retry',
    },
  };
  
  module.exports = config;
  