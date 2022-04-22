import React, { Component } from 'react'

//Components
import Character from '../functionalComponents/ui/Character/Character'
import Obstacles from '../functionalComponents/ui/Obstacles/Obstacles'
import UiButton from '../functionalComponents/ui/UiButton/UiButton'

//Style
import './GameTable.css'

//Audio
import ost from '../../assets/audio/ostDoom.mp3'
import jump from '../../assets/audio/jump.mp3'
import hit from '../../assets/audio/hitSound.mp3'

//Wrapper
import withRouter from '../../utils/withNavigation'

import { properties } from '../../utils/properties'

//Sound Howler
import { Howl, Howler } from 'howler'

class GameTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: 85,
            yAxis: 150,
            score: 0,
            gameOver: false,
            showMenace: false,
            yAxisM: 150,
            xAxisM: 650,
            hp: 3,
            inputValue: '',
            isFalling: false,
            imgMenace: null
        }
        this.gameHasStarted = false;
        this.setScore = 0;
        this.startMenace = null;
        this.probabilityToSpawn = 2;
        this.isJumping = false;
        this.menaceisOnScrenn = false;
        this.damageRecived = false;
        this.jumAnimation = null;

        //audio var
        this.jumpAudio = new Howl({
            src: [jump],
            volume: 0.05
        })

        this.ostAudio = new Howl({
            src: [ost],
            volume: 0.05
        })

        this.hitAudio = new Howl({
            src: [hit],
            volume: 0.2
        })
    }

    componentDidMount() {
        this.ostAudio.play()

        this.setScore = setInterval(() => {
            if (this.gameHasStarted && !this.state.gameOver) {   //<-- test gameHasStarted
                this.setState({
                    score: this.state.score + 1
                })

                let best = sessionStorage.getItem('best_score')
                if (best < this.state.score) {
                    sessionStorage.setItem('best_score', this.state.score)
                }
            }
        }, 20)

        this.startMenace = setInterval(() => {

            const rangeXChar = [...Array((this.state.xAxis + 40) - (this.state.xAxis - 40) + 1).keys()].map(x => x + (this.state.xAxis - 40));
            if (this.menaceisOnScrenn == true) {
                return
            }
            let randomNumber = Math.floor(Math.random() * this.probabilityToSpawn);
            if (randomNumber == 1 && this.gameHasStarted) {   //<-- test gameHasStarted

                this.state.imgMenace = Math.floor(Math.random() * 4);
                this.menaceisOnScrenn = true;
                let yAxisMenace = Math.floor(Math.random() * (280 - 25) + 25);
                this.setState({
                    yAxisM: yAxisMenace
                })
                this.state.showMenace = true;
                const menaceAttack = setInterval(() => {
                    let xAxisM = this.state.xAxisM
                    xAxisM = xAxisM - 2
                    this.setState({
                        xAxisM: xAxisM
                    })


                    const rangeXMenace = [...Array((this.state.xAxisM + 40) - (this.state.xAxisM - 40) + 1).keys()].map(x => x + (this.state.xAxisM - 40));

                    const rangeYMenace = [...Array((this.state.yAxisM + 20) - (this.state.yAxisM - 20) + 1).keys()].map(x => x + (this.state.yAxisM - 20))

                    const rangeYChar = [...Array((this.state.yAxis + 10) - (this.state.yAxis - 10) + 1).keys()].map(x => x + (this.state.yAxis - 10))

                    const foundX = rangeXChar.some(r => rangeXMenace.indexOf(r) >= 0)
                    const foundY = rangeYChar.some(r => rangeYMenace.indexOf(r) >= 0)


                    /* console.log(foundX, foundY) */
                    if (foundX && foundY) {
                        if (!this.damageRecived) {
                            let newHp = this.state.hp - 1
                            this.setState({ hp: newHp })
                            this.damageRecived = true

                            this.hitAudio.play()
                        }

                    }

                    /* if(this.state.xAxisM - 40) */

                    if (this.state.hp == 0) {
                        this.setState({
                            gameOver: true
                        })
                        { this.ostAudio.stop() }
                    }

                    if (xAxisM <= -80) {
                        this.menaceisOnScrenn = false;
                        this.damageRecived = false;
                        clearInterval(menaceAttack)
                        this.setState({
                            xAxisM: 650
                        })
                    }
                }, 1)
            }
            else {
                this.state.showMenace = false;
            }
        }, 1000)

        setInterval(() => {
            if (this.isJumping || !this.gameHasStarted) {  //<-- test gameHasStarted
                return
            }
            this.setState({
                isFalling: true
            })
            const MAGNITUDE = 3
            let yCurrent = this.state.yAxis - MAGNITUDE
            this.setState({
                yAxis: yCurrent,
            })
        }, 20)
    }


    componentDidUpdate() {
        if (!this.state.gameOver && (this.state.yAxis >= 400 || this.state.yAxis <= -100)) {
            this.setState({
                gameOver: true
            })

            { this.ostAudio.stop() }

            clearInterval(this.setScore);
        }

    }


    fly = () => {

        properties.jumpingAnimation.play()
        this.jumpAudio.play()

        this.setState({
            isFalling: false
        })
        let jumpCount = 0
        let incrementedY = this.state.yAxis;
        this.isJumping = true;

        this.gameHasStarted = true;  //<-- test gameHasStarted


        const jumpingAnimation = setInterval(() => {

            incrementedY = incrementedY + 2
            this.setState({
                yAxis: incrementedY
            })
            jumpCount = jumpCount + 1
            if (jumpCount == 25) {
                clearInterval(jumpingAnimation)
                jumpCount = 0;
                this.isJumping = false;
            }
        }, 10)

    }


    goToPage = (path) => {
        this.props.router.navigate(path)
    }

    test(e) {
        //this.jumAnimation = e;
        //console.log(this.jumAnimation);
    }

    render() {

        return (
            <div className='container_game'>
                <div className="parallax">
                    <div onClick={this.fly} className='game_container'>
                        {!this.state.gameOver ? <>
                            <div className='score'>
                                <p> {this.state.score}</p>
                            </div>

                            {!this.gameHasStarted &&
                                <p className='tapToStart'>Clicca per iniziare</p>
                            }
                            <div className='hp'>
                                <p>Test di valutazione rimasti:</p>
                                <p>{this.state.hp}</p>
                            </div>
                            <Character
                                x={this.state.xAxis}
                                y={this.state.yAxis}
                                class={this.state.isFalling ? 'is_falling' : ''}
                            />

                            <Obstacles
                                y={this.state.yAxisM}
                                x={this.state.xAxisM}
                                img={this.state.imgMenace}
                            />


                        </>
                            :
                            <div className='game_over'>
                                <div className='gameOver_message'>
                                    <h2>Game Over</h2>
                                    <h4>Beije ti ha silurato</h4>
                                    <h5>Score: {this.state.score}
                                    </h5>
                                    <h5>Best Score:{sessionStorage.getItem('best_score')}</h5>


                                    <UiButton label={'Torna al menù'}
                                        path={"/"}
                                        callback={this.goToPage}
                                        className='bottoneGameOver' />

                                    {/*   <UiButton label={'Gioca ancora'}
                                        path={"/game"}
                                        callback={this.goToPage}
                                        className='bottoneGameOver' /> */}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(GameTable)