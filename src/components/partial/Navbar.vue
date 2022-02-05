<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link
          v-if="loggedIn"
          class="navbar-brand"
          :to="{ name: 'dashboard' }"
          ><img src="@/assets/img/logo/logo.png" alt="" width="140"
        /></router-link>
        <a v-else class="navbar-brand" href="/"
          ><img src="@/assets/img/logo/logo.png" alt="" width="140"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul
            v-if="loggedIn"
            class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px"
          >
            <li
              v-if="user.role_id == 1"
              class="nav-item"
            >
              <router-link
                class="nav-link active"
                :to="{ name: 'dashboard' }"
                >Dashboard</router-link
              >
            </li>
          </ul>
        </div>
        <div v-if="loggedIn" class="dropdown d-flex dropdown-style">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="@/assets/user.png"
              alt="mdo"
              width="20"
              height="20"
              class="img-style"
            />
            <span>{{ user.name }}</span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <router-link @click="logOut" class="dropdown-item" to="#"
                >Sign Out</router-link
              >
            </li>
          </ul>
        </div>
        <div v-if="!loggedIn" class="dropdown login-style-btn d-flex">
          <router-link class="dropdown-item" :to="{ path: '/login' }"
            >Login</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
/* eslint-disable */
import Swal from 'sweetalert2';
import { mapActions, mapGetters } from "vuex";
import Loader from "@/components/lib/Loader.vue";
export default {
  name: "Navbar",
  components: { Loader },
  data() {
    return {
      isLoadingNav: false,
      disabled: false
    };
  },

  methods: {

    ...mapActions({
        removeUserToken: 'authcheck/removeTokenUser',
    }),

    logOut() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Success!',
            'Your are successfully logout.',
            'success'
          )
          localStorage.removeItem("permissions");
          localStorage.removeItem("userCode");
          this.removeUserToken();
          window.location.replace("/");
        }
      })
    },
  },

  computed: {
    ...mapGetters({
      loggedIn: "authcheck/isLoggedIn",
      user: "authcheck/user",
    }),
  },
};
</script>
<style scoped>
button.btn-style-modal:hover {
  border: 2px solid #242d66;
  border-radius: 6px;
  padding: 4px;
  color: rgb(255, 255, 255);
  background: #242d66;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
}
.dropdown-style {
  border: 2px solid #242d66;
  border-radius: 6px;
  font-size: 12px;
}

.dropdown-style span {
  font-size: 12px;
}
.img-style {
  margin-right: 10px;
}
</style>