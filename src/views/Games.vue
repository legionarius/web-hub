<template>
  <div class="about">
    <TestWasm></TestWasm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TestWasm from "@/components/TestWasm.vue";

export default defineComponent({
  name: "Home",
  components: {
    TestWasm,
  },
});
</script>
