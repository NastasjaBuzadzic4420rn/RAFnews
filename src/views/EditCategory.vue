<template>
    <div>
        <h1>Edit category</h1>
        <form @submit.prevent="updateCategory">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" v-model="editedCategory.name" class="form-control">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" v-model="editedCategory.description" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Update</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditCategory",
    data(){
        return{
            categoryID: null,
            editedCategory: {
                name: '',
                description: ''
            },
        }
    },
    created() {
        this.categoryID = this.$route.params.id;
        this.$axios.get("/api/categories/" + this.categoryID).then(response => {
            this.editedCategory.name = response.data.name;
            this.editedCategory.description = response.data.description;
        });
    },
    methods: {
         updateCategory(){

             this.$axios.put("/api/categories/" + this.categoryID, this.editedCategory).then(response => {
                 console.log(response);
                 this.$router.push({name: 'Categories'});
             }).catch(error => {
                 console.error('Error:', error);
                 this.$router.push({name: 'Categories'});
             });
         }
    }

}
</script>

<style scoped>

</style>
