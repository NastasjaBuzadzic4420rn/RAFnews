<template>
  <div>
      <div class="article-container border p-3">
          <div class="article-container border p-3">
              <div class="title-date-container" @click="openArticle">
                  <h3 class="title" >{{ article.title }}</h3>
                  <p class="date">{{ article.creationTime }}</p>
              </div>
          </div>
          <p class="author">{{ author }}</p>
          <p class="text">{{ article.text | shortText}}</p>
          <div>
              <p class="text">Read more</p>
              <router-link :to="{ name: 'EditArticle', params: {id: article.id} }" tag="button" class="btn btn-success" :class="{ active: $route.name === 'EditArticle' }">
                  Edit
              </router-link>
              <button class="btn btn-success" @click="deleteArticle(article.id)">Delete</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Article",
    data(){
        return{
          author: null,
        }
    },
    created() {
       this.fetchArticles();
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
        fetchArticles(){
            this.$axios.get("/api/users/" + this.article.creatorId).then(response => {
                this.author = response.data.firstName + " " + response.data.lastName ;
            });
        },
        deleteArticle(id){
            this.$axios.delete('/api/comments/fromArticle/' + id)
                .then((response) => {
                    console.log(response);
                    this.$axios.delete('/api/articles/' + id)
                        .then((response) => {
                            console.log(response);
                            this.fetchArticles();
                        })
                })
        },
        openArticle(){
            //TODO: napraviti ovo za novi tab
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

button {
    width: 100px;
    margin: 5px;
}


</style>