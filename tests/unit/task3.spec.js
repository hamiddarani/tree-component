import Task3 from "@/components/Task3.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import App from '@/App.vue'

describe("recursive component test", () => {
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);
  const wrapper = mount(Task3, {
    localVue,
    propsData: {
      simpleData: [
        { id: 1, name: "laptop", parentId: null },
        { id: 2, name: "mobile", parentId: null },
        { id: 21, name: "samsung", parentId: 1 },
        { id: 22, name: "lenovo", parentId: 1 },
        { id: 23, name: "lenovo", parentId: 21 },
        { id: 24, name: "apple", parentId: 2 },
      ],
      parentId: null,
      value: {
        ids: [1, 2],
      },
    },
  });

  test("children", async () => {
    expect(wrapper.vm.children.length).toBe(2);
    await wrapper.setProps({ parentId: 1 });
    expect(wrapper.vm.children.length).toBe(2);
  });

  test("checked", () => {
    const checked = wrapper.vm.checked(wrapper.vm.$props.simpleData[0]);
    expect(checked).toBeTruthy();
    const checked2 = wrapper.vm.checked(wrapper.vm.$props.simpleData[4]);
    expect(checked2).toBeFalsy();
  });

  test("unique array func", () => {
    const myArray = [1, 2, 3, 4, 1];
    const uniqueArray = wrapper.vm.uniqueArray(myArray);
    expect(uniqueArray.length).toBe(4);
  });

  test("filter array", () => {
    const result = wrapper.vm.filterArray(1);
    expect(result.length).toBe(2);
  });

  test("remove item", () => {
    wrapper.vm.removeItem(1);
    expect(wrapper.props().value.ids.length).toBe(1);
  });

  test("loop select", async () => {
    await wrapper.setProps({ value: { ids: [] } });
    wrapper.vm.loopSelect(1);
    expect(wrapper.props().value.ids.length).toBe(3);
    expect(wrapper.props().value.ids).toEqual(
      expect.arrayContaining([21, 22, 23])
    );
  });

  test("loop unselect", async () => {
    await wrapper.setProps({ value: { ids: [1, 2, 21, 22, 23, 24] } });
    wrapper.vm.loopUnselect(1);
    expect(wrapper.props().value.ids.length).toBe(3);
  });

  test("reverseLoopUnselectCondition", async () => {
    await wrapper.setProps({ value: { ids: [21, 22, 23] } });
    let successCondition = wrapper.vm.reverseLoopUnselectCondition(1);
    expect(successCondition).toBeTruthy();

    await wrapper.setProps({ value: { ids: [21, 23] } });
    let FailCondition = wrapper.vm.reverseLoopUnselectCondition(1);
    expect(FailCondition).toBeFalsy();
  });

  test("forwardLoopUnselect", async () => {
    await wrapper.setProps({ value: { ids: [1, 21] } });
    wrapper.vm.forwardLoopUnselect({ id: 21, name: "samsung", parentId: 1 });
    expect(wrapper.props().value.ids).toEqual([]);
    await wrapper.setProps({ value: { ids: [1, 21] } });
    wrapper.vm.forwardLoopUnselect({ id: 23, name: "lenovo", parentId: 21 });
    expect(wrapper.props().value.ids).toEqual([1, 21]);
    wrapper.vm.forwardLoopUnselect({ id: 1, name: "laptop", parentId: null });
    expect(wrapper.props().value.ids).toEqual([21]);
  });
  test("reverseLoopSelect", async () => {
    await wrapper.setProps({ value: { ids: [] } });
    wrapper.vm.reverseLoopSelect(23);
    wrapper.vm.reverseLoopSelect(22);
    expect(wrapper.props().value.ids).toEqual(
      expect.arrayContaining([1, 21, 22, 23])
    );
  });

  test("change", async () => {
    await wrapper.setProps({ value: { ids: [] } });
    wrapper.vm.change({ id: 1, name: "laptop", parentId: null });

    expect(wrapper.props().value.ids).toEqual(
      expect.arrayContaining([1, 21, 22, 23])
    );
  });

  test("intederminateCondition", async () => {
    await wrapper.setProps({ value: { ids: [1] } });
    let indeterminateCondition = wrapper.vm.intederminateCondition({
      id: 1,
      name: "laptop",
      parentId: null,
    });
    expect(indeterminateCondition).toBeFalsy();
    indeterminateCondition = wrapper.vm.intederminateCondition({
      id: 24,
      name: "apple",
      parentId: 2,
    });
    expect(indeterminateCondition).toBeFalsy();
    await wrapper.setProps({ value: { ids: [21] } });
    indeterminateCondition = wrapper.vm.intederminateCondition({
      id: 1,
      name: "laptop",
      parentId: null,
    });
    expect(indeterminateCondition).toBeTruthy();
    await wrapper.setProps({ value: { ids: [23] } });
    indeterminateCondition = wrapper.vm.intederminateCondition({
      id: 1,
      name: "laptop",
      parentId: null,
    });
    expect(indeterminateCondition).toBeTruthy();
  });

  test("onlyOneChildInArray", async () => {
    await wrapper.setProps({ value: { ids: [23] } });
    let isChildInArray = wrapper.vm.onlyOneChildInArray({
      id: 21,
      name: "samsung",
      parentId: 1,
    });
    expect(isChildInArray).toBeTruthy();
    isChildInArray = wrapper.vm.onlyOneChildInArray({
      id: 2,
      name: "samsung",
      parentId: 1,
    });
    expect(isChildInArray).toBeFalsy();
  });

  test("onlyOneChildIndeterminateTrue", async () => {
    await wrapper.setProps({ value: { ids: [23] } });
    let isOnlyOneChildIndeterminateTrue =
      wrapper.vm.onlyOneChildIndeterminateTrue({
        id: 1,
        name: "laptop",
        parentId: null,
      });
    expect(isOnlyOneChildIndeterminateTrue).toBeTruthy();
    isOnlyOneChildIndeterminateTrue = wrapper.vm.onlyOneChildIndeterminateTrue({
      id: 2,
      name: "laptop",
      parentId: null,
    });
    expect(isOnlyOneChildIndeterminateTrue).toBeFalsy();
  });

  test("change checkbox" , async() => {
    const wrapper = mount(App , {
      localVue
    });
    await wrapper.setData({
      simpleData : [
        { id: 1, name: "laptop", parentId: null },
        { id: 2, name: "mobile", parentId: null },
        { id: 21, name: "samsung", parentId: 1 },
        { id: 22, name: "lenovo", parentId: 1 },
        { id: 23, name: "lenovo", parentId: 21 },
        { id: 24, name: "apple", parentId: 2 },
      ]
    })
    await wrapper.find("#child-1").trigger('change');
    expect(wrapper.vm.selected.ids).toEqual(expect.arrayContaining([1 , 21 , 22 , 23]))
    await wrapper.find("#child-1").trigger('change');
    expect(wrapper.vm.selected.ids).toEqual([])
    await wrapper.find("#child-24").trigger('change');
    expect(wrapper.vm.selected.ids).toEqual(expect.arrayContaining([2 , 24]))
    await wrapper.find("#child-22").trigger('change')
    expect(wrapper.vm.selected.ids).toEqual(expect.arrayContaining([22]))
  })
});
