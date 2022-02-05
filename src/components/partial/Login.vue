<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="card mt-5 p-5">
          <div class="card card-header justify-content-center">
            <img src="@/assets/img/logo/logo.png" alt="" width="140" />
          </div>
          <p class="text-danger">{{ errorMesage }}</p>
          <div class="card card-body mt-2">
            <form @submit.prevent="onSubmit">
              <!-- Email -->
              <div
                class="form-group"
                :class="{ error: v$.form.mobile.$errors.length }"
              >
                <label for="">Mobile</label>
                <input
                  class="form-control"
                  placeholder="Enter your mobile number"
                  type="text"
                  v-model="v$.form.mobile.$model"
                />
                <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                <!-- error message -->
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.form.mobile.$errors"
                  :key="index"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>

              <!-- password -->
              <div
                class="form-group"
                :class="{ error: v$.form.password.$errors.length }"
              >
                <label for="">Password</label>
                <input
                  class="form-control"
                  placeholder="Enter your password"
                  type="password"
                  v-model="v$.form.password.$model"
                />
                <div class="pre-icon os-icon os-icon-fingerprint"></div>
                <!-- error message -->
                <div
                  class="input-errors"
                  v-for="(error, index) of v$.form.password.$errors"
                  :key="index"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="buttons-w mt-3">
                <button :disabled="v$.form.$invalid" class="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import store from "@/state/store.js";
import useVuelidate from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";
export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      form: {
        mobile: "",
        password: "",
      },
      errorMesage: "",
    };
  },

  validations() {
    return {
      form: {
        mobile: {
          required,
          min: maxLength(11),
          numeric,
        },
        password: {
          required,
          min: minLength(8),
        },
      },
    };
  },
  methods: {
    ...mapActions({
      setUser: "authcheck/setUser",
      setToken: "authcheck/setToken",
    }),
    onSubmit() {
      let email = this.form.mobile;
      let password = this.form.password;
      let self = this;
      axios
        .post("login", { email, password })
        .then((response) => {
          let user = response.data.data.user;
          let token = response.data.data.token;
          store.dispatch("authcheck/setUser", user);
          store.dispatch("authcheck/setToken", token);

          axios.defaults.headers.common["Authorization"] =
            this.tokenHeader;
          if (this.tokenHeader != null) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              window.location.replace("dashboard");
            }
          } else {
            this.$router.push(this.$route.params.nextUrl);
          }
        })
        .catch((error) => {
          this.errorMesage = error.response.data.message;
        });
    },
  },

  computed: {
    ...mapGetters({
      tokenHeader: "authcheck/token",
    }),
  },
};
</script>
<style scoped>
.card.mt-5.p-5 {
  box-sizing: content-box;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  background: #f8f9fa;
  width: 260px;
}
.card img {
  margin-left: 14%;
}
.error-msg {
  color: #e07373;
}
</style>
