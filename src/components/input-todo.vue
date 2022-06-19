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
    <div v-if="isLoading">loading...</div>
    <div class="error" v-if="isError">Error</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getTodos} from '@/utils/supabase'
export default {
  data() {
    return {
      todo: "",
    };
  },
  computed:{
    ...mapGetters(["isLoading","isError"])
  },
  methods: {
    ...mapActions(["addTodo"]),
    handleClick(e) {
      e.preventDefault();
      this.addTodo(this.todo)
      .then(()=>{
          this.todo = "";
      });
    },
  },
  async mounted() {
    const res = await getTodos();
    console.log(res)
  }
};
</script>

<style>

.error {
    color: red;
}
</style>
