// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenv.config({
  path: './.env'
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config  = defineConfig({
  // testDir: './tests',
  testIgnore: 'tests/**/*.spec.skip.js',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,

  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['list', { output: 'test_result.txt' }],
  ['html'],
  // [
  //   process.env.CI ? 'playwright-ctrf-json-reporter' : 'list'
  // ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    headless: true,

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME || '', 
      password: process.env.HTTP_CREDENTIALS_PASSWORD || '',
    },

    viewport: { width: 1280, height: 720 },



    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: 'on',
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup:stage",
       testMatch: 'tests/setup/**/*.setup.js'
    },

    {
      name: 'chromium',
      dependencies: ['setup:stage'],
      testMatch: 'tests/**/*.spec.js',
      use: { ...devices['Desktop Chrome'] }
    },
    

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


export default config;

