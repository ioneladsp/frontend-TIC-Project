<template>
  <div id="background">
    <div class="body-home">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <main>
        <p v-if="error !== null">{{ error }}</p>
        <h1 id="latestMovies">Latest movies</h1>
        <div class="add-button">
          <router-link to="/add-movie">
            <button v-if="isAdmin" id="btnAddMovie">
              <i class="fa-solid fa-clapperboard"></i>
              Add movie
            </button>
          </router-link>
        </div>
        <ul>
          <li v-for="movie in movies" :key="movie.id" class="item">
            <div>
              <div class="movie-card">
                <div class="meta">
                  <div
                    class="photo-gradient"
                    style="
                      background: linear-gradient(120deg, #5995bd, #360532);
                    "
                  ></div>
                  <ul class="details">
                    <li class="author">
                      <a class="detaliiFilm" href="#">{{ movie.author }}</a>
                    </li>
                    <li class="date">{{ movie.releaseDate }}</li>
                    <li class="tags">
                      <a class="detaliiFilm" href="#">{{ movie.genre }}</a>
                    </li>
                  </ul>
                </div>
                <div class="description">
                  <div v-if="isAdmin">
                    <button id="btnDelete" @click="handleDelete(movie.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                  <h1>{{ movie.title }}</h1>
                  <h2>{{ movie.director }}</h2>
                  <p class="movie-content">
                    {{ movie.content.slice(0, 150) }}
                  </p>
                  <router-link :to="'/movies/' + movie.id" id="router-movies">
                    <p class="read-more">
                      <a href="#">Read More</a>
                    </p>
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return { error: null };
  },
  created() {
    this.error = null;
    this.loadMovies();
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async loadMovies() {
      await this.$store.dispatch("loadMovies");
    },
    async handleDelete(movieId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteMovie", movieId);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#background {
  background-image: url("../../backgroundsalaopacity.jpg");
  background-size: contain;
}
.body-home {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
.movie-card {
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.7%;
  background: #fff;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
}
.movie-card a {
  color: inherit;
}
.movie-card a:hover {
  color: #d3c8fd;
}
.movie-card:hover .photo-gradient {
  transform: scale(1.3) rotate(3deg);
}
.movie-card .meta {
  position: relative;
  z-index: 0;
  height: 250px;
}
.movie-card .photo-gradient {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
}
.movie-card .details,
.movie-card .details ul {
  margin: auto;
  padding: 0;
  list-style: none;
}
.movie-card .details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  margin: auto;
  transition: left 0.2s;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  width: 100%;
  font-size: 0.9rem;
}
.movie-card .details a {
  text-decoration: dotted underline;
}
.movie-card .details ul li {
  display: inline-block;
}
.movie-card .details .author:before {
  font-family: FontAwesome;
  margin-right: 10px;
  content: "\f007";
}
.movie-card .details .date:before {
  font-family: FontAwesome;
  margin-right: 10px;
  content: "\f133";
}
.movie-card .details .tags ul:before {
  font-family: FontAwesome;
  content: "\f02b";
  margin-right: 10px;
}
.movie-card .details .tags li {
  margin-right: 2px;
}
.movie-card .details .tags li:first-child {
  margin-left: -4px;
}
.movie-card .description {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}
.movie-card .description h1,
.movie-card .description h2 {
  font-family: Poppins, sans-serif;
}
.movie-card .description h1 {
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.movie-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #a2a2a2;
  margin-top: 5px;
}
.movie-card .description .read-more {
  text-align: right;
}
.movie-card .description .read-more a {
  color: #6a51cb;
  display: inline-block;
  position: relative;
}
.movie-card .description .read-more a:after {
  content: "\f061";
  font-family: FontAwesome;
  margin-left: -10px;
  opacity: 0;
  vertical-align: middle;
  transition: margin 0.3s, opacity 0.3s;
}
.movie-card .description .read-more a:hover:after {
  margin-left: 5px;
  opacity: 1;
}
.movie-card p {
  position: relative;
  margin: 1rem 0 0;
}
.movie-card p:first-of-type {
  margin-top: 1.25rem;
}
.movie-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #6a51cb;
  width: 35px;
  top: -0.75rem;
  border-radius: 3px;
}
.movie-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .movie-card {
    flex-direction: row;
    max-width: 700px;
  }
  .movie-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .movie-card .description {
    flex-basis: 60%;
  }
  .movie-card .description:before {
    transform: skewX(-3deg);
    content: "";
    background: #fff;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
  .movie-card.alt {
    flex-direction: row-reverse;
  }
  .movie-card.alt .description:before {
    left: inherit;
    right: -10px;
    transform: skew(3deg);
  }
  .movie-card.alt .details {
    padding-left: 25px;
  }
  #router-movies {
    text-decoration: none;
    color: black;
  }
  #btnDelete {
    float: right;
    outline: none;
    border: none;
    background-color: white;
  }

  .fa-trash {
    font-size: 2vh;
  }
  .detaliiFilm {
    outline: none;
    padding: 5px;
    text-decoration: none !important;
  }
  #latestMovies {
    padding: 30px;
  }

  #btnAddMovie {
    padding: 3px 3px;
    border-radius: 5px;
    border-color: rgba(102, 51, 153, 0.445);
    background-color: white;
    border-width: 1px;
  }
  .add-button {
    display: relative;
    justify-content: flex-end;
    margin-left: 37rem;
  }
}
</style>
