<template>
  <p v-if="error !== nul">{{ error }}</p>
  <div class="wrapper">
    <div class="top">
      <div class="title">
        <h1>Here you can see your contribution with movies reviews</h1>
      </div>
    </div>
    <div class="content">
      <div class="review-card first">
        <h2 id="select">
          <a href="#">
            Please select the rating to display reviews for movies that
            qualify</a
          >
        </h2>

        <p class="date">
          <select name="rating" id="rating" v-model="selected">
            <option v-for="listValue in availableRatings" :key="listValue">
              {{ listValue }}
            </option>
          </select>
        </p>

        <div id="review-section">
          <ol role="list" id="review-list">
            <li v-for="review in sortedArray" :key="review.id">
              <div class="text">
                <div class="review-part">
                  <i class="fa-solid fa-film"></i>
                  {{ review.title }}
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
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewsView",
  created() {
    this.error = null;
    this.loadReviews();
  },
  data() {
    return {
      error: null,
      availableRatings: ["RATING", 0, 1, 2, 3, 4, 5],
      selected: "RATING",
    };
  },
  computed: {
    reviews() {
      return this.$store.getters.getReviews;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    sortedArray() {
      let reviewsArray = this.$store.getters.getReviews;
      const ratingSelected = this.selected;
      if (ratingSelected === "RATING") {
        let allReviews = [];
        reviewsArray.forEach((review) => {
          if (this.$store.getters.username === review.author) {
            allReviews.push(review);
          }
        });
        console.log(allReviews);
        return allReviews;
      } else {
        let allReviews = [];
        reviewsArray.forEach((review) => {
          if (review.rating === ratingSelected) {
            if (this.$store.getters.username === review.author) {
              allReviews.push(review);
            }
          }
        });
        console.log(allReviews);
        return allReviews;
      }
    },
  },
  methods: {
    async loadReviews() {
      await this.$store.dispatch("loadReviews");
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
.top {
  background: linear-gradient(120deg, #5995bd, #360532);
  height: 180px;
}

.top .title {
  width: 700px;
  margin: 0px auto 0 auto;
}

.title h1 {
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  padding-top: 20px;
}

.content {
  padding-bottom: 20px;
}

.content .review-card.first {
  margin-top: -80px;
}

.review-card {
  position: relative;
  background: #fff;
  padding: 50px;
  width: 600px;
  margin: 20px auto 0 auto;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #88888846;
}

.review-card h2 {
  font-size: 21px;
  font-weight: 500;
}

.review-card h2 a {
  color: linear-gradient(120deg, #5995bd, #360532);
  height: 180px;
  text-decoration: none;
}

.review-card .date {
  color: #9e9e9e;
  margin-top: 10px;
  font-size: 14px;
}

.review-card .text {
  color: #212121;
  margin-top: 20px;
  font-size: 15px;
  line-height: 22px;
}

#review-list {
  list-style-type: none;
}

.text {
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
.text:hover {
  box-shadow: 0px 0px 20px #94a8b6a2;
  width: 90%;
}

.review-part {
  text-align: left;
  padding: 5px;
}

#select {
  color: #360532;
}
</style>
