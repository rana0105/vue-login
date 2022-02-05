<template>
  <div
    class="container-fluid full-height"
    :style="{
      backgroundImage: 'url(' + require(`@/assets/background.jpg`) + ')',
    }"
  >
    <div class="layer">
      <div class="background-text-style">
        <h1>Corporate Pick & Drop Services</h1>
        <p class="col-md-8">
          Ensure safe transportation for your moving employees in lockdown.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
};
</script>
<style scoped>
.full-height {
  height: 100%;
}
.container-fluid {
  background-size: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  background-position: center;
}
.layer {
  background: rgba(0, 0, 0, 0.4);
  margin-left: -15px !important;
  margin-right: -10px !important;
}
.background-text-style {
  padding: 5% 0 30% 4%;
}
.background-text-style h1 {
  color: #fff;
  font-size: 28px;
  font-weight: bold;
}
.background-text-style p {
  color: #fff;
  font-size: 22px;
  letter-spacing: 1px;
}
</style>
