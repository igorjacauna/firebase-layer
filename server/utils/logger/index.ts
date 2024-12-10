import Adapter from './adapter';

class Logger {
  adapter: Adapter;

  constructor() {
    this.adapter = new Adapter();
  }

  log(...args: unknown[]) {
    return this.adapter?.log(...args);
  }

  error(...args: unknown[]) {
    return this.adapter?.error(...args);
  }

  warning(...args: unknown[]) {
    return this.adapter?.warning(...args);
  }

  info(...args: unknown[]) {
    return this.adapter?.info(...args);
  }

  debug(...args: unknown[]) {
    return this.adapter?.debug(...args);
  }

  critical(...args: unknown[]) {
    return this.adapter?.critical(...args);
  }
}

export const logger = new Logger();
