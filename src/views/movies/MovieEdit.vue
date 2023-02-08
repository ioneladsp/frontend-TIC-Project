<template>
  <div class="body" id="bodyLogin">
    <div class="center">
      <h1>Edit movie</h1>
      <form @submit.prevent="submitForm">
        <div class="text-field">
          <input
            type="text"
            id="title"
            placeholder="Title"
            v-model.trim="title"
          />
          <p v-if="errors.title" class="error">{{ errors.title }}</p>
        </div>
        <div class="text-field">
          <textarea
            id="content"
            placeholder="Content"
            v-model.trim="content"
          ></textarea>
          <p v-if="errors.content" class="error">{{ errors.content }}</p>
        </div>
        <div class="text-field">
          <input
            type="date"
            id="releaseDate"
            placeholder="Release date"
            v-model="releaseDate"
          />
          <p v-if="errors.releaseDate" class="error">
            {{ errors.releaseDate }}
          </p>
        </div>
        <div class="text-field">
          <input
            type="text"
            id="genre"
            placeholder="Genre"
            v-model.trim="genre"
          />
          <p v-if="errors.genre" class="error">{{ errors.genre }}</p>
        </div>
        <div class="text-field">
          <input
            type="text"
            id="duration"
            placeholder="Duration"
            v-model="duration"
          />
          <p v-if="errors.duration" class="error">{{ errors.duration }}</p>
        </div>
        <div class="text-field">
          <input
            type="text"
            id="director"
            placeholder="Director"
            v-model.trim="director"
          />
          <p v-if="errors.director" class="error">{{ errors.director }}</p>
        </div>
        <div class="text-field">
          <input
            type="text"
            id="average-rice"
            placeholder="Average price"
            v-model="averagePrice"
          />
          <p v-if="errors.averagePrice" class="error">
            {{ errors.averagePrice }}
          </p>
        </div>
        <div class="text-field">
          <input type="text" id="cast" placeholder="Cast" v-model.trim="cast" />
          <p v-if="errors.cast" class="error">{{ errors.cast }}</p>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MovieDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      content: "",
      releaseDate: "",
      genre: "",
      duration: "",
      director: "",
      averagePrice: "",
      cast: "",
      errors: {
        title: null,
        content: null,
        releaseDate: null,
        genre: null,
        duration: null,
        director: null,
        averagePrice: null,
        cast: null,
      },
    };
  },
  created() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      const movie = await axios.get(
        `${process.env.VUE_APP_API_URL}/movies/${this.id}`
      );
      const {
        title,
        content,
        releaseDate,
        genre,
        duration,
        director,
        averagePrice,
        cast,
      } = movie.data || {};
      this.title = title;
      this.content = content;
      this.releaseDate = releaseDate;
      this.genre = genre;
      this.duration = duration;
      this.director = director;
      this.averagePrice = averagePrice;
      this.cast = cast;
    },
    async submitForm() {
      this.resetErrors();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const movie = {
        title: this.title,
        content: this.content,
        releaseDate: this.releaseDate,
        genre: this.genre,
        duration: this.duration,
        director: this.director,
        averagePrice: this.averagePrice,
        cast: this.cast,
      };
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/movies/${this.id}`,
        movie,
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
        title: null,
        content: null,
        releaseDate: null,
        genre: null,
        duration: null,
        director: null,
        averagePrice: null,
        cast: null,
      };
    },
    validateForm() {
      let valid = true;
      if (this.title.trim().length === 0) {
        this.errors.title = "Title is required";
        valid = false;
      }
      if (this.content.trim().length === 0) {
        this.errors.content = "Content is required";
        valid = false;
      }
      if (this.releaseDate.trim().length === 0) {
        this.errors.releaseDate = "Release date is required";
        valid = false;
      }
      if (this.genre.trim().length === 0) {
        this.errors.genre = "Genre is required";
        valid = false;
      }
      if (this.duration <= 0) {
        this.errors.duration = "Duration should be positive";
        valid = false;
      }
      if (this.director.trim().length === 0) {
        this.errors.director = "Director is required";
        valid = false;
      }
      if (this.averagePrice <= 0) {
        this.errors.averagePrice = "Average price should be positive";
        valid = false;
      }
      if (this.cast.trim().length === 0) {
        this.errors.cast = "Cast is required";
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
  height: 94vh;
}
.center {
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
  color: #360532;
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
#content {
  border: none;
  max-width: 98%;
  outline: none;
  width: 98%;
  height: 100px;
  max-height: 100px;
}
</style>
