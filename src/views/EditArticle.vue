<template>
    <div>
        <h1>Edit article</h1>
        <form @submit.prevent="updateArticle">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" v-model="editedArticle.title" class="form-control">
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
                <input type="text" id="tags" v-model="editedArticle.tags" class="form-control">
            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Text</label>
                <textarea id="text" v-model="editedArticle.text" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Update</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditArticle",
    data(){
        return{
            articleId: null,
            editedArticle: {
                title: null,
                text: null,
                tags: null,
                categoryId: null
            },
            selectedCategory: null,
            categories: [],
        }
    },
    created() {
        this.fetchArticle();
        this.fetchCategories();
        this.fetchTags();
    },
    methods: {
        fetchArticle(){
            this.articleId = this.$route.params.id;
            this.$axios.get("/api/articles/" + this.articleId).then(response => {
                this.editedArticle.title = response.data.title;
                this.editedArticle.text = response.data.text;
                this.editedArticle.tags = response.data.tags;
                this.editedArticle.categoryId = response.data.categoryId;
                this.selectedCategory = response.data.categoryId;
            });
        },
        fetchCategories() {
            this.$axios.get("/api/categories").then(response => {
                this.categories = response.data;
            });
        },
        fetchTags(){
            this.$axios.get("/api/tags/fromArticle/"+this.articleId).then(response => {
                this.editedArticle.tags =  response.data.map(obj => obj.tag).join(', ');
            });
        },
        updateArticle(){
            this.$axios.put('/api/articles/' + this.articleId, this.editedArticle)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    this.$axios.put('/api/tags', {
                        tags: this.editedArticle.tags,
                        articleId: this.articleId
                        // eslint-disable-next-line no-unused-vars
                    }).then((r) => {
                        this.$router.push({name: 'News'});
                    }).catch(error => {
                        console.error('Error:', error);
                    })
                }).catch(error => {
                    console.error('Error:', error);
                    // this.$router.push({name: 'News'});
                })
        }
    },
    watch: {
        selectedCategory(newCategoryId) {
            this.editedArticle.categoryId = newCategoryId;
        },
    },
}
</script>

<style scoped>

</style>