import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender: any = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options
  });

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export * from 'vitest';
// override render export
export { customRender as render };
