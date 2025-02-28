import Dexie from 'dexie'

export const db = new Dexie('transDb')
db.version(1).stores({
    transData: '++id, date, transaction, category, amount',
})


