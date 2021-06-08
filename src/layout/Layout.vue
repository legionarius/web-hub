<template>
  <div id="layout-container">
    <img
        id="logo"
        :src="require('../assets/logo.png').default"
        alt="logo"
    />
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped>
#layout-container {
  width: 100%;
  background-color: #f7eccc;
}

#logo{
  width: 80px;
  height: 80px;

}
</style>
