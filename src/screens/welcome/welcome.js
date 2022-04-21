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
        <div className='test'>
            <div className='container'>
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
                            className='bottoneWelcome'
                        />

                        <UiButton
                            label={'Score'}
                            path={"/leaderboard"}
                            callback={goToPage}
                            className='bottoneWelcome' />

                    </div>
                </main>
                <footer>NLD production, all right reserved</footer>
            </div>
        </div>
    )
}

export default Welcome