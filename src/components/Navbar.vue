<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
<!--        <a class="navbar-brand" href="#">RAFnews</a>-->
          <router-link to="/" tag="a" class="navbar-brand" :class="{active: this.$router.currentRoute.name === 'HomeView'}">RAFnews</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--              <li class="nav-item" v-if="isConetntCreator">-->
<!--                  <router-link :to="{name: 'Categories'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Categories'}">Categories</router-link>-->
<!--              </li>-->
<!--              <li class="nav-item" v-if="isConetntCreator">-->
<!--                  <router-link :to="{name: 'News'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'News'}">News</router-link>-->
<!--              </li>-->

<!--              <li class="nav-item">-->
<!--                <router-link :to="{name: 'Users'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Users'}">Subjects</router-link>-->
<!--              </li>-->
          </ul>
          <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
            <button class="btn btn-outline-secondary" type="submit">Logout</button>
          </form>
            <form v-if="canLogin" class="d-flex" @submit.prevent="login">
                <button class="btn btn-outline-secondary" type="submit">Login</button>
            </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  computed: {
      canLogout() {
          if(this.$route.name === 'Login')
              return false;

          const jwt = localStorage.getItem('jwt');
          if(jwt)
              return true;
          return false;
      },
      canLogin() {
          if(this.$route.name === 'Login')
              return false;

          const jwt = localStorage.getItem('jwt');
          if(jwt)
              return false;
          return true;
      },
  },
  methods: {
      logout() {
        localStorage.removeItem('jwt');
        this.$router.push({name: 'HomeView'});
      },
      login() {
          localStorage.removeItem('jwt');
          this.$router.push({name: 'Login'});
      }
  },
}
</script>


<style scoped>

</style>
