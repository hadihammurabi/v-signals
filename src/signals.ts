import { customRef, shallowRef, triggerRef } from 'vue';

interface Getter<T> {
  (): T;
  _subscribers: Set<() => void>;
}
type Signal<T> = [getter: Getter<T>, setter: (value: T) => void];

export function signal<T>(initialValue: T): Signal<T> {
  let subscribers = new Set<() => void>();
  const signal = shallowRef(initialValue);
  
  const getter: Getter<T> = (): T => signal.value;
  getter._subscribers = subscribers;

  const setter = (newValue: T) => {
    signal.value = newValue;
    triggerRef(signal);
    subscribers.forEach((fn) => fn());
  };

  return [getter, setter];
}
