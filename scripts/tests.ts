import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeAll(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      writable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.open = true;
      }),
    });
  }

  if (!HTMLDialogElement.prototype.close) {
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      writable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.open = false;
      }),
    });
  }

  Object.defineProperty(HTMLDialogElement.prototype, 'open', {
    get: vi.fn(function (this: HTMLDialogElement) {
      return this.hasAttribute('open');
    }),
    set: vi.fn(function (this: HTMLDialogElement, value: boolean) {
      if (value) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
    }),
    configurable: true,
  });
});
