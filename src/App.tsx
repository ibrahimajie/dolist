import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import './styles.css';

export default function App() {
    const [todos, setTodos] = useState<any>(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo: any) => {
        const str = todo.toString();
        if (!str.text || /^\s*$/.test(str.text)) {
            setTodos([
                ...todos,
                {
                    text: str.trim()
                }
            ]);
        }
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const updatedTodo = (todoId: any, newValue: any) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos((prev: any) =>
            prev.map((item: any) => (item.id === todoId ? newValue : item))
        );
    };

    const removeTodo = (id: any) => {
        const removeArr = [...todos].filter((todo) => todo.id !== id);

        setTodos(removeArr);
    };

    const completeTodo = (id: any) => {
        let updatedTodos = todos.map((todo: any) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div className='todo-app'>
            <h1>What's The Plans?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updatedTodo={updatedTodo}
            />
        </div>
    );
}