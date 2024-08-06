import { mockServer } from './msw.setup.js';

/**
 * Add this fix for the error 'ReferenceError: TextEncoder is not defined'.
 * This shows up when we import AGGridReact.
 */
if (typeof globalThis.TextEncoder === 'undefined' || typeof globalThis.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const utils = require('util');
  globalThis.TextEncoder = utils.TextEncoder;
  globalThis.TextDecoder = utils.TextDecoder;
}

// Establish API mocking before all tests.
beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockServer.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mockServer.close());

export {};
