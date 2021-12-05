import SimpleTable from "@/components/SimpleTable";
import { createLocalVue, mount } from "@vue/test-utils";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";


const localVue = createLocalVue()
localVue.use(BootstrapVue);

jest.mock("axios");

axios.get.mockResolvedValue({
  data: [
    {id  :1}
  ],
});


test("test table without vuex use mock" , async() => {
    const mockStore = { commit: jest.fn() , state : {posts : []} }
    const wrapper = mount(SimpleTable , {
        localVue ,
        mocks : {
            $store : mockStore
        }
    })

    
    await wrapper.vm.getData();
    const data = [{id : 1 }]
    expect(mockStore.commit).toHaveBeenCalledWith("GET_POSTS" , data)
})

test("delete Item with mock store" , () => {
    const mockStore = { commit: jest.fn() , state : {posts : []} }
    const wrapper = mount(SimpleTable , {
        localVue ,
        mocks : {
            $store : mockStore
        }
    })
    wrapper.vm.deleteItem();
    expect(mockStore.commit).toHaveBeenCalledWith("DELETE_POST" , 1)
})