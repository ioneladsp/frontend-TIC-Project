<template>
  <div class="body" id="bodyLogin">
    <div class="center">
      <h1>Add Review</h1>
      <form @submit.prevent="submitForm">
        <div class="text-field">
          <input
            type="text"
            id="rating"
            placeholder="Rating"
            v-model.trim="rating"
          />
          <p v-if="errors.rating" class="error">{{ errors.rating }}</p>
        </div>
        <div class="text-field">
          <textarea
            id="comment"
            placeholder="Comment"
            v-model.trim="comment"
          ></textarea>
          <p v-if="errors.comment" class="error">{{ errors.comment }}</p>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddReviewView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rating: "",
      comment: "",
      publicationDate: "",
      errors: {
        rating: null,
        comment: null,
      },
    };
  },
  methods: {
    async submitForm() {
      this.resetErrors();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const review = {
        rating: this.rating,
        comment: this.comment,
        publicationDate: new Date().toLocaleDateString("es-CL"),
      };
      await axios.post(
        `${process.env.VUE_APP_API_URL}/admin/movies/${this.id}/reviews`,
        review,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/movies/${this.id}`);
    },
    resetErrors() {
      this.errors = {
        rating: null,
        comment: null,
      };
    },
    validateForm() {
      let valid = true;
      if (this.rating.trim().length === 0) {
        this.errors.rating = "Rating is required";
        valid = false;
      }
      if (this.rating.trim() > 5) {
        this.errors.rating = "Rating should be between 0 and 5";
        valid = false;
      }
      if (this.comment.trim().length === 0) {
        this.errors.comment = "Comment is required";
        valid = false;
      }
      return valid;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");

.body {
  background: linear-gradient(120deg, #5995bd, #360532);
  width: 100%;
  height: 100vh;
}
.center {
  margin-top: 2%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
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
  padding: 0 50px;
  box-sizing: border-box;
}
form .text-field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 7px 0;
}
.text-field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 15px;
  border: none;
  background: none;
  outline: none;
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
  margin-top: 40px;
  margin-bottom: 40px;
}
input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.5s;
}
.error {
  color: red;
  font-size: 13px;
}
#bodyLogin {
  overflow: hidden;
}
#comment {
  border: none;
  max-width: 98%;
  outline: none;
  width: 98%;
  height: 100px;
  max-height: 100px;
}
</style>
