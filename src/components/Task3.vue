<template>
  <div>
    <ul>
      <li v-for="child in children" :key="child.id">
        <b-form-checkbox
          :checked="checked(child)"
          :indeterminate="intederminateCondition(child)"
          @change="change(child)"
        >
          {{ child.id }}
        </b-form-checkbox>
        <Task3 :simpleData="simpleData" :parentId="child.id" v-model="value" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Task3",
  props: {
    simpleData: Array,
    value: Object,
    parentId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    children() {
      return this.simpleData.filter((item) => item.parentId === this.parentId);
    },
  },
  methods: {
    intederminateCondition(child) {
      if (this.value.ids.includes(child.id)) return false;
      if (!this.filterArray(child.id).length) return false;
      if (this.onlyOneChildInArray(child)) return true;
      if (this.onlyOneChildIndeterminateTrue(child)) return true;
      return false;
    },
    checked(child) {
      if (this.value.ids.includes(child.id)) {
        return true;
      }
    },
    change(child) {
      if (this.value.ids.includes(child.id)) {
        if (child.parentId !== null) {
          this.forwardLoopUnselect(
            this.simpleData.find((item) => item.id === child.parentId)
          );
        }
        this.removeItem(child.id);
        this.filterArray(child.id).forEach((i) => {
          this.removeItem(i.id);
          this.loopUnselect(i.id);
        });
        return;
      }

      this.value.ids.push(child.id);
      this.filterArray(child.id).forEach((i) => {
        this.value.ids.push(i.id);
        this.loopSelect(i.id);
      });

      if (this.reverseLoopUnselectCondition(child.parentId)) {
        if (child.parentId !== null) {
          this.value.ids.push(child.parentId);
          this.reverseLoopSelect(
            this.simpleData.find((item) => item.id === child.parentId)?.parentId
          );
        }
      }

      this.value.ids = this.uniqueArray(this.value.ids);
    },
    loopSelect(id) {
      this.filterArray(id).forEach((i) => {
        this.value.ids.push(i.id);
        this.loopSelect(i.id);
      });
    },
    loopUnselect(id) {
      this.filterArray(id).forEach((i) => {
        this.removeItem(i.id);
        this.loopUnselect(i.id);
      });
    },
    forwardLoopUnselect(child) {
      if (this.value.ids.indexOf(child.id) === -1) return;
      this.removeItem(child.id);
      if (child.parentId === null) return;
      this.forwardLoopUnselect(
        this.simpleData.find((item) => item.id === child.parentId)
      );
    },
    reverseLoopSelect(id) {
      if (this.reverseLoopUnselectCondition(id) && id !== null) {
        this.value.ids.push(id);
        this.reverseLoopSelect(
          this.simpleData.find((item) => item.id === id)?.parentId
        );
      }
    },
    filterArray(id) {
      return this.simpleData.filter((item) => item.parentId === id);
    },
    removeItem(id) {
      this.value.ids.splice(this.value.ids.indexOf(id), 1);
    },
    reverseLoopUnselectCondition(id) {
      return this.filterArray(
        this.simpleData.find((item) => item.id === id)?.id
      ).every((item) => {
        return this.value.ids.includes(item.id);
      });
    },
    onlyOneChildInArray(child) {
      return this.filterArray(child.id).some((i) => {
        return this.value.ids.includes(i.id);
      });
    },
    onlyOneChildIndeterminateTrue(child) {
      return this.filterArray(child.id).some((i) => {
        return this.intederminateCondition(i);
      });
    },
    uniqueArray(array) {
      return [...new Set(array)];
    },
  },
};
</script>
