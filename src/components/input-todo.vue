<template>
  <div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="type todo"
        v-model="todo"
        @change="handleClick"
      />
      <button type="button" class="btn btn-success" @click="handleClick">
        add
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {getTodos} from '@/utils/supabase'
export default {
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    handleClick(e) {
      e.preventDefault();
      this.addTodo(this.todo);
      this.todo = "";
    },
  },
  async mounted() {
    const res = await getTodos();
    console.log(res)
  }
};
</script>

<style></style>
