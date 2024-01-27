import { openDB, type IDBPDatabase } from "idb";
import type { FitDB, fitStoreKeys } from "../types";


export class IDB{
    static version = 2;
    static name = 'database';
    db: null | IDBPDatabase<FitDB>

    constructor() {
        this.db = null;
    }

    async init() {
        try {
            this.db = await openDB<FitDB>(IDB.name, IDB.version,{
              upgrade(db, oldVersion){  
                  if (oldVersion < IDB.version) {
                        // make a backup before new updates
                        if (db.objectStoreNames.contains('exercise'))
                        db.deleteObjectStore('exercise');
                        if (db.objectStoreNames.contains('routine'))
                        db.deleteObjectStore('routine');
                        if (db.objectStoreNames.contains('program'))
                        db.deleteObjectStore('program');
                        if (db.objectStoreNames.contains('calendar'))
                        db.deleteObjectStore('calendar');

                        db.createObjectStore('exercise', { keyPath: 'name'});
                        const routine = db.createObjectStore('routine', { keyPath: 'name'});
                        const program = db.createObjectStore('program', { keyPath: 'name'});
                        const calendar = db.createObjectStore('calendar', { keyPath: 'name'});

                        routine.createIndex("ex_idx","exercises",{multiEntry:true})
                        program.createIndex("routine_idx","routines",{multiEntry:true})
                        calendar.createIndex("calendar_idx","programs",{multiEntry:true})

                        console.log("new update implemented!")
                    }
              },  
              blocked(){
                console.log('blocked')
                alert('There are new db updates, please close any tab or window with the app running and reopen again 😊')
              },
              blocking(){
                console.log('blocking')
                alert('There are new db updates, please close any tab or window with the app running and reopen again 😊')
              }
            });
        } catch (err) {
            const error = err as Error
            console.error('Error al inicializar la base de datos:', error.message);
            this.db = null;
        }
    }

    async createTransaction(store:fitStoreKeys ,opType:"readwrite"|"readonly") {
        if (!this.db) {
            console.error('La base de datos no está inicializada.');
            return;
        }

        const transaction = this.db.transaction(store, opType);

        transaction.oncomplete = () => console.log('Transacción completada.');
        transaction.onerror = (ev) => {
            const event = ev as ErrorEvent 
            console.error(`Error en la transacción: ${event.message}`)};

        return transaction
    }

    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}