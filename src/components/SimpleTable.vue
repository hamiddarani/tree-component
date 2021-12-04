<template>
  <div class="simpleTable">
    <b-button
      id="reset"
      variant="primary"
      v-b-modal.modal-1
      @click="resetFormData"
      >create post</b-button
    >
    <b-table-simple>
      <b-thead>
        <b-tr>
          <b-td>id</b-td>
          <b-td>title</b-td>
          <b-td>body</b-td>
          <b-td>actions</b-td>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="post in posts" :key="post.id">
          <b-td>{{ post.id }}</b-td>
          <b-td>{{ post.title }}</b-td>
          <b-td>{{ post.body }}</b-td>
          <b-td class="d-flex gap-2">
            <b-button
              id="edit"
              variant="primary"
              v-b-modal.modal-1
              @click="handleShowEditModal(post)"
            >
              edit
            </b-button>
            <b-button id="delete" variant="danger" @click="deleteItem(post.id)"> delete </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <b-modal id="modal-1" title="BootstrapVue" @ok="handleSubmit">
      <h2 class="my-4">{{ isEdited ? "Edit Post" : "Create Post" }}</h2>
      <input class="form-control mb-2" v-model="title" />
      <textarea class="form-control" v-model="body" />
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SimpleData",
  data() {
    return {
      title: null,
      body: null,
      isEdited: false,
      post: null,
    };
  },
  computed: {
    posts: {
      get() {
        return this.$store.state.posts;
      },
      set() {
        return;
      },
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      this.$store.commit("GET_POSTS", data);
    },
    handleShowEditModal(post) {
      this.isEdited = true;
      this.title = post.title;
      this.body = post.body;
      this.post = post || null;
    },
    createID() {
      return Math.floor(Math.random() * 1000);
    },
    resetFormData() {
      (this.title = null), (this.body = null);
    },
    handleSubmit() {
      if (!this.isEdited) {
        if (this.title === null || this.body === null) return;
        this.$store.dispatch("createPost", {
          id: this.createID(),
          userId: 11,
          title: this.title,
          body: this.body,
        });
      } else {
        this.$store.dispatch("editPost", {
          id: this.post.id,
          title: this.title,
          body: this.body,
        });
        this.post = null;
        this.isEdited = false;
      }
    },
    deleteItem(id){
      this.$store.commit("DELETE_POST" , id)
    }
  },
};
</script>

<style></style>
