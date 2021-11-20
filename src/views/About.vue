<template>
  <div id="app" class="container mt-4">
    <div class="d-flex justify-content-start">
      <b-button v-b-modal="'my-modal'" class="flex-end" variant="outline-primary" @click="reset">Add new post</b-button>
    </div>

    <b-alert :show="error" variant="danger" class="my-2">all fields must be required</b-alert>   
    
    <!-- <b-row class="container mx-auto"> 
      <b-table borderless small details-td-class= "bg-danger" striped hover :items="posts" :fields="fields">
          <template #cell(body)="data" >
            {{data.item.body | reduceText}}
          </template>

          <template #cell(actions)="data">
              <div class="d-flex gap-2 align-self-center">
                <b-button class="mr-4" variant="danger" size="sm" @click="handleDeletePost(data.item.id)">
                  <i class="fas fa-trash"></i>
                </b-button>

                <b-button variant="success" size="sm" @click="editHandlaer(data)">
                  <i class="fas fa-edit"></i>
                </b-button>
              </div>
          </template>
      </b-table>
    </b-row> -->
    <b-table-simple small striped bordered class="mt-2">
      <b-thead>
        <b-tr>
          <b-td>user-id</b-td>
          <b-td>id</b-td>
          <b-td>title</b-td>
          <b-td>body</b-td>
          <b-td>actions</b-td>
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr v-for="post in posts" :key="post.id">
          <b-td>{{post.userId}}</b-td>
          <b-td>{{post.id}}</b-td>
          <b-td>{{post.title | reduceText}}</b-td>
          <b-td>{{post.body |reduceText}}</b-td>
          <b-td class="d-flex">
            <b-button variant="danger" size="sm" class="mx-2" @click="handleDeletePost(post.id)">delete</b-button>
            <b-button variant="primary" size="sm" @click="editHandlaer(post)">edit</b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <b-modal 
    ref="my-modal" 
    id="my-modal"
    @ok="submit">

      <template #modal-title>
        add new post
      </template>

      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="success" @click="ok()">
          OK
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>

      <b-form-input v-model="title" placeholder="Enter your name"></b-form-input>
      
      <b-form-textarea
        id="textarea"
        v-model="body"
        placeholder="Enter body..."
        rows="3"
        max-rows="6"
        class="my-4">
      </b-form-textarea>
    </b-modal> 
  </div>
</template>

<script>
import myMixin from '../mixins/myMixin'
import axios from 'axios'
export default {
  name: 'About',
  mixins : [myMixin],
  data(){
    return {
      title : null,
      body : null,
      id : null,
      isEdited : false,
      error : false
  }
  },
  computed : {
    posts(){
      return this.$store.state.posts
    }
  },
  filters:{
    reduceText(val){
      return val.substring(0 , 30)
    }
  },
  async created(){
    try {
      await this.fetchData(this.$api.posts);
      this.$store.dispatch('getPosts' , this.information);
    } catch (err) {
      console.log(err)
    }
  },
  methods : {
    submit(){
      if(this.isEdited){
        this.handelEditPost()
      }else{
        this.handleCreatePost()
      }
    },
    editHandlaer(data){
      this.error = null
      this.isEdited = true
      this.title =data.title;
      this.body = data.body;
      this.id = data.id,
      this.userId = data.userId
      this.$refs['my-modal'].show();
    },
    reset(){
      this.body = null,
      this.title = null,
      this.isEdited = false,
      this.id =null,
      this.userId = null
    },
    handleCreatePost(){
      if(this.title === null || this.body === null){
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
        return;
      };
      this.error = false
      this.$store.dispatch('createPost' , {id :Math.floor(Math.random() * 10000) ,userId : 2 , title : this.title , body : this.body});
    },
    handleDeletePost(id){
      this.$store.dispatch('deletePost' , id)
    },
    handelEditPost(){
      this.$store.dispatch('editPost' , {
        id : this.id,
        userId : this.userId,
        title : this.title,
        body : this.body,
      })
    }
  },
  
}
</script>


