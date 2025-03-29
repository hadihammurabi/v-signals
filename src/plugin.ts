import { vSignal } from "./directives";
import type { App } from "vue";

export default {
  install(app: App) {
    app.directive("signal", vSignal);
  },
};
