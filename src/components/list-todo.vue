<template>
  <div>
    <ul class="list-group">
      <item-todo v-for="todo in allTodos" :todo="todo" :key="todo.id"/>
    </ul>
  </div>
</template>

<script>
import ItemTodo from "./item-todo.vue";
import {mapActions, mapGetters} from 'vuex';
export default {
  components: { ItemTodo },
  computed:{
    ...mapGetters(["allTodos"])
  },
  methods:{
    ...mapActions(['fetchTodos'])
  },
  created() {
    this.fetchTodos();
  }
};
</script>

<style></style>
