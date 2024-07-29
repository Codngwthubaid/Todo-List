"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';


const MainCard = () => {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [finished, setFinished] = useState(true)
 

    useEffect(() => {
        let storage = localStorage.getItem("todos")
        if (storage) {
            let todos = JSON.parse(storage)
            setTodos(todos)
        }
    }, [])

    const saveToLS = (params) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }


    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleEdit = (e, id) => {
        let Edit = todos.filter(item => {
            return item.id === id
        })
        setTodo(Edit[0].todo)
        let newTodos = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        saveToLS()

    }

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo("")
        console.log(todos);
        saveToLS()
    }

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        saveToLS(localStorage.removeItem(newTodos))
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })

        let newTodos = [...todos]
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos)
    }

    const toggleFinished = () => {
        setFinished(!finished)
    }


    return (
        <div>
            <div className="MainCard">
                <main className='container rounded-md w-[75vw] mx-auto h-[78vh] bg-purple-100'>
                    <div className='font-bold px-5 mx-auto md:font-bold text-lg flex justify-center py-3'>
                        NUTask - Manager your todos at one place
                    </div>
                    <div className='mx-6'>
                        <div className='font-semibold my-3 '>Add a Todo</div>
                        <input onChange={handleChange} value={todo} key={todo.id} className='px-2 w-[60%] py-1 rounded-xl text-sm' type="text" />
                        <button onClick={handleAdd} disabled={todo.length < 1} className='mx-4 text-white text-sm px-2 py-1 bg-purple-600 rounded-xl hover:bg-purple-700 cursor-pointer'>Add</button>
                   
                        <div className='flex gap-x-2 text-sm my-3'>
                            <input checked={finished} onChange={toggleFinished} className='cursor-pointer' type="checkbox" name="checkbox" id="checkbox" />
                            Checked Finished
                        </div>
               
                        <div className='border border-gray-400 w-[90%] mx-auto'></div>
                        <div className='font-semibold my-3'>Yours Todos</div>
                        {todos.length === 0 && <div className='text-sm' >No Todos To Display</div>}

                        {todos.map(item => {
                            return (finished || !item.isCompleted) && <div key={item.id} className='flex align-bottom my-2 justify-between'>
                                    <div className='flex gap-x-2 items-baseline'>
                                        <input onChange={handleCheckbox} className='cursor-pointer pt-2' type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                                        <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                                    </div>
                                    <div className='flex gap-x-4 text-base'>
                                        <div className='cursor-pointer' onClick={(e) => handleDelete(e, item.id)}><MdDelete /> </div>
                                        <div className='cursor-pointer' onClick={(e) => handleEdit(e, item.id)}><IoPencil /></div>
                                    </div>
                                </div>
                            
                        })}
                    </div>

                </main>
            </div>
        </div>
    )
}

export default MainCard
