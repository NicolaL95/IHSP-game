import React, { useEffect } from 'react'
import { useNavigate } from "react-router";

//STYLE
import '../welcome/Welcome.css'

//Components
import UiButton from '../../components/functionalComponents/ui/UiButton/UiButton'

//Audio
import ostWelcome from '../../assets/audio/ostWelcome.mp3'

//Sound howler
import { Howl, Howler } from 'howler'



function Welcome() {

    let ost = new Howl({
        src: [ostWelcome],
        volume: 0.05
    })

    ost.play()


    const navigate = useNavigate();

    function goToPage(path) {
        navigate(path)
        ost.stop()
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div className='container'>
                <header></header>
                <main>
                    <div className='title_container'>
                        <h1>Incredibly Hard Second Project</h1>
                        <h4>"E' meno complicato di quello che pensate."</h4>
                        <p>-cit Borerto Rrogi</p>
                    </div>

                    <div className='button_container'>
                        <UiButton
                            label={'Gioca'}
                            path={"/game"}
                            callback={goToPage}
                            className='bottoneWelcome'
                        />

                        {/*   <UiButton
                            label={'Score'}
                            path={"/leaderboard"}
                            callback={goToPage}
                            className='bottoneWelcome' /> */}

                    </div>
                </main>
                <p className='screen_footer'>NLD production, all right reserved</p>
            </div>
        </div>
    )
}

export default Welcome