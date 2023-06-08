<template>
    <div>
        <h1>News</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-10">
                    <div v-for="article in articles" :key="article.id" @click="selectedArticle = article">
                        <Article :article="article"></Article>
                    </div>
                </div>
                <div class="col-md-2">
                    <router-link :to="{ name: 'AddArticle'}" tag="button" class="btn btn-success" :class="{ active: $route.name === 'AddArticle' }">
                        Add article
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Article from "@/components/Article.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "News",
    components: {
        Article
    },
    data(){
        return {
            articles: {},
            selectedArticle: null
        }
    },
    created() {
        this.$axios.get(`/api/articles`).then((response) => {
            this.articles = response.data;
        });
    },
}
</script>

<style scoped>

</style>