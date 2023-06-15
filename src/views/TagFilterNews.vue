<template>
    <div>
        <h1>Tag: <strong>{{ tag.tag }}</strong></h1>
        <div v-for="article in articles" :key="article.id">
            <ReadArticle :article="article"></ReadArticle>
        </div>

    </div>
</template>

<script>
import ReadArticle from "@/components/ReadArticle.vue";

export default {
    name: "TagFilterNews",
    components: {ReadArticle},
    data(){
        return {
            tag: {
                id: null,
                tag: null
            },
            articles: []
        }
    },
    created() {
        this.tag.id = this.$route.params.id;
        this.$axios.get("/api/tags/"+this.tag.id).then(response => {
            this.tag.tag =  response.data.tag;
        });
        this.$axios.get("/api/articles/withTag/"+this.tag.id).then(response => {
            this.articles =  response.data;
        });
    }
}
</script>

<style scoped>

</style>