import { addTodoSupa, deleteTodoSupa, getTodos, updateTodoSupa } from "@/utils/supabase";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const res = await getTodos();
    commit("setTodos", res);
  },
  async addTodo({ commit }, title) {
    if (!title) return;

    await addTodoSupa(title);

    commit("addTodo", {
      id: +new Date(),
      title,
      done: false,
    });
  },
  async removeTodo({ commit }, id) {
    await deleteTodoSupa(id);
    commit("removeTodo", id);
  },
  async updateTodo({ commit }, todo) {
    await updateTodoSupa(todo);
    commit("updateTodo", todo);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  addTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((el) => el.id !== id)),
  updateTodo: (state, todo) => {
    const index = state.todos.findIndex((el) => el.id === todo.id);
    if (index === -1) return;
    state.todos.splice(index, 1, todo);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
