import React, { Component } from 'react'
import Character from '../functionalComponents/ui/Character/Character'
import Obstacles from '../functionalComponents/ui/Obstacles/Obstacles'
import UiButton from '../functionalComponents/ui/UiButton/UiButton'

import './GameTable.css'
import ost from '../../assets/audio/ostDoom.mp3'

import  withRouter  from '../../utils/withNavigation'
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
            hp: 3
        }
        this.setScore = 0;
        this.startMenace = null;
        this.probabilityToSpawn = 2;
        this.isJumping = false;
        this.menaceisOnScrenn = false;
        this.damageRecived = false;

    }

    componentDidMount() {
        /* new Audio(ost).play(); */
        this.setScore = setInterval(() => {
            this.setState({
                score: this.state.score + 1
            })
        }, 20)
        this.startMenace = setInterval(() => {
            const rangeXChar = [...Array((this.state.xAxis + 40) - (this.state.xAxis - 40) + 1).keys()].map(x => x + (this.state.xAxis - 40));
            if (this.menaceisOnScrenn == true) {
                return
            }
            let randomNumber = Math.floor(Math.random() * this.probabilityToSpawn);
            if (randomNumber == 1) {
                this.menaceisOnScrenn = true;
                let yAxisMenace = Math.floor(Math.random() * (280 - 25) + 25);
                this.setState({
                    yAxisM: yAxisMenace
                })
                this.state.showMenace = true;
                const menaceAttack = setInterval(() => {
                    let xAxisM = this.state.xAxisM
                    xAxisM = xAxisM - 1
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
                        }

                    }

                    /* if(this.state.xAxisM - 40) */

                    if (this.state.hp == 0) {
                        this.setState({
                            gameOver: true
                        })
                    }


                    if (xAxisM == -80) {
                        this.menaceisOnScrenn = false;
                        this.damageRecived = false;
                        clearInterval(menaceAttack)
                        this.setState({
                            xAxisM: 650
                        })
                    }
                }, 0.5)
            }
            else {
                this.state.showMenace = false;
            }
        }, 1000)
        setInterval(() => {
            if (this.isJumping) {
                return
            }
            const MAGNITUDE = 3
            let yCurrent = this.state.yAxis - MAGNITUDE
            this.setState({
                yAxis: yCurrent
            })
        }, 20)

    }


    componentDidUpdate() {

        if (!this.state.gameOver && (this.state.yAxis >= 850 || this.state.yAxis <= -100)) {
            this.setState({
                gameOver: true
            })
            clearInterval(this.setScore);
        }

    }


    fly = () => {

        let jumpCount = 0
        let incrementedY = this.state.yAxis;
        this.isJumping = true;

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
        console.log(path)
        this.props.navigate(path)
    }


    render() {

        return (
            <div className='container_game'>
                <h1>IHSP-Game</h1>
                <div className="parallax">
                    <div onClick={this.fly} className='game_container'>
                        {!this.state.gameOver ? <>
                            <div className='score'>
                                <p> {this.state.score}</p>
                            </div>
                            <div className='hp'>
                                <p>HP: {this.state.hp}</p>
                            </div>
                            <Character
                                x={this.state.xAxis}
                                y={this.state.yAxis}

                            />

                            <Obstacles
                                y={this.state.yAxisM}
                                x={this.state.xAxisM}
                            />


                        </>
                            : <div className='game_over'>
                                <div className='gameOver_message'>
                                    <h2>Game Over</h2>
                                    <h4>Beije ti ha silurato</h4>

                                    <UiButton label={'Torna al menù'}
                                        path={"/"}
                                        callback={this.goToPage} />
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