<template>
    <div>
        <div class="article-container border p-3">
            <div class="article-container border p-3">
                <div class="title-date-container" @click="openArticle">
                    <h3 class="title" >{{ article.title }}</h3>
<!--                    <router-link :to="{ name: 'DetailArticle', params: {id: article.id} }" tag="h3" class="title" :class="{ active: $route.name === 'DetailArticle' }">-->
<!--                        {{ article.title }}-->
<!--                    </router-link>-->
                    <p class="date">{{ article.creationTime }}</p>
                </div>
            </div>
            <p class="author">{{ category }}</p>
            <p class="text">{{ article.text | shortText}}</p>
            <div>
                <p class="text">Read more</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReadArticle",
    data(){
        return{
            category: null,
        }
    },
    created() {
        this.$axios.get("/api/categories/" + this.article.categoryId).then(response => {
            this.category = response.data.name;
            console.log(response.data);
        }).catch(error =>{
            console.log("Error: " + error)
        });
    },
    props: {
        article: {
            type: Object,
            required: true,
        }
    },
    filters: {
        shortText(text) {
            if (text.length <= 100) {
                return text;
            } else {
                return text.slice(0, 97) + "...";
            }
        },
    },
    methods: {
        deleteArticle(id){
            this.$axios.delete('/api/comments/fromArticle/' + id)
                .then((response) => {
                    console.log(response);
                    this.$axios.delete('/api/articles/auth/' + id)
                        .then((response) => {
                            console.log(response);
                            this.fetchArticles();
                        })
                })
        },
        openArticle(){
            this.$router.push({name: 'DetailArticle', params: {id: this.article.id}});
        }
    }
}
</script>

<style scoped>

.article-container {
    border: 1px solid #ddd;
    margin: 5px;
}

.title {
    margin: 0;
    text-align: left;
}

.author {
    text-align: left;
}

.date {
    margin: 0;
    text-align: right;
}

.text {
    margin-bottom: 0;
    text-align: left;
}

.title-date-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>