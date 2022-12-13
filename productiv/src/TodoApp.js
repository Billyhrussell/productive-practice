import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp({ initialTodos }) {
const [todos, setTodos] = useState(initialTodos);

  /** add a new todo to list */
  //passed down to todoForm
  function create(newTodo) {
    newTodo.id = uuid();
    let newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  /** update a todo with updatedTodo */
  //passed to editableTodoList -> editableTodo
  function update(updatedTodo) {
    for(let todo of todos){
      if(todo.id === updatedTodo.id){
        todo = updatedTodo;
      }
    }
    let newTodos = [...todos];
    setTodos(newTodos);
  }

  /** delete a todo by id */
  //passed to editableTodoList -> editableTodo
  function remove(id) {
    let newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  return (
      <main className="TodoApp">
        <div className="row">

          <div className="col-md-6">
            {todos.length > 0 ? <EditableTodoList update={update} remove={remove} todos={todos}/> :
            <span className="text-muted">You have no todos.</span>}
          </div>

          <div className="col-md-6">
            (if no top todo, omit this whole section)
            <section className="mb-4">
              <h3>Top Todo</h3>
              <TopTodo />
            </section>

            <section>
              <h3 className="mb-3">Add Nü</h3>
              <TodoForm handleSave={create}/>
            </section>
          </div>

        </div>
      </main>
  );
}

export default TodoApp;