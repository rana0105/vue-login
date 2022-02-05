<template>
  <div class="bg-dark text-white py-5 full-height">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-2 text-center">
          <p>
            <i class="fa fa-exclamation-triangle fa-5x"></i><br />Status Code:
            401
          </p>
        </div>
        <div class="col-md-10">
          <h3>OPPSSS!!!! Sorry...</h3>
          <p>
            Sorry, your access is refused due to security reasons of our server
            and also our sensitive data.<br />Please go back to the previous
            page to continue browsing.
          </p>
          <a class="btn btn-danger" @click="logOut">Go Back</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UnAuthorized",
  data() {
    return {
      loggedIn: null,
      user: null,
    };
  },
   mounted() {
    this.loggedIn = localStorage.getItem("token");
    this.user = JSON.parse(localStorage.getItem("user"));
  },

  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/");
    },
  },
};
</script>
<style scoped>
.full-height {
  height: 750px;
}
</style>
