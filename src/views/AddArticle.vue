<template>
    <div>
        <h1>Add article</h1>
        <form @submit.prevent="addArticle">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input v-model="newArticle.title" type="text" class="form-control" id="title" placeholder="Enter title" required>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select v-model="selectedCategory" class="form-select" id="category" required>
                    <option disabled value="">Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="tags" class="form-label">Tags</label>
                <input v-model="tags" type="text" class="form-control" id="tags" placeholder="Enter tags">
                <small class="form-text text-muted">Separate tags with commas (e.g., tag1, tag2, tag3)</small>
            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Text</label>
                <textarea v-model="newArticle.text" class="form-control" id="text" rows="5" placeholder="Enter text" required></textarea>


                <div v-if="invalidInput" class="alert alert-danger" role="alert">
                    Invalid input. Fields title, category and text are required.
                </div>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddArticle",
    data(){
        return {
            newArticle: {
                title: '',
                text: '',
                categoryId: null,
                creatorId: null
            },
            categories: [],
            selectedCategory: '',
            tags: null,
            invalidInput: false
        }
    },
    created() {
        this.getUserID()
        this.fetchCategories();
    },
    watch: {
        selectedCategory(newCategoryId) {
            this.newArticle.categoryId = newCategoryId;
        },
    },
    methods: {
        getUserID(){
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                const tokenPayload = jwt.split('.')[1];
                const decodedPayload = JSON.parse(atob(tokenPayload));

                if (decodedPayload.user_id) {
                    this.newArticle.creatorId = decodedPayload.user_id;
                }
            }
        },
        fetchCategories() {
            this.$axios.get("/api/categories").then(response => {
                this.categories = response.data;
            });
        },
        addArticle(){
            if(this.newArticle.title && this.newArticle.text && this.selectedCategory) {
                this.$axios.post('/api/articles/auth', this.newArticle)
                    .then((response) => {
                        this.newArticle.title = '';
                        this.newArticle.text = '';
                        this.$axios.post('/api/tags/auth/addTo', {
                            tags: this.tags,
                            articleId: response.data.id
                        }).then((r) => {
                            this.$router.push({name: 'News'});
                            console.log(r);
                        })
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // this.$router.push({name: 'News'});
                    })
                this.invalidInput = false;
            } else {
                this.invalidInput = true;
            }
        }
    }
}
</script>

<style scoped>
.small {
    font-size: 0.8rem; /* Adjust the font size as desired */
}

</style>