import React from 'react'
import { useNavigate } from "react-router";
//STYLE
import '../welcome/Welcome.css'

import UiButton from '../../components/functionalComponents/ui/UiButton/UiButton'

function Welcome() {
    const navigate = useNavigate();

    function goToPage(path) {
        navigate(path)
    }
    return (
        <>
            <header></header>
            <main>
                <div className='title_container'>
                    <h1>I.H.S.P</h1>
                    <h2>Incredible Hard Second Project</h2>
                    <h4>La pasquetta peggiore della tua vita</h4>
                </div>
                <div className='button_container'>
                    <UiButton
                        label={'Gioca'}
                        path={"/game"}
                        callback={goToPage}
                    />
                    <UiButton
                        label={'Tutorial'}
                        path={"/tutorial"}
                        callback={goToPage}
                    />
                    <UiButton
                        label={'Classifica'}
                        path={"/leaderboard"}
                        callback={goToPage} />

                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Welcome