import React, { useState, useEffect, useRef } from 'react';

export default function TodoForm(props: any) {
    const [input, setInput] = useState(props.edit ? props.edit.value : "");
    const inputRef = useRef<any>(null);

    useEffect(() => {
        inputRef.current.focus();
    });
    const handleChange = (e: any) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.onSubmit({
            id: Math.random(),
            text: input
        });

        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '8px' }}>
            {props.edit ? (
                <div className="overlay">
                    <div className="modal">
                        <h1>Change A Task?</h1>
                        <div className="todo-container">
                            <input
                                type='text'
                                placeholder="Change A Task?"
                                value={input}
                                name="text"
                                className="todo-input edit todo-container-95"
                                onChange={handleChange}
                                ref={inputRef}
                            />
                            <button className="todo-button edit todo-container-5">
                                <img src='/img/floppy.svg' alt='Edit' height={32} className="svg-color-white" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (

                <div className="todo-container">
                    <input
                        type='text'
                        placeholder="Add A Task!"
                        value={input}
                        name="text"
                        className="todo-input todo-container-95"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className="todo-button todo-container-5">
                        <img src="/img/plus.svg" alt='Add' height={32} className="svg-color-white" />
                    </button>
                </div>

            )}
        </form>
    );
}