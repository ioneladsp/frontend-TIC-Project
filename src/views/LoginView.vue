<template>
  <div class="body" id="bodyLogin">
    <div class="center">
      <h1>Login</h1>
      <form method="post" @submit.prevent="login">
        <div class="text-field">
          <input type="text" required v-model.trim="email" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
          <label>Email Address</label>
        </div>
        <div class="text-field">
          <input type="password" required v-model.trim="password" />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
          <label>Password</label>
        </div>
        <span v-if="loginError" class="error">{{ loginError }}</span>
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
        login: "",
      },
    };
  },
  computed: {
    emailError() {
      return this.error.email;
    },
    passwordError() {
      return this.error.password;
    },
    loginError() {
      return this.error.login;
    },
  },
  methods: {
    async fetchData(user) {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/login`,
        user
      );
      return response?.data || {};
    },
    async login() {
      this.error = {
        email: "",
        password: "",
        login: "",
      };
      if (!this.email) {
        this.error.email = "Email is required";
        return;
      }
      if (!this.password) {
        this.error.password = "Password is required";
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await this.fetchData(user);
        const { idToken, email, expiresIn, localId, username } = response;
        if (idToken) {
          this.$store.dispatch("login", {
            email,
            expiresIn,
            idToken,
            localId,
            username,
          });
          this.$router.replace("/");
        } else {
          this.error.login = "Invalid token";
        }
      } catch (error) {
        this.error.login = "Invalid email or password";
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.body {
  background: linear-gradient(120deg, #5995bd, #360532);
  width: 100%;
  height: 94vh;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
}
.center h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}
.center form {
  padding: 0 40px;
  box-sizing: border-box;
}
form .text-field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.text-field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}
.text-field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}
.text-field span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: 0.5s;
}
.text-field input:focus ~ label,
.text-field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}
.text-field input:focus ~ span::before,
.text-field input:valid ~ span::before {
  width: 100%;
}
.pass {
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
  cursor: pointer;
}
.pass:hover {
  text-decoration: underline;
}
input[type="submit"] {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  margin-top: 35px;
  margin-bottom: 35px;
}
input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.5s;
}
.error {
  color: red;
}
#bodyLogin {
  overflow: hidden;
}
</style>
