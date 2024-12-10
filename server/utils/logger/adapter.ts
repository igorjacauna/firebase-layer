export default class Adapter {
  adapter: Console;
  constructor() {
    this.adapter = console;
  }

  log(...args) {
    return this.adapter?.log(...args);
  }

  error(...args) {
    return this.adapter?.error(...args);
  }

  warning(...args) {
    return this.adapter?.warn(...args);
  }

  info(...args) {
    return this.adapter?.info(...args);
  }

  debug(...args) {
    return this.adapter?.debug(...args);
  }

  critical(...args) {
    return this.adapter?.error(...args);
  }
}