<template>
  <div>
    <li class="list-group-item d-flex justify-content-between">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        :value="todo.done"
        :id="todo.id"
        role="button"
        @change.prevent="handleChange"
      />
      <label :for="todo.id" :class="{ done: todo.done }">
        {{ todo.title }}
      </label>
      <button
        role="button"
        type="button"
        class="btn-close"
        @click="handleDel"
      ></button>
    </li>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["removeTodo", "updateTodo"]),
    handleDel(e) {
      e.preventDefault();
      this.removeTodo(this.todo.id);
    },
    handleChange() {
      this.updateTodo({ ...this.todo, done: !this.todo.done });
    },
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
