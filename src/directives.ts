export const vSignal = {
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
