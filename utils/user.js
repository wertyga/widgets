import { config } from 'widgets/config/config';
import { _isEmpty } from './lodash';

export class User {
  constructor(widget) {
    this.widget = widget;
    const user = this.get();
    if (!_isEmpty(user)) {
      this.user = user;
    };
  }

  get() {
    const user = JSON.parse(localStorage.getItem(`${config.localStorageUserKey}-${this.widget}`) || '{}');
    if (_isEmpty(user)) return undefined;
    return user;
  }

  set(user = {}) {
    localStorage.setItem(`${config.localStorageUserKey}-${this.widget}`, JSON.stringify(user));
    this.user = user;
  }

  remove() {
    localStorage.removeItem(`${config.localStorageUserKey}-${this.widget}`);
    this.user = undefined;
  }
};
