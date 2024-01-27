import type { DBSchema } from "idb"

export interface Exercise {
    name: string
    time?: number
    weight?: number
}

export interface Routine {
    name: string
    exTime?: number
    restTime?: number
    exercises: string[]
}

export interface Program {
    name: string
    restTime?: number
    series: string[]
}

export interface Calendar {
    name: string
    nextDate: string
    initDate: string
    endDate: string
    scope: number
    programs: string[]
}

export interface FormValues {
    [key: string]: string | number | undefined;
  }

export interface FitDB extends DBSchema {
    exercise: {
        value: Exercise;
        key: number;
    };
    routine: {
        value: Routine;
        key: number;
        indexes: { 'ex_idx': string[], 'multiEntry' };
    };
    program: {
        value: Program;
        key: number;
        indexes: { 'routine_idx': string[], 'multiEntry' };
    };
    calendar: {
        value: Calendar;
        key: number;
        indexes: { 'calendar_idx': string[], 'multiEntry' };
    };
}

export type fitStoreKeys = "exercise" | "routine" | "calendar" | "program"
export type operationType = "add" | "get" | "getAll" | "getKey" | "getAllKeys"| "count"| "put"| "add"| "index" | "delete"| "clear" 
export type fitStore = Exercise | Routine | Program | Calendar
export type IDBWriteOperation = 'add' | 'put' | 'delete';
export type IDBReadOperation = 'get' | 'getAll' | 'getAllKeys' | 'count' | 'getKey';