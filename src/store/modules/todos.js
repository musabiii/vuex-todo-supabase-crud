import {
  addTodoSupa,
  deleteTodoSupa,
  getTodos,
  updateTodoSupa,
} from "@/utils/supabase";

const state = {
  todos: [],
  isLoading: false,
  isError: false,
};

const getters = {
  allTodos: (state) => state.todos,
  isLoading: (state) => state.isLoading,
  isError: (state) => state.isError,
};

const actions = {
  async fetchTodos({ commit }) {
    commit("setIsLoading", true);
    await getTodos()
      .then((res) => {
        commit("setIsLoading", false);
        commit("setTodos", res);
      })
      .catch(() => {
        commit("setIsError", true);
      });
  },
  async addTodo({ commit }, title) {
    if (!title) return;

    commit("setIsLoading", true);
    commit("setIsError", false);
    await addTodoSupa(title)
      .then(() => {
        commit("setIsLoading", false);
        commit("addTodo", {
          id: +new Date(),
          title,
          done: false,
        });
      })
      .catch((error) => {
        commit("setIsError", true);
        commit("setIsLoading", false);
        throw error;
      });
  },
  async removeTodo({ commit }, id) {
    await deleteTodoSupa(id)
    .then(() => {
      commit("removeTodo", id);
    });
  },
  async updateTodo({ commit }, todo) {
    commit("updateTodo", todo);
    await updateTodoSupa(todo)
    .then(() => {
    })
    .catch((error) => {
      commit("updateTodo", {...todo,done:!todo.done});
      console.log(error)
    });
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
  setIsLoading: (state, isLoading) => (state.isLoading = isLoading),
  setIsError: (state, isError) => (state.isError = isError),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
