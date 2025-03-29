import type { Directive } from "vue";

export const vSignal: Directive = {
  mounted(el: HTMLElement, binding: any) {
    const getter = binding.value;
    const attr = binding.arg;

    const update = () => {
      if (attr) {
        el.setAttribute(attr, getter());
      } else {
        el.textContent = getter();
      }
    };

    update();
    
    if (!getter._subscribers) {
      getter._subscribers = new Set();
    }
    getter._subscribers.add(update);
  },
};

export const vSignalModel: Directive = {
  mounted(el, binding, ...args) {
    const signal = binding.value;
    const [get, set] = signal;

    vSignal.mounted?.(el, { ...binding, value: get, arg: "value" }, ...args);
    el.addEventListener("input", (e: Event) => set((e.target as HTMLInputElement)?.value));
  },
};
