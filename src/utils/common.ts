import type { FormValues } from "../types"

export const WEEK = {
    'Mon':1,
    'Tue':2,
    'Wed':3,
    'Thu':4,
    'Fri':5,
    'Sat':6,
    'Sun':7,
}

export const nextDate = (weekDay:keyof typeof WEEK)=>{
    const days = howManyDays(weekDay)
    const today = new Date()
    const actualDay = addDays(today, days)
    return actualDay.toISOString()
}

export const howManyDays = (nextDate:keyof typeof WEEK)=>{
    const weekday = new Date().getDay()
    const nextDay = WEEK[nextDate]
    return Math.abs(weekday - nextDay)
}

export const addDays = (date:Date, days: number)=>{
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
}

export const isToday = (date:Date)=>{
    const today = new Date()
    return date.toDateString() === today.toDateString()
}

export function formHandler<T>(form: HTMLFormElement, formAction:Function){
    const formData: FormValues = {};
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        const { name, value, type } = element;
        //could make some validations here
        if (name) {
            formData[name] = type === "number" ? Number(value): value;
        }
    }

    formAction(formData as T)

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        element.value = ""
    }

    alert('Success!')
}