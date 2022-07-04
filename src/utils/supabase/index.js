import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wfsmiseslpfpbioyfiqw.supabase.co";
// const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmc21pc2VzbHBmcGJpb3lmaXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA2NDU3NDUsImV4cCI6MTk2NjIyMTc0NX0.qWATr-YXvygZuF43XoW_FfAkT2-SVQ85-wgHwDUtJaA"
const supabase = createClient(supabaseUrl, supabaseKey);

export const getTodos = async () => {
    let { data: todos,error  } = await supabase.from("todos").select("*");
    if (error) throw error;
    return todos;
};

export const addTodoSupa = async (title) => {
  let todo = { title, done: false };
  const { data, error } = await supabase.from("todos").insert([todo]);
  if (error) throw error;
  return data;
};

export const updateTodoSupa = async (todo) => {
    const { data,error } = await supabase
      .from("todos")
      .update({ done: todo.done })
      .eq("id", todo.id);
    if (error) throw error;
    return data;
};

export const deleteTodoSupa = async (id) => {
    const { data,error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
    return data;
};
