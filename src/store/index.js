import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts : [
      
    ]
  },
  mutations: {
    GET_POSTS(state , payload){
      state.posts = payload
    },
    CREATE_POST(state , payload){
      state.posts.push(payload)
    },
    DELETE_POST(state , payload){
      const postIndex =state.posts.findIndex(post => post.id === payload);
      state.posts.splice(postIndex , 1)
    },
    EDIT_POST(state , payload){
      const post =state.posts.find(post => post.id === payload.id);
      console.log(post)
      post.title = payload.title;
      post.body = payload.body;
      console.log(payload)
    }
  },
  actions: {
    getPosts(context , payload){
      context.commit('GET_POSTS' , payload)
    },
    createPost(context , payload){
      context.commit('CREATE_POST' , payload)
    },
    deletePost(context , payload){
      context.commit('DELETE_POST' , payload)
    },
    editPost(context , payload){
      context.commit('EDIT_POST' , payload)
    }
  },
  modules: {
  }
})
