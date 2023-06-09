<template>
    <div>
        <h1>Add user</h1>
        <form @submit.prevent="addUser">
            <div class="mb-3">
                <label for="firstName" class="form-label">First name</label>
                <input v-model="newUser.firstName" type="text" class="form-control" id="firstName" placeholder="Enter first name" required>
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last name</label>
                <input v-model="newUser.lastName" type="text" class="form-control" id="lastName" placeholder="Enter last name" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="newUser.email" type="text" class="form-control" id="email" placeholder="Enter email" required>
            </div>
            <div class="mb-3">
                <label for="type" class="form-label">Category</label>
                <select v-model="selectedType" class="form-select" id="type" required>
                    <option disabled value="">Select a category</option>
                    <option value="CONTENT_CREATOR">Content creator</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="password1" class="form-label">Password</label>
                <input v-model="password1" type="text" class="form-control" id="password1" placeholder="Enter password" required>
            </div>
            <div class="mb-3">
                <label for="password2" class="form-label">Confirm password</label>
                <input v-model="password2" type="text" class="form-control" id="password2"  required>
            </div>

            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddUser",
    data(){
        return{
            password1: null,
            password2: null,
            newUser: {
                firstName: null,
                lastName: null,
                email: null,
                userType: null,
                password: null
            },
            selectedType: null
        }
    },
    watch: {
        selectedType(newCategoryId) {
            this.newUser.userType = newCategoryId;
        },
    },
    methods: {
        addUser(){
            if(this.password1 === this.password2){
                this.newUser.password = this.password1;
                this.$axios.post('/api/users', this.newUser)
                    // eslint-disable-next-line no-unused-vars
                    .then(respond => {
                        this.$router.push({name: 'Users'});
                    })
            }

        }
    }
}
</script>

<style scoped>

</style>