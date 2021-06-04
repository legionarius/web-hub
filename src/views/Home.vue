<template>
  <div class="home">
    <TestWasm></TestWasm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TestWasm from "@/components/TestWasm.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    TestWasm,
  },
});
</script>
