import { describe, expect, it } from "bun:test";
import { signal } from "../src";
import { mount } from "@vue/test-utils";
import { vSignal } from "../src/directives";

describe("vSignal", () => {
  it("should update the text content on value updates", async () => {
    const [x, setX] = signal(9);

    const wrapper = mount({
      template: '<p v-signal="x" />',
      directives: { signal: vSignal },
      setup() { return { x } },
    });

    expect(wrapper.text()).toBe("9");

    setX(99);
    await new Promise((r) => setTimeout(r, 300));

    expect(wrapper.text()).toBe("99");
  });

  it("should update the attribute on value updates", async () => {
    const [x, setX] = signal(9);

    const wrapper = mount({
      template: '<input v-signal:value="x" />',
      directives: { signal: vSignal },
      setup() { return { x } },
    });
    expect(wrapper.attributes().value).toBe("9");

    setX(99);
    await new Promise((r) => setTimeout(r, 300));

    expect(wrapper.attributes().value).toBe("99");
  });

});
