import {useContext, useState, useEffect, FC} from 'react'
import styled from 'styled-components'
import {TasksContext} from '../../contexts/TasksContext'
import { ITask } from '../../Interfaces'

const TLContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    div.tasks {
        padding: 24px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        div.task {
            display: flex;
            width: 100%;
            border-radius: 16px;
            flex-direction: column;
            align-items: center;
            background-color: #BBDEFB;
            padding: 16px;
            margin-bottom: 16px;
            p {
                margin: 0 0 8px 0;
            }
        }
        div.task-complete {
            background-color: #00BCD4;
        }
    }
`
const TLFilters = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #607D8B;
    div.filters {
        display: flex;
        flex-direction: row;
        align-items: center;
        button {
            padding: 10px;
            align-self: center;
            min-width: 100px;
        }
        button.btn-active{
            background-color: #2196F3;
        }
        margin: 16px; 
    }
`


const TaskList : FC = () => {
    const {state, dispatch} = useContext(TasksContext)
    const [tasks, setTasks] = useState<Array<ITask>>([])
    useEffect(() => {
        const sortedTasks = state.tasks.sort((a, b) => {
            if(a.date > b.date) return 1
            if(a.date < b.date) return -1
            else return 0
        })
        if(state.filter === 'all'){
            setTasks(sortedTasks)
        } else if(state.filter === 'completed'){
            setTasks(sortedTasks.filter(task => task.complete))
        } else if(state.filter === 'active'){
            setTasks(sortedTasks.filter(task => !task.complete))
        }
    }, [state.filter, state.tasks])
    
    return (
        <TLContainer>
            <TLFilters>
                <div className="filters">
                    <button type="button" className={`btn-${state.filter === 'all' ? 'active' : 'neutral'}`} onClick={() => dispatch({type: 'SET_FILTER', payload: 'all'})}>All</button>
                    <button type="button" className={`btn-${state.filter === 'active' ? 'active' : 'neutral'}`} onClick={() => dispatch({type: 'SET_FILTER', payload: 'active'})}>Active</button>
                    <button type="button" className={`btn-${state.filter === 'completed' ? 'active' : 'neutral'}`} onClick={() => dispatch({type: 'SET_FILTER', payload: 'completed'})}>Completed</button>
                </div>
            </TLFilters>
            <div className="tasks">
            {
                tasks.map((task, index) => {
                    const remainingDays = Math.round((Number(task.date) - Date.now()) / (1000 * 60 * 60 * 24))
                    return (
                        <div className={`task ${task.complete && 'task-complete'}`} key={task.id}>
                            <p>{task.task}</p>
                            <p>{remainingDays <= 0 ? 'Due Today!' : `Remaining days ${remainingDays}`}</p>
                            {!task.complete && <button onClick={() => dispatch({type: 'COMPLETE_TASK', payload: task})}>Complete</button>}
                            {task.complete && <button onClick={() => dispatch({type: 'REMOVE_TASK', payload: task.id})}>Remove</button>}
                        </div>
                    )
                })
            }
            </div>
        </TLContainer>
    )
}

export default TaskList