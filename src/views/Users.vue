<template>
    <div class="users">
        <h1 class="mt-4">Users</h1>

        <div class="container">
            <div class="row">
                <div class="col-md-10">

                    <table class="table table-striped">
                        <thead class="bg-success text-white">
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>User type</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in users" :key="user.id" @click="selectedUser = user">
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.email}}</td>
                            <td>{{ user.userType }}</td>
                            <td>
                                <router-link :to="{ name: 'EditUser', params: {id: user.id} }" tag="button" class="btn btn-success" :class="{ active: $route.name === 'EditUser' }">
                                    Edit
                                </router-link>
                                <button v-if="user.active && user.userType === 'CONTENT_CREATOR'" class="btn btn-success" @click="deactivateUser(user.id)">Deactivate</button>
                                <button v-if="!user.active && user.userType === 'CONTENT_CREATOR'" class="btn btn-success" @click="deactivateUser(user.id)">Activate</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>

                </div>
                <div class="col-md-2">
                    <router-link :to="{ name: 'AddUser'}" tag="button" class="btn btn-success" :class="{ active: $route.name === 'AddUser' }">
                        Add user
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import User from "../components/User";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Users",
    // components: {User},
    data() {
        return {
            selectedUser: null,
            users: []
        }
    },
    created() {
        this.$axios.get('/api/users/authA').then((response) => {
            this.users = response.data;
        }).catch(error =>{
            console.log(error);
        });
    },
    methods: {
        deactivateUser(id){
            this.$axios.put('/api/users/authA/activation/' + id)
                .then((response) => {
                    console.log(response);
                    this.fetchUsers();
                })
        }
    },
    computed: {

    },

}
</script>

<style scoped>
button {
    width: 100px;
    margin: 5px;
}


</style>
