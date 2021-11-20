// import axios from "axios";

// const myPlugin = {
//     install(Vue){
//         Vue.mixin({
//             data(){
//                 return {
//                     information : [],
//                 }
//             },
//             methods: {
//                 async fetchData(api){
//                     try {
//                         const {data} = await axios.get(`https://jsonplaceholder.typicode.com/${api}`);
//                         this.information = data
//                     } catch (err) {
//                         console.log(err)
//                     }
//                 }
//             }
//         })
//         Vue.prototype.$api = {
//             posts : "posts"
//         }

//         // Object.defineProperty(Vue.prototype, '$api', {
//         //     posts : 'posts'
//         // });
//     }
// }

// export default myPlugin;