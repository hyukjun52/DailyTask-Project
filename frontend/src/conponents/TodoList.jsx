import { useState, useEffect } from "react";
import axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/todos", { title: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id, is_done) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { is_done: !is_done });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header">📝 ToDo List</div>
      <div className="card-body">
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="할 일을 입력하세요"
            style={{ flex: 1, padding: "5px" }}
          />
          <button onClick={addTodo}>추가</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                onClick={() => toggleTodo(todo.id, todo.is_done)}
                style={{ textDecoration: todo.is_done ? "line-through" : "none", cursor: "pointer" }}
              >
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
