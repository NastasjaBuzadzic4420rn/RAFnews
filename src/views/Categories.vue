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
                                <router-link :to="{ name: 'newsInCategory', params: {id: category.id} }" tag="a" class="category-link" :class="{ active: $route.name === 'newsInCategory' }">
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
            }
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
            const newCategory = {
                name: this.newCategory.name,
                description: this.newCategory.description
            };

            this.$axios.post('/api/categories', newCategory)
                .then((response) => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            this.newCategory.name = '';
            this.newCategory.description = '';
            this.fetchCategories();
        },
        deleteCategory(id){
            this.$axios.delete('/api/categories/' + id)
                .then((response) => {
                    console.log(response);
                    this.fetchCategories();
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