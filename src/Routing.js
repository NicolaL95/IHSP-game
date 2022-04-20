import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes/router'
import Welcome from './screens/welcome/Welcome'
import Game from './screens/game/Game'

function Routing() {
    return (
        <Routes>
            <Route index path={routes.HOME} element={<Welcome />} />
            <Route path={routes.GAME} element={<Game />} />
        </Routes>
    )
}

export default Routing