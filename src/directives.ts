export const vSignal = {
  mounted(el: HTMLElement, binding: any) {
    const getter = binding.value;
    el.textContent = getter();
    let scheduled = false;
    
    const update = () => {
      el.textContent = getter();
    };
    
    if (!getter._subscribers) {
      getter._subscribers = new Set();
    }
    getter._subscribers.add(update);
  },
};
