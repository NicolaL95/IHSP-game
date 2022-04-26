import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes/router'
import Welcome from './screens/welcome/Welcome'
import Game from './screens/game/Game'

function Routing() {
    return (
        <div style={{
            width: 650,
            margin: 'auto'
        }}>
            <h1 style={{
                textAlign: 'center'
            }}>IHSP-Game</h1>
            <Routes>
                <Route index path={routes.HOME} element={<Welcome />} />
                <Route path={routes.GAME} element={<Game />} />
            </Routes>
            <footer style={{
                textAlign: 'center',
                width: 650,
                height: 350,
                margin: '20px auto',
                fontWeight: 700,
                fontSize: 20
            }}>
                <p>Difendi la capitale del Pakistan, Islamabad, dall'attaco di Boberto Rrogi, un gigantesco quanto abile demone programmatore.
                    Come membro della B.T.A(Beije Talent Academy), hai il compito di tenere duro fino all'arrivo dei Disunited Usestate.
                    Sopravvivi agli impossibili Second Projects, ma fai attenzione;
                    Boberto e' abilissimo nel creare complicatissime funzioni di una sola riga. Ma niente paura, avrai tutto il sostegno delle ridondanti e malscritte funzioni dei pakistani da piu' di 1000 righe di codice!</p>
            </footer>
        </div>
    )
}

export default Routing