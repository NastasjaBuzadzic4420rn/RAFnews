<template>
    <div>
        <h1>Edit user</h1>
        <form @submit.prevent="editUser">
            <div class="mb-3">
                <label for="firstName" class="form-label">First name</label>
                <input v-model="editedUser.firstName" type="text" class="form-control" id="firstName" placeholder="Enter first name" required>
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last name</label>
                <input v-model="editedUser.lastName" type="text" class="form-control" id="lastName" placeholder="Enter last name" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="editedUser.email" type="text" class="form-control" id="email" placeholder="Enter email" required>
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

            <div v-if="confirmPassword" class="alert alert-danger" role="alert">
                Passwords are not matching.
            </div>

            <div v-if="invalidInput" class="alert alert-danger" role="alert">
                Invalid input. Fields first name, last name, email, user type and password are required.
            </div>

            <div v-if="emailExists" class="alert alert-danger" role="alert">
                Email already exists.
            </div>

            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditUser",
    data(){
        return{
            userId: null,
            password1: null,
            password2: null,
            editedUser: {
                firstName: null,
                lastName: null,
                email: null,
                userType: null,
                active: null,
                password: null
            },
            selectedType: null,
            invalidInput: false,
            confirmPassword: false,
            emailExists: false
        }
    },
    created() {
        this.userId = this.$route.params.id;
        this.$axios.get("/api/users/" + this.userId).then(response => {
            this.editedUser.firstName = response.data.firstName;
            this.editedUser.lastName = response.data.lastName;
            this.editedUser.email = response.data.email;
            this.editedUser.userType = response.data.userType;
            this.selectedType = response.data.userType;
            this.editedUser.active = response.data.active;
            this.editedUser.password = response.data.password;
        });
    },
    watch: {
        selectedType(newCategoryId) {
            this.editedUser.userType = newCategoryId;
        },
    },
    methods: {
        editUser(){
            if (this.newUser.firstName && this.newUser.lastName && this.newUser.email && this.selectedType && this.password1) {
                if (this.password1 && this.password1 === this.password2) {
                    this.editedUser.password = this.password1;
                    this.$axios.put('/api/users/authA/' + this.userId, this.editedUser)
                        .then(respond => {
                            if(respond.data){
                                this.$router.push({name: 'Users'});
                                this.emailExists = false;
                            } else {
                                this.emailExists = true;
                            }
                        }).catch(error => {
                            console.log(error);
                            this.emailExists = true;
                    })
                    this.confirmPassword = false;
                } else {
                    this.confirmPassword = true
                }
                this.invalidInput = false;
            } else {
                this.invalidInput = true;
            }

        }
    }
}
</script>

<style scoped>

</style>