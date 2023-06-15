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

            <div v-if="invalidInput" class="alert alert-danger" role="alert">
                Invalid input. Fields name and description are required.
            </div>

            <div v-if="categoryExists" class="alert alert-danger" role="alert">
                Category with the same name already exists.
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
            invalidInput: false,
            categoryExists: false
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
             if(this.newCategory.name && this.newCategory.description) {
                 this.$axios.put("/api/categories/auth/" + this.categoryID, this.editedCategory).then(response => {
                     if(response.data){
                         this.$router.push({name: 'Categories'});
                         this.categoryExists = false;
                     } else {
                         this.categoryExists = true;
                     }
                 }).catch(error => {
                     console.error('Error:', error);
                     this.categoryExists = true;
                 });
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
