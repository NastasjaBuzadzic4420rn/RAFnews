<template>
  <div class="home">
      <div v-if="isAdmin || isContentCreator">
          <img alt="Vue logo" src="../assets/logo.png">
          <div class="d-grid gap-3 mt-4">
              <router-link v-if="isContentCreator || isAdmin" :to="{name: 'Categories'}" tag="button" class="btn btn-success btn-lg" :class="{active: this.$router.currentRoute.name === 'Categories'}">Categories</router-link>
              <router-link v-if="isContentCreator || isAdmin"  :to="{name: 'News'}" tag="button" class="btn btn-success btn-lg" :class="{active: this.$router.currentRoute.name === 'News'}">News</router-link>
              <router-link v-if="isAdmin"  :to="{name: 'Users'}" tag="button" class="btn btn-success btn-lg" :class="{active: this.$router.currentRoute.name === 'Users'}">Users</router-link>
          </div>
      </div>
      <div v-if="!isAdmin && !isContentCreator">
          <h1>Latest news</h1>
          <div v-for="article in articles" :key="article.id" @click="selectedArticle = article">
              <ReadArticle :article="article"></ReadArticle>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ReadArticle from "@/components/ReadArticle.vue";

export default {
  name: 'HomeView',
    components: {ReadArticle},
    data(){
      return{
          articles: {},
      }
    },
    created(){
        this.$axios.get(`/api/articles/latest`).then((response) => {
            this.articles = response.data;
        });
    },
      computed: {
          isContentCreator() {
              const jwt = localStorage.getItem("jwt");

              if (jwt) {
                  const payload = JSON.parse(atob(jwt.split(".")[1]));
                  const user_type = payload.user_type;

                  if (user_type === "CONTENT_CREATOR") {
                      return true;
                  } else {
                      return false;
                  }
              } else {
                  return false;
              }
          },
          isAdmin() {
              const jwt = localStorage.getItem("jwt");

              if (jwt) {
                  const payload = JSON.parse(atob(jwt.split(".")[1]));
                  const user_type = payload.user_type;

                  if (user_type === "ADMIN") {
                      return true;
                  } else {
                      return false;
                  }
              } else {
                  return false;
              }
          },
      },
}
</script>
