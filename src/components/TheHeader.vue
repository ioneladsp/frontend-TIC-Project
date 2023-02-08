<template>
  <nav>
    <button><router-link to="/">Movies</router-link></button>
    <button v-if="isAuthenticated">
      <router-link to="/reviewsFilter">Reviews</router-link>
    </button>
    <button v-if="isAuthenticated">
      <logout-button @logout="logout"></logout-button>
    </button>
    <button v-else>
      <router-link to="/login">Login</router-link>
    </button>
  </nav>
</template>

<script>
import LogoutButton from "./LogoutButton.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.isLoggedIn || this.$store.getters.token !== null;
    },
  },
  created() {
    this.isLoggedIn = this.$store.getters.isAuthenticated;
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 1rem;
  padding: 1rem;
  height: 6vh;
  background-color: whitesmoke;
}

button {
  all: unset;
}
</style>
