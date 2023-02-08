<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="wrapper">
    <div class="top">
      <div class="title"><h1>Movie Detail</h1></div>
    </div>
    <div class="content">
      <div class="movie-card first">
        <button
          id="btn-edit"
          @click="handleEdit"
          v-if="isAdmin"
          style="float: right"
        >
          <i class="fa fa-pencil"></i>
        </button>
        <h2>
          <a id="titlu" href="#">{{ title }}</a>
        </h2>
        <p class="date">Release date: {{ releaseDate }}</p>
        <p class="genre">Genre: {{ genre }}</p>
        <p class="duration">Duration: {{ duration }} min</p>
        <p class="averagePrice">Average price: {{ averagePrice }}</p>
        <p class="director">Directed by: {{ director }}</p>
        <p class="cast">Cast: {{ cast }}</p>

        <p class="text">
          {{ content }}
        </p>
        <div id="review-section-start">
          <button
            id="btn-addReview"
            @click="handleAddReview"
            v-if="isAuthenticated"
          >
            <i class="fa fa-plus"></i>
            <p>Add review</p>
          </button>
          <div id="review-comment-count" v-if="isAuthenticated">
            <i class="fa fa-comment"></i>
            {{ reviews.length }}
          </div>
        </div>
        <ul>
          <li v-for="review in reviews" :key="review">
            <div class="div-review">
              <div class="review-buttons" v-if="isMe(review.author)">
                <button id="btnEditReview" @click="handleEditReview(review.id)">
                  <i class="fa fa-pencil"></i>
                </button>
                <button
                  id="btnDeleteReview"
                  @click="handleDeleteReview(id, review.id)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
              <div class="review-part">
                <i class="fa fa-user"></i> {{ review.author }}
              </div>
              <div class="review-part">
                <i class="fa fa-calendar"></i>
                {{ review.publicationDate }}
              </div>
              <div class="review-part">
                <i class="fa fa-star"></i> {{ review.rating }}
              </div>
              <div class="review-part">
                {{ review.comment }}
              </div>
            </div>
          </li>
        </ul>
      </div>
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
      movie: null,
    };
  },
  created() {
    this.getMovie();
  },
  computed: {
    title() {
      return this?.movie?.title || "";
    },
    releaseDate() {
      return this?.movie?.releaseDate || "";
    },
    director() {
      return this?.movie?.director || "";
    },
    content() {
      return this?.movie?.content || "";
    },
    duration() {
      return this?.movie?.duration || "";
    },
    genre() {
      return this?.movie?.genre || "";
    },
    averagePrice() {
      return this?.movie?.averagePrice || "";
    },
    cast() {
      return this?.movie?.cast || "";
    },
    reviews() {
      return this?.movie?.reviews || [];
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isAuthenticated() {
      return this.$store.getters.token !== null;
    },
  },
  methods: {
    async getMovie() {
      const movie = await axios.get(
        `${process.env.VUE_APP_API_URL}/movies/${this.id}`
      );
      this.movie = movie?.data || {};
    },
    handleEdit() {
      this.$router.push("/movies/" + this.id + "/edit");
    },
    handleAddReview() {
      this.$router.push(`/movies/${this.id}/review`);
    },
    handleEditReview(reviewId) {
      this.$router.push(`/movies/${this.id}/reviews/${reviewId}`);
    },
    async handleDeleteReview(id, reviewId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteReview", { id, reviewId });
        this.movie.reviews = this.movie.reviews.filter(
          (x) => x.id !== reviewId
        );
      } catch (error) {
        this.error = error.message;
      }
    },
    isMe(author) {
      return this.$store.getters.username === author;
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  clear: both;
  margin: 0 auto 75px auto;
  width: 100%;
  overflow: hidden;
}

h2 {
  text-align: left;
}

.top {
  background: linear-gradient(120deg, #5995bd, #360532);
  height: 30vh;
}

.top .title {
  width: 700px;
  margin: 0 auto 0 auto;
}

.title h1 {
  font-size: 40px;
  color: #fff;
  padding-top: 40px;
  font-weight: 500;
}

.content {
  padding-bottom: 20px;
}

.content .movie-card.first {
  margin-top: -15vh;
  border-radius: 10px;
  width: 40%;
}

.movie-card {
  position: relative;
  background: #fff;
  padding: 50px;
  width: 600px;
  margin: 20px auto 0 auto;
  box-shadow: 0px 0px 15px #88888846;
}

.movie-card h2 {
  font-size: 21px;
  font-weight: 500;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 10px;
}

.movie-card h2 a {
  color: #360532;
  text-decoration: none;
}

.movie-card {
  color: #360532;
  margin-top: 10px;
  font-size: 14px;
  padding: 5px;
}

.date,
.cast,
.director,
.averagePrice,
.genre,
.duration {
  text-align: left;
  font-style: italic;
  font-size: 13px;
  margin-left: 5.8%;
  margin-right: 5.8%;
}
.date {
  margin-top: 10px;
}

.movie-card .text {
  color: #360532;
  margin-top: 20px;
  font-size: 15px;
  line-height: 22px;
  text-align: justify;
  padding: 5px;
  margin-left: 5%;
  margin-right: 5%;
}

ul {
  list-style-type: none;
}

.div-review {
  border-radius: 10px;
  box-shadow: 0px 0px 20px #88888846;
  width: 90%;
  color: #360532;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-right: auto;
  margin-left: auto;
  padding: 5px;
  transition: box-shadow 0.3s ease-in-out;
}
.div-review:hover {
  box-shadow: 0px 0px 20px #94a8b6a2;
  width: 90%;
}

.fa-calendar-days,
.fa-star,
.fa-user {
  margin-left: 5px;
  color: #360532;
}

.review-part {
  text-align: left;
  padding: 5px;
}

#btn-edit {
  outline: none;
  border: none;
  font-size: 20px;
  background-color: white;
  margin: 10px;
}

#review-section-start {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

#btn-addReview {
  outline: none;
  border: none;
  color: #360532;
  background-color: white;
  justify-self: start;
  margin-left: 11%;
}
#btn-addReview > p {
  display: inline;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

#btn-addReview > p:hover {
  opacity: 1;
}

#review-comment-count {
  color: #360532;
  justify-self: end;
  margin-right: 11%;
}
#btnDeleteReview {
  outline: none;
  border: none;
  margin: 10px;
  color: #360532;
  background-color: white;
}

.review-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.fa-pencil {
  color: #360532;
}

#btnEditReview {
  outline: none;
  border: none;
  background-color: white;
}

#titlu {
  font-size: 35px;
  padding: 2px;
}
</style>
