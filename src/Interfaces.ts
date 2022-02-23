export interface ITask {
    id: string;
    task: string;
    deadline: number;
    date: Date;
    complete: boolean;   
}

export interface IState {
    tasks: ITask[];
    loading: boolean;
    filter: string;
}

export interface IAction {
    type: string;
    payload: any;
}