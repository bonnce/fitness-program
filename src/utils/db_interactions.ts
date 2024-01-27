import type { Exercise } from "../types";
import { IDB } from "./ixdb";

export async function dbActionsWrapper(operation:Function){
    const db = new IDB('database')
    await db.init()

    operation(db)

    db.close()
}

export async function addExercise(db:IDB, ex:Exercise){
    const tx = await db.createTransaction('exercise','readwrite')
    const objStore = tx?.objectStore('exercise')
    await objStore?.put?.(ex)
    tx?.commit()
}

export function test(e:SubmitEvent){
    const form = e.target as HTMLFormElement
    const name =  form.elements.namedItem('name') as HTMLInputElement
    const ex:Exercise = { name: name.value}
    dbActionsWrapper((db:IDB)=> addExercise(db, ex))
}