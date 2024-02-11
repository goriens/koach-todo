import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      await axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getTodo = async (id) => {
    try {
      await axios
        .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => {
          setTodo(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const updateTodo = async (id, completed) => {
    try {
      await axios
        .patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          completed: !completed,
        })
        .then((res) => {
          setTodo(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const deleteTodo = async (id) => {
    try {
      await axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
          setData(data.filter((e) => e.id !== id));
          setTodo(false);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <nav className="nav">
        <h1>TODOS</h1>
      </nav>
      <section className="container">
        <div className="box1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((e) => (
              <div key={e.id} className="list" onClick={() => getTodo(e.id)}>
                <div>
                  <span className="dot">{e.id}</span>
                </div>
                <p>{e.title}</p>
              </div>
            ))
          )}
        </div>
        <div className="box2">
          {todo ? (
            <div className="card">
              <p>
                <b>Title:</b> <p>{todo?.title}</p>
              </p>
              <p>
                <b>User Id:</b> <p>{todo?.userId}</p>
              </p>
              <div>
                <button
                  className="btn btn1"
                  onClick={() => deleteTodo(todo.id)}
                >
                  DELETE
                </button>
                <button
                  className={
                    todo.completed
                      ? "btn btn2 complete"
                      : "btn btn2 incomplete-todo"
                  }
                  onClick={() => updateTodo(todo.id, todo.completed)}
                >
                  {todo.completed ? "COMPLETED" : "INCOMPLETE"}
                </button>
              </div>
            </div>
          ) : (
            <div>Select a To-Do to modify it</div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
