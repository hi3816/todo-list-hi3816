export interface Todo {
    id : number;
    title : string;
    completed: boolean;
    create_at: string;
    completed_at: string | null;
}