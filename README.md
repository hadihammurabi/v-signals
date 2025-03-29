# v-signals

Example:
```vue
<script setup>
import { signal } from "signal";
const [title, setTitle] = signal("");
</script>

<template>
  <h1 v-signal="title"></h1>
  <input type="text" @keyup="(e) => setTitle(e.target?.value)" />
</template>
```
