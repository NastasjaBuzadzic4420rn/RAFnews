<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
          <router-link to="/" tag="a" class="navbar-brand" :class="{active: this.$router.currentRoute.name === 'HomeView'}">{{ user_name }}</router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li v-if="!isLoggedin" class="nav-item">
                  <router-link :to="{name: 'MostPopular'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'MostPopular'}">Most popular</router-link>
              </li>
              <li v-if="!isLoggedin" class="nav-item">
                  <router-link :to="{name: 'ReadNews'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'ReadNews'}">News</router-link>
              </li>
              <li v-if="isLoggedin" class="nav-item">
                  <router-link :to="{name: 'Categories'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Categories'}">Categories</router-link>
              </li>
              <li v-if="isLoggedin" class="nav-item">
                  <router-link :to="{name: 'News'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'News'}">News</router-link>
              </li>
             <li v-if="isLoggedin && isAdmin" class="nav-item">
               <router-link :to="{name: 'Users'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Users'}">Users</router-link>
             </li>
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
    data(){
        return{
            user_name: null,
            user_id: null,
            isLoggedin: null,
            // isAdmin: null
        }
    },
    created() {
        this.getUser();
        // if(this.user_id === "ADMIN"){
        //     this.isAdmin = true;
        // } else {
        //     this.isAdmin = false;
        // }
    },
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
    methods: {
        logout() {
          localStorage.removeItem('jwt');
          this.$router.push({name: 'HomeView'});
        },
        login() {
            this.$router.push({name: 'Login'});
        },
        getUser(){
            const jwt = localStorage.getItem("jwt");
            if(jwt) {
                const payload = JSON.parse(atob(jwt.split('.')[1]));
                this.user_id = payload.user_id;
                //TODO: proveriti user_id
                this.$axios.get("/api/users/" + this.user_id).then(response => {
                    this.user_name = response.data.firstName + " " + response.data.lastName;
                    console.log(response);
                });
                this.isLoggedin = true;
            } else {
                this.user_name = "Home page";
                this.isLoggedin = false;
            }
        },
    },
}
</script>


<style scoped>

</style>
