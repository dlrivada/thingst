import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

if (process.env.NODE_ENV !== 'environment') // production | testing | staging | development
    dotenvExpand(dotenv.config({ path: './src/config/.env' }))

export default {
    PGPORT: process.env.PGPORT,
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,

    SERVER_URL: process.env.SERVER_URL,
    DB_URL: process.env.DB_URL,
    mode: process.env.MODE || process.env.NODE_ENV
}
