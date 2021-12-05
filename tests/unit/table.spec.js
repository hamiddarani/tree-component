import SimpleTable from "@/components/SimpleTable";
import { createLocalVue, mount } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import flushPromises from "flush-promises";
import axios from "axios";


// jest.mock("axios", () => ({
//   get() {
//     return Promise.resolve({
//       data: [
//         {
//           userId: 1,
//           id: 1,
//           title: "aaa",
//           body: "bbb",
//         },
//         {
//           userId: 1,
//           id: 2,
//           title: "qui est esse",
//           body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
//         },
//       ],
//     });
//   },
// }));

jest.mock("axios");

axios.get.mockResolvedValue({
  data: [
    {
      userId: 1,
      id: 1,
      title: "aaa",
      body: "bbb",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
  ],
});




const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("test crud oprations for simple table with vuex", () => {
  const store = new Vuex.Store({
    state: {
      posts: [],
    },
    mutations: {
      GET_POSTS(state, payload) {
        state.posts = payload;
      },
    },
  });
  const wrapper = mount(SimpleTable, {
    store,
    localVue,
    // computed : {
    //   posts : () => {
    //     return [{id :1} , {id :2}]
    //   }
    // }
  });
  test("test get data", async () => {
    // const spy = jest.spyOn(wrapper.vm, "getData");
    wrapper.vm.getData();
    await flushPromises();
    expect(store.state.posts.length).toBe(2);
  });

  test("reset form data", async () => {
    
    wrapper.vm.title = "we";
    wrapper.vm.body = "are";
    const button = wrapper.find("#reset");
    await button.trigger("click");
    expect(wrapper.vm.title).toBeNull();
    expect(wrapper.vm.body).toBeNull();
    expect(wrapper.vm.isEdited).toBeFalsy();
  });

  test("edit form data", async () => {
    wrapper.vm.handleShowEditModal(store.state.posts[0]);
    expect(wrapper.vm.isEdited).toBeTruthy();
    expect(wrapper.vm.title).toBe("aaa");
    expect(wrapper.vm.body).toBe("bbb");
    expect(wrapper.vm.post).toEqual(store.state.posts[0]);
  });

  test("handleSubmit", async () => {
    const store = new Vuex.Store({
      state: {
        posts: [],
      },
      mutations: {
        GET_POSTS: jest.fn(),
        CREATE_POST: jest.fn(),
      },
      actions: {
        createPost: jest.fn(() =>
          store.state.posts.push({ id: 1, userId: 1, title: "as", body: "sd" })
        ),
        editPost: jest.fn(() => (store.state.posts[0].title = "ttt")),
      },
    });
    const wrapper = mount(SimpleTable, {
      store,
      localVue,
    });

    wrapper.vm.isEdited = false;
    wrapper.vm.title = "asa";
    wrapper.vm.body = "ddf";
    wrapper.vm.handleSubmit();
    expect(store.state.posts.length).toBe(1);

    wrapper.vm.isEdited = true;
    wrapper.vm.post = store.state.posts[0];
    wrapper.vm.handleSubmit();
    expect(store.state.posts[0].title).toBe("ttt");
  });

  test("delete Item", async () => {
    const store = new Vuex.Store({
      state: {
        posts: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      mutations: {
        GET_POSTS: jest.fn(),
        DELETE_POST: jest.fn((x, y) => {
          store.state.posts.splice(
            x.posts.findIndex((item) => item.id === y),
            1
          );
          console.log(y);
        }),
      },
    });
    const wrapper = mount(SimpleTable, {
      store,
      localVue,
    });
    // const deleteItem = jest.spyOn(wrapper.vm , "deleteItem");
    // await wrapper.find("#delete").trigger('click')
    // expect(deleteItem).toBeCalled()
    wrapper.vm.deleteItem(2);
    expect(store.state.posts.length).toBe(2);
    expect(store.state.posts.findIndex((item) => item.id === 2)).toBe(-1);
  });
});
