<template>
  <div id="app">
      <Navbar/>
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/users">Users</router-link>-->
<!--    </nav>-->
      <div class="container">
          <router-view/>
      </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import Navbar from "./components/Navbar";

export default {
    components: {Navbar},
}
</script>