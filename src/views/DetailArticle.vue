<template>
    <div>
        <h1 class="title">{{ article.title }}</h1>
        <p class="left">Published on: {{ article.creationTime }}</p>
        <p class="left">Author: {{ author }}</p>
        <p class="left">{{ article.text }}</p>

        <div>
            <h3 class="left">Tags:</h3>
            <ul class="list-inline left">
                <li v-for="tag in tags" :key="tag.id" class="list-inline-item bordered-item" @click="filter(tag.id)">{{ tag.tag }}</li>
            </ul>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <h2 class="left">Comments</h2>
                    <div v-if="comments.length === 0" class="left">
                        <p>No comments yet.</p>
                    </div>
                    <div v-else>
                        <div v-for="comment in comments" :key="comment.id" class="card mb-3">
                            <div class="card-body">
                                <p class="card-text left">By: <strong>{{ comment.author }}</strong></p>
                                <p class="card-text left">{{ comment.text }}</p>
                                <p class="card-text left small">{{ comment.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <h2>Add a Comment</h2>
                    <form @submit.prevent="addComment" class="mb-4">
                        <div class="mb-3">
                            <label for="author" class="form-label">Author:</label>
                            <input type="text" id="author" v-model="newComment.author" required class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="comment" class="form-label">Comment:</label>
                            <textarea id="comment" v-model="newComment.text" required class="form-control"></textarea>
                        </div>
                        <div v-if="invalidInput" class="alert alert-danger" role="alert">
                            Please fill in all fields.
                        </div>
                        <button type="submit" class="btn btn-success">Submit Comment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "DetailArticle",
    data(){
        return{
            articleId: null,
            article: {
                title: null,
                text: null,
                creationTime: null,
                timesVisited: null,
                creatorId: null,
                categoryId: null,
            },
            author: null,
            tags: [],
            comments: [],
            newComment: {
                author: null,
                text: null,
                date: null,
                article_id: null
            },
            invalidInput: false
        }
    },
    created() {
        this.articleId = this.$route.params.id;
        this.$axios.put("/api/articles/increment/"+this.articleId).then(response => {
            console.log(response);
        });
        this.newComment.article_id = this.articleId;
        this.$axios.get("/api/articles/" + this.articleId).then(response => {
            this.article.title = response.data.title;
            this.article.text = response.data.text;
            this.article.creationTime = response.data.creationTime;
            this.article.timesVisited = response.data.timesVisited;
            this.article.creatorId = response.data.creatorId;
            this.article.categoryId = response.data.categoryId;
            this.$axios.get("/api/users/" + this.article.creatorId).then(response => {
                this.author = response.data.firstName + " " + response.data.lastName ;
            });
        });

        this.$axios.get("/api/tags/fromArticle/"+this.articleId).then(response => {
            this.tags =  response.data;
        });


        this.fetchComments();
    },
     methods: {
         addComment() {
             if (this.newComment.author && this.newComment.text) {
                 this.$axios.post('/api/comments', {
                     author: this.newComment.author,
                     text: this.newComment.text,
                     date: " ",
                     article_id: this.articleId
                     // eslint-disable-next-line no-unused-vars
                 }).then(response => {
                     this.newComment.author = '';
                     this.newComment.text = '';
                     this.fetchComments();
                 }).catch(error =>{
                     console.log("Error: " + error)
                 })
                 this.invalidInput = false;
             } else {
                 this.invalidInput = true;
             }
         },
         fetchComments(){
             this.$axios.get("/api/comments/fromArticle/"+this.articleId).then(response => {
                 this.comments =  response.data;
             });
         },
         filter(tagId){
             this.$router.push({name: 'TagFilterNews', params: {id: tagId}});
         }
     }
}

</script>

<style>

.left {
    text-align: left;
}

.bordered-item {
    border: 1px solid #ccc;
    padding: 5px;
    margin-right: 5px;
    /* Add any other styling you desire */
}

.small {
    font-size: 0.8rem; /* Adjust the font size as desired */
}


</style>