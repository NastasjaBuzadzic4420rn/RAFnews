<template>
  <div class="pt-5">
    <h1 v-if="email">Hello, {{email}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
        <div v-if="invalidInput" class="alert alert-danger" role="alert">
            Invalid input. Fields email and password are required.
        </div>
        <div v-if="userNotExist" class="alert alert-danger" role="alert">
             User with this credentials does not exist.
        </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
        email: '',
        password: '',
        invalidInput: false,
        userNotExist: false
    }
  },
  methods: {

    login() {
        if(this.email && this.password) {
            this.$axios.post('/api/users/login', {
                email: this.email,
                password: this.password,
            }).then(response => {
                localStorage.setItem('jwt', response.data.jwt)
                this.$router.push({name: 'HomeView'});
                this.userNotExist = false
            }).catch(error => {
                console.log(error)
                this.userNotExist = true
            })
            this.invalidInput = false;
        } else {
            this.invalidInput = true;
        }
    }

  },
}
</script>

<style scoped>

</style>
