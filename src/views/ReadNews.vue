<template>
    <div>
        <h1>News</h1>
        <div class="btn-group" role="group" aria-label="Categories">
            <button v-for="category in categories" :key="category.id" @click="selectedCategory = category" type="button" class="btn btn-success rounded">{{ category.name }}</button>
        </div>

        <p>{{ label }}</p>

        <div v-for="article in articles" :key="article.id">
            <ReadArticle :article="article"></ReadArticle>
        </div>

    </div>
</template>

<script>
import ReadArticle from "@/components/ReadArticle.vue";

export default {
    name: "ReadNews",
    components: {ReadArticle},
    data(){
        return{
            categories: [],
            selectedCategory: {
                name: null
            },
            label: "select category",
            articles: []
        }
    },
    watch: {
        selectedCategory(newCategory) {
            this.$axios.get('/api/articles/fromCategory/'+ newCategory.id).then((response) => {
                this.articles = response.data;
                if (this.articles.length === 0) {
                    this.label = "No articles found in " + this.selectedCategory.name
                } else {
                    this.label = "";
                }

            });
        },
    },
    created(){
        this.$axios.get('/api/categories').then((response) => {
            this.categories = response.data;
        });
    }

}
</script>

<style scoped>
button {
    margin: 15px;
    width: 200px;
}

</style>