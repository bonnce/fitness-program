export interface Exercise {
    id: number
    name: string
    time: number
    weight: number
}

export interface Routine {
    id: number
    name: string
    exTime: number
    restTime: number
    exercises: number[]
}

export interface Program {
    id: number
    name: string
    restTime: number
    series: number[]
}

export interface Calendar {
    id: number
    name: string
    nextDate: string
    initDate: string
    endDate: string
    scope: number
    programs: number[]
}
  