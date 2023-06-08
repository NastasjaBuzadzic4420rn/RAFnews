<template>
    <div class="users">
        <h1 class="mt-4">Users</h1>

        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" :key="user.id" @click="selectedUser = user">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.email}}</td>
                        <td>{{ user.firstName | capitalize }}</td>
                        <td>{{ user.lastName | capitalize }}</td>
                    </tr>
                    </tbody>
                </table>
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
        this.$axios.get('/api/users').then((response) => {
            this.users = response.data;
            console.log(this.users);
        });
    }

}
</script>

<style scoped>

</style>
