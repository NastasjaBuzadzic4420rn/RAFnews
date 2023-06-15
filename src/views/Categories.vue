<template>
    <div>
        <h1>Categories</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <table class="table table-striped">
                        <thead class="bg-success text-white">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="category in categories" :key="category.id" @click="selectedCategory = category">
                            <td>
                                <router-link :to="{ name: 'NewsInCategory', params: {id: category.id} }" tag="a" class="category-link" :class="{ active: $route.name === 'NewsInCategory' }">
                                    {{ category.name }}
                                </router-link>
                            </td>
                            <td>{{ category.description }}</td>
                            <td>
                                <router-link :to="{ name: 'EditCategory', params: {id: category.id} }" tag="button" class="btn btn-success" :class="{ active: $route.name === 'EditCategory' }">
                                    Edit
                                </router-link>
                                <button class="btn btn-success" @click="deleteCategory(category.id)">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <h2>Add Category</h2>
                    <form @submit.prevent="addCategory">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" id="name" v-model="newCategory.name" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea id="description" v-model="newCategory.description" class="form-control"></textarea>
                        </div>

                        <div v-if="invalidInput" class="alert alert-danger" role="alert">
                            Invalid input. Fields name and description are required.
                        </div>

                        <div v-if="categoryExists" class="alert alert-danger" role="alert">
                            Category with the same name already exists.
                        </div>

                        <button type="submit" class="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Categories",
    data() {
        return {
            selectedCategory: null,
            categories: [],
            newCategory: {
                name: '',
                description: ''
            },
            invalidInput: false,
            categoryExists: false
        }
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            this.$axios.get("/api/categories").then(response => {
                this.categories = response.data;
            });
        },
        addCategory() {
            if(this.newCategory.name && this.newCategory.description) {
                const newCategory = {
                    name: this.newCategory.name,
                    description: this.newCategory.description
                };

                this.$axios.post('/api/categories/auth', newCategory)
                    .then((response) => {
                        if(response.data){
                            this.newCategory.name = '';
                            this.newCategory.description = '';
                            this.fetchCategories();
                            this.categoryExists = false;

                        } else {
                            this.categoryExists = true;
                        }
                    })
                    .catch(error => {
                        console.error('Error:' + error);
                        this.categoryExists = true;
                    });
                this.invalidInput = false;
            } else {
                this.invalidInput = true;
            }
        },
        deleteCategory(id){
            this.$axios.delete('/api/categories/auth/' + id)
                .then((response) => {
                    console.log(response.data);
                    this.fetchCategories();
                }).catch(error => {
                    console.log("Greska: " + error)
            })

        }
    }
}

</script>

<style scoped>
button {
    width: 100px;
    margin: 5px;
}


</style>