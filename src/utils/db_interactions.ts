import type { IDBPObjectStore } from "idb";
import type { FitDB, fitStore, fitStoreKeys } from "../types";
import { IDB } from "./ixdb";

export async function dbBeforeActions(operation:(db:IDB)=>Promise<void>){
    const db = new IDB()
    await db.init()
    await operation(db)
    db.close()
}

export async function dbActions(db:IDB, store:fitStoreKeys, opType:"readonly"|"readwrite", 
    operation: (objStore:IDBPObjectStore<FitDB, [fitStoreKeys], fitStoreKeys, "readonly" | "readwrite"> | undefined)=>Promise<number | undefined>) {
    const tx = await db.createTransaction(store, opType)
    const objStore = tx?.objectStore(store)
    await operation(objStore)
    tx?.commit()
}

export async function putToDB(data:fitStore, store:fitStoreKeys){
    await dbBeforeActions((db)=>dbActions(db, store, 'readwrite',async (objStore)=> objStore?.put?.(data)))
}
