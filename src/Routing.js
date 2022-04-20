import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes/router'
import Welcome from './screens/welcome/Welcome'

function Routing() {
    return (
        <Routes>
            <Route index path={routes.HOME} element={<Welcome />} />
        </Routes>
    )
}

export default Routing