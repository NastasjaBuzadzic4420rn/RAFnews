<template>
    <div>
        <h1>Most popular</h1>
        <div v-for="article in articles" :key="article.id" @click="selectedArticle = article">
            <ReadArticle :article="article"></ReadArticle>
        </div>
    </div>
</template>

<script>
import ReadArticle from "@/components/ReadArticle.vue";

export default {
    name: "MostPopular",
    components: {ReadArticle},
    data(){
        return{
            articles: {},
        }
    },
    created(){
        this.$axios.get(`/api/articles/mostPopular`).then((response) => {
            this.articles = response.data;
        });
    }
}
</script>

<style scoped>

</style>