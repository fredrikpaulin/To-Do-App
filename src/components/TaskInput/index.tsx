import {FC, ChangeEvent, useState, useContext} from 'react'
import styled from 'styled-components'
import {TasksContext} from '../../contexts/TasksContext'

const TIContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    padding: 24px;
    label {
        width: 100%;
        text-align: left;
        margin-bottom: 4px;
        color: #757575;
    }
    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 1.2rem;
    }
    button {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1.2rem;
        min-width: 200px;
    }
`

const TaskInput : FC = () => {
    const {dispatch} = useContext(TasksContext)

    const [task, setTask] = useState<string>('')
    const [deadline, setDeadline] = useState<number>(0)
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event.target.name === 'task'){
            const {value} = event.target as HTMLInputElement
            setTask(String(value))
        } else if(event.target.name === 'deadline'){
            const {value} = event.target as HTMLInputElement
            setDeadline(Number(value))
        }
    }
    
    const addTask = (): void => {
        // create a new date and add number of days equal to value of Deadline
        const newDate: Date = new Date()
        const date: Number = newDate.setDate(newDate.getDate() + deadline)
        const id: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        dispatch({type: 'ADD_TASK', payload: {id, task, deadline, date, complete: false}})
        setTask('')
        setDeadline(0)
    }
    return (
        <TIContainer>
            <label htmlFor="task">Task</label>
            <input type="text" name="task" placeholder="What do you want to do?" value={task} onChange={handleChange} />
            <label htmlFor="deadline">Deadline (in days):</label>
            <input type="number" name="deadline" placeholder="Deadline (In Days)" value={deadline} onChange={handleChange} />
            <button onClick={addTask}>Add</button>
        </TIContainer>
    )
}

export default TaskInput