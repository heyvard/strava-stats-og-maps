import type { NextPage } from 'next'
import { Container } from '@mui/system'
import { Box, Typography } from '@mui/material'
import React from 'react'

import { UseUser } from '../queries/useUser'
import { Spinner } from '../components/loading/Spinner'
import { UseActivities } from '../queries/useActivities'
import { Syncing } from '../components/syncing'
import { YearStats } from '../components/yearstats/yearStats'
import { connectWithStrva } from '../components/stravaknapp'

const Home: NextPage = () => {
    const { data: megselv } = UseUser()
    const { data: activities } = UseActivities()

    if (!megselv || !activities) {
        return <Spinner></Spinner>
    }

    const cbUrl = window.location.href + 'api/v1/authcb'
    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID

    const href = `http://www.strava.com/oauth/authorize?client_id=${clientId}&state=${megselv.id}&response_type=code&redirect_uri=${cbUrl}&approval_prompt=force&scope=activity:read`
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 6, width: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Hei {megselv.name} 👋
                    </Typography>
                    <Syncing />
                    {!megselv.athlete_id && <a href={href}>{connectWithStrva}</a>}
                    <Box sx={{ mt: 4, width: 1 }}>
                        <YearStats />
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Home
