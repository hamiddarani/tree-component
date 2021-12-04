<template>
  <div class="input-group1">
    <input type="text" class="input1" />
    <div class="label">
      <label>{{ field }}</label>
    </div>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: String,
      required: false,
      default: "Field",
    },
  },
};
</script>

<style>
.input-group1 {
  position: relative;
}
.input1 {
  width: 500px;
  height: 48px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;
  transition: border 0.2s ease;
}
.input1:focus {
  border: 2px solid blue;
}
.input1:focus + .label {
  top: -12px;
  right: 12px;
  padding: 0 4px;
  color: blue;
}
.label {
  display: flex;
  align-items: center;
  position: absolute;
  right: 12px;
  top: 10px;
  transition: all 0.5s ease;
  background-color: white;
  z-index: 2;
  color: #ccc;
  pointer-events: none;
  width: auto;
}
.circle {
  background-color: white;
  width: 0px;
  height: 2px;
  transition: all 0.3s ease-in;
  position: absolute;
  top: -1px;
  right: 25px;
}

.input1:focus ~ .circle {
  width: 15px;
}
</style>
