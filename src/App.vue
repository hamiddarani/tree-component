<template>
  <div class="container mt-4">
      <SimpleTable />
  </div>
</template>

<script>
import Task3 from "@/components/Task3";
import MaterialInput from "@/components/MaterialInput";
import Counter from "./components/Counter.vue";
import axios from "axios";
import SimpleTable from './components/SimpleTable.vue';
export default {
  name: "App",
  components: {
    SimpleTable,
  },
  data() {
    return {
      count: false,
      posts: [],
      selected: {
        ids: [],
      },
      simpleData: [
        { id: 1, name: "mobile", parentId: null },
        { id: 2, name: "car", parentId: null },
        { id: 4, name: "book", parentId: null },
        { id: 3, name: "laptop", parentId: null },
        { id: 21, name: "samsung", parentId: 1 },
        { id: 5, name: "sumsung z-flip", parentId: 21 },
        { id: 6, name: "galexy note 10", parentId: 21 },
        { id: 7, name: "A10", parentId: 21 },
        { id: 8, name: "A20", parentId: 21 },
        { id: 22, name: "cover A10", parentId: 7 },
        { id: 27, name: "cover A10+", parentId: 7 },
        { id: 28, name: "cover A10+", parentId: 27 },
        { id: 23, name: "cover A20", parentId: 8 },
        { id: 9, name: "bmw", parentId: 2 },
        { id: 10, name: "buggati", parentId: 2 },
        { id: 11, name: "ferrari", parentId: 2 },
        { id: 12, name: "sypa", parentId: 2 },
        { id: 13, name: "irankhodro", parentId: 2 },
        { id: 14, name: "asus", parentId: 3 },
        { id: 24, name: "mouse asus", parentId: 14 },
        { id: 25, name: "mouse asus x", parentId: 24 },
        { id: 26, name: "mouse asus x black", parentId: 25 },
        { id: 29, name: "mouse asus x white", parentId: 25 },
        { id: 15, name: "lenovo", parentId: 3 },
        { id: 16, name: "samsung", parentId: 3 },
        { id: 17, name: "harry potter", parentId: 4 },
        { id: 18, name: "dune", parentId: 4 },
        { id: 19, name: "her eyes", parentId: 4 },
        { id: 20, name: "me before you", parentId: 4 },
        { id: 30, name: "lg", parentId: 1 },
        { id: 31, name: "G3", parentId: 30 },
        { id: 32, name: "G4", parentId: 30 },
        { id: 34, name: "G4 Cover", parentId: 32 },
        { id: 33, name: "G5", parentId: 30 },
      ],
    };
  },
  methods: {
    change() {
      this.count = true;
    },
    async getData() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      this.posts = response.data;
    },
  },
};
</script>
