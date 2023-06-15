<template>
    <div>
        <h1>{{ category }}</h1>
        <div v-for="article in articles" :key="article.id">
            <ReadArticle :article="article"></ReadArticle>
        </div>

    </div>
</template>

<script>
import ReadArticle from "@/components/ReadArticle.vue";

export default {
    name: "NewsInCategory",
    components: {ReadArticle},
    data(){
        return{
            categoryId: null,
            category: null,
            articles: []
        }
    },
    created(){
        this.categoryId = this.$route.params.id;
        this.$axios.get("/api/categories/" + this.categoryId).then(response => {
            this.category = response.data.name;
            console.log(response.data);
        }).catch(error =>{
            console.log("Error: " + error)
        });
        this.$axios.get('/api/articles/fromCategory/'+ this.categoryId).then((response) => {
            this.articles = response.data;
        });
    }
}
</script>

<style scoped>

</style>