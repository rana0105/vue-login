<template>
<div>
  <navbar></navbar>
  <router-view></router-view>
  <Footer></Footer>
</div>
</template>
<script>
import Navbar from './components/partial/Navbar.vue';
import Footer from './components/partial/Footer.vue';
export default {
  name: "App",
  components: { Navbar, Footer },
};
</script>