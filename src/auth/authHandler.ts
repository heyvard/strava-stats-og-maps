import { NextApiRequest, NextApiResponse } from 'next'
import { Pool, PoolClient } from 'pg'

import { User } from '../types/db'
import { ApiHandlerOpts } from '../types/apiHandlerOpts'

import { verifiserIdToken } from './verifiserIdToken'

let pool: null | Pool

export function getPool() {
    if (!pool) {
        const connectionString = process.env.PG_URI
        pool = new Pool({
            connectionString,
            max: 1,
        })
    }
    return pool
}

export function auth(fn: { (_opts: ApiHandlerOpts): Promise<void> }) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            console.log('Starter auth')
            const start = Date.now()
            const authheader = req.headers.authorization
            if (!authheader) {
                res.status(401)
                return
            }
            console.log('auht ferdig')

            const verifisert = await verifiserIdToken(authheader.split(' ')[1])
            if (!verifisert) {
                res.status(401)
                return
            }
            const verifsert = Date.now()
            console.log('Før poolclient')

            let client: PoolClient | null = null
            try {
                client = await getPool().connect()

                const dbkobling = Date.now()

                const userList = await client.query('SELECT * from users where firebase_user_id = $1', [
                    verifisert.payload.sub,
                ])

                const hentBrukeren = (): User | undefined => {
                    if (userList.rows.length == null) {
                        return undefined
                    }
                    return userList.rows[0]
                }

                const etterUser = Date.now()

                await fn({ req, res, jwtPayload: verifisert.payload, client, user: hentBrukeren() })
                const etterKoden = Date.now()
                console.log(
                    `${req.url} Verifisering pg handler: ${verifsert - start}  - Db: ${
                        dbkobling - verifsert
                    }  - user: ${etterUser - dbkobling}  - kode: ${etterKoden - etterUser}  - `,
                )
            } finally {
                client?.release()
            }
        } catch (e) {
            console.log('oops', e)
        }
    }
}
