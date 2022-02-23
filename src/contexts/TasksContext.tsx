import {createContext, useReducer, FC, Dispatch, useEffect} from 'react'
import {IState, IAction} from '../Interfaces'

const initialState: IState = {
    tasks: [],
    loading: false,
    filter: 'all'
}

const Reducer = (state:IState, action:IAction):IState => {
    switch(action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            }
        case 'COMPLETE_TASK':
            return {
                ...state,
                tasks: [{...action.payload, complete: true}, ...state.tasks.filter(task => task.id !== action.payload.id)]
            }
        case 'REMOVE_TASK':
            const newTasks = state.tasks.filter(task => task.id !== action.payload)
            if(newTasks.length === 0){
                // Shameful hack to save time
                localStorage.setItem('tasks', JSON.stringify(newTasks))
            }
            return {
                ...state,
                tasks: newTasks
            }
        case 'SORT_TASKS':
            return {
                ...state,
                tasks: state.tasks.sort((a, b) => {
                    if(a.complete && !b.complete) {
                        return 1
                    } else if(!a.complete && b.complete) {
                        return -1
                    } else {
                        return 0
                    }
                })
            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export const TStore : FC = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    useEffect(() => {
        if(state.tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        } else {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
            if(tasks.length > 0) {
                dispatch({type: 'SET_TASKS', payload: tasks})
            }
        }
    }, [state.tasks])
    
    return (
        <TasksContext.Provider value={{state, dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}

export const TasksContext = createContext<{ state: IState; dispatch: Dispatch<any>; }>({state: initialState, dispatch: () => null});
export default TStore