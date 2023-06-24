import React, { useState } from 'react';
import TodoForm from './TodoForm';

export default function Todo({ todos, completeTodo, removeTodo, updatedTodo }: any) {
    const [edit, setEdit] = useState({
        id: null,
        value: ""
    });

    const submitUpdate = (value: any) => {
        updatedTodo(edit.id, value);
        setEdit({
            id: null,
            value: ""
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo: any, index: any) => (
        <div className={todo.isComplete ? "todo-container todo-row complete" : "todo-container todo-row"} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)} className="todo-container-88">
                <div className="flex-todo">{todo.text}</div>
            </div >
            <div className="todo-container-row">
                <button onClick={() => removeTodo(todo.id)} className="edit-button todo-container-6">
                    <img src="/img/trash.svg" alt='Delete' height={24} className="svg-color-white" />
                </button>
                <button onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-button todo-container-6">
                    <img src="/img/pencil.svg" alt='Edit' height={24} className="svg-color-white" />
                </button>
            </div>
        </div>
    ));
}