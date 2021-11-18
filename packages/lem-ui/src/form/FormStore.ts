import { deepCopy, deepGet, deepSet } from '../utils/copy';

export type FormListener = (name: string) => void;

export type FormValidator = (value: any, values: any) => boolean | string;

export interface FormRules {
  [key: string]: FormValidator;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export default class FormStore<T extends Record<string, unknown>> {
  private initialValues: T;

  private listeners: FormListener[] = [];

  private values: T;

  private rules: FormRules;

  private errors: FormErrors = {};

  constructor(values: Partial<T> = {}, rules: FormRules = {}) {
    this.initialValues = values as any;
    this.values = deepCopy(values) as any;
    this.rules = rules;

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);
    this.error = this.error.bind(this);
    this.validate = this.validate.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  get(name?: string) {
    return name === undefined ? { ...this.values } : deepGet(this.values, name);
  }

  set(values: Partial<T>): void;
  set(name: string, value: any, validate?: boolean): void;
  set(name: any, value?: any, validate = true) {
    if (typeof name === 'string') {
      deepSet(this.values, name, value);
      if (validate) this.validate(name);
      this.notify(name);
    } else if (name) {
      Object.keys(name).forEach((n) => this.set(n, name[n]));
    }
  }

  reset() {
    this.errors = {};
    this.values = deepCopy(this.initialValues);
    this.notify('*');
  }

  error(): FormErrors;
  error(name: number | string): string | undefined;
  error(name: string, value: string | undefined): string | undefined;
  error(...args: any[]) {
    // eslint-disable-next-line prefer-const
    let [name, value] = args;

    if (args.length === 0) return this.errors;

    if (typeof name === 'number') {
      name = Object.keys(this.errors)[name];
    }

    if (args.length === 2) {
      if (value === undefined) {
        delete this.errors[name];
      } else {
        this.errors[name] = value;
      }
    }

    return this.errors[name];
  }

  validate(): [Error | undefined, T];
  validate(name: string): [Error | undefined, any];
  validate(name?: string) {
    if (name === undefined) {
      Object.keys(this.rules).forEach((n) => this.validate(n));
      this.notify('*');

      const message = this.error(0);
      const error = message === undefined ? undefined : new Error(message);
      return [error, this.get()];
    } else {
      const validator = this.rules[name];
      const value = this.get(name);
      const result = validator ? validator(value, this.values) : true;
      const message = this.error(name, result === true ? undefined : result || '');

      const error = message === undefined ? undefined : new Error(message);
      return [error, value];
    }
  }

  subscribe(listener: FormListener) {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) this.listeners.splice(index, 1);
    };
  }

  private notify(name: string) {
    this.listeners.forEach((listener) => listener(name));
  }
}
