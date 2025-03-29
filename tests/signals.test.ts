import { describe, expect, it } from "bun:test";
import { signal } from "../src";

describe("signal", () => {
  it("should return initial value", () => {
    const [x] = signal(9);
    expect(x()).toBe(9);
    expect(x._subscribers).not.toBeFalsy();
  });

  it("should update the value", () => {
    const [x, setX] = signal(9);
    setX(99);
    expect(x()).toBe(99);
  });

  it("should trigger subscribe on value updated", () => {
    const [x, setX] = signal(9);
    let called = false;

    const subscriber = () => {
      called = true;      
    };

    x._subscribers = x._subscribers || new Set();
    x._subscribers.add(subscriber);

    setX(99);
    expect(called).toBe(true);
  });
});
