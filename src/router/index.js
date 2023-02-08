import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MovieDetail from "../views/movies/MovieDetail.vue";
import MovieEdit from "../views/movies/MovieEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movies/:id",
    name: "movie-detail",
    component: MovieDetail,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/movies/:id/edit",
    name: "movie-edit",
    component: MovieEdit,
    props: true,
  },
  {
    path: "/add-movie",
    name: "add-movie",
    component: () => import("../views/movies/AddMovieView.vue"),
  },
  {
    path: "/movies/:id/review",
    name: "add-review",
    component: () => import("../views/reviews/AddReviewView.vue"),
    props: true,
  },
  {
    path: "/movies/:id/reviews/:reviewId",
    name: "edit-review",
    component: () => import("../views/reviews/EditReviewView.vue"),
    props: true,
  },
  {
    path: "/reviewsFilter",
    name: "reviews",
    component: () => import("../views/reviews/ReviewDetail.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
