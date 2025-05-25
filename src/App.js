import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import TaskCounter from "./components/TaskCounter";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth, db} from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  // const [past, setPast] = useState([]);
  // const [future, setFuture] = useState([]);
  const [theme, setTheme] = useState("light");
  const [authChecked, setAuthChecked] = useState(false);
  const [suppressFirestoreSync, setSuppressFirestoreSync] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || suppressFirestoreSync) {
      // setTasks([]);  clear tasks if logged out
      return;
    }

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user, suppressFirestoreSync]);

  const handleLogout = () => {
    signOut(auth);
  };

  /*const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now(),
        text: newTask,
        dueDate,
        completed: false,
      };
      setPast([...past, tasks]);
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
      setDueDate("");
    }
  };*/

  const handleAddTask = async () => {
    if (newTask.trim() && user) {
      const newTaskItem = {
        text: newTask,
        dueDate,
        completed: false,
        userId: user.uid,
      };
      try {
        await addDoc(collection(db, "tasks"), newTaskItem);
        setNewTask("");
        setDueDate("");
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  /*
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => {
    setPast([...past, tasks]);
    setTasks(tasks.filter((task) => task.id !== id));
  };
  */

  const handleDelete = async (id) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  /*
  const handleToggle = (id) => {
    setPast([...past, tasks]);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  */

  const handleToggle = async (id, completed) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { completed: !completed });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  /*
  const saveEditing = (id) => {
    setPast([...past, tasks]);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
  };
  */

  const saveEditing = async (id, newText) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { text: newText });
      setEditingTaskId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating task text: ", error);
    }
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleClearCompleted = () => {
    // setPast([...past, tasks]);
    setTasks(tasks.filter((task) => !task.completed));
  };

  const updateTasks = (updatedTasks) => {
    // setPast([...past, tasks]);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  if (!authChecked) {
    return <div className="text-center mt-5">Loading...</div>; // or a spinner
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
            <div className={theme}>
              <div className="container py-5">
                <h1 className="mb-4 text-center">To-Do List</h1>

                <div className="text-end mb-3">
                  <span className="me-2">
                    Logged in as {user?.email || "unknown"}
                  </span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>

                <div className="text-center mb-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                  >
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                  </button>
                </div>

                <TaskInput
                  newTask={newTask}
                  setNewTask={setNewTask}
                  dueDate={dueDate}
                  setDueDate={setDueDate}
                  handleAddTask={handleAddTask}
                />

                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                <TaskFilters filter={filter} setFilter={setFilter} />

                <TaskCounter
                  activeCount={activeCount}
                  completedCount={completedCount}
                  handleClearCompleted={handleClearCompleted}
                />

                <TaskList
                  tasks={filteredTasks}
                  setTasks={updateTasks}
                  editingTaskId={editingTaskId}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  startEditing={startEditing}
                  saveEditing={saveEditing}
                  cancelEditing={cancelEditing}
                  handleDelete={handleDelete}
                  handleToggle={handleToggle}
                />

                {/*
                <div className="btn-group mb-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={async () => {
                      if (past.length === 0) return;
                      const previous = past[past.length - 1];
                      setSuppressFirestoreSync(true);
                      setFuture((f) => [tasks, ...f]);
                      setTasks(previous);
                      setPast((p) => p.slice(0, -1));

                      // Update Firestore
                      await Promise.all(
                        previous.map((task) => {
                          if (task.id) {
                            const ref = doc(db, "tasks", task.id);
                            return updateDoc(ref, {
                              text: task.text,
                              completed: task.completed,
                              dueDate: task.dueDate || null,
                            });
                          }
                          return null;
                        })
                      );

                      setSuppressFirestoreSync(false);
                    }}
                    disabled={past.length === 0}
                  >
                    Undo
                  </button>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={async () => {
                      if (future.length === 0) return;
                      const next = future[0];
                      setSuppressFirestoreSync(true);
                      setPast((p) => [...p, tasks]);
                      setTasks(next);
                      setFuture((f) => f.slice(1));

                      // Update Firestore
                      await Promise.all(
                        next.map((task) => {
                          if (task.id) {
                            const ref = doc(db, "tasks", task.id);
                            return updateDoc(ref, {
                              text: task.text,
                              completed: task.completed,
                              dueDate: task.dueDate || null,
                            });
                          }
                          return null;
                        })
                      );

                      setSuppressFirestoreSync(false);
                    }}
                    disabled={future.length === 0}
                  >
                    Redo
                  </button>
                </div>
                */}
              </div>
            </div>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
