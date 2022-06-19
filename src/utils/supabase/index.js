import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wfsmiseslpfpbioyfiqw.supabase.co";
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getTodos = async () => {
  try {
    let { data: todos } = await supabase.from("todos").select("*");
    return todos;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoSupa = async (title) => {
  let todo = { title, done: false };
  const { data, error } = await supabase.from("todos").insert([todo]);
  console.log("response add todo supe1", data, error);
  if (!data) {
    throw error;
  } else {
    return data;
  }
};

export const updateTodoSupa = async (todo) => {
  try {
    const { data } = await supabase
      .from("todos")
      .update({ done: todo.done })
      .eq("id", todo.id);
    console.log("update supa", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodoSupa = async (id) => {
  try {
    const { data } = await supabase.from("todos").delete().eq("id", id);
    console.log("delete supa", id);
    return data;
  } catch (error) {
    console.error(error);
  }
};
