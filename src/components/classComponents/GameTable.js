import React, { Component } from 'react'
import Character from '../functionalComponents/ui/Character/Character'
import Obstacles from '../functionalComponents/ui/Obstacles/Obstacles'
import './GameTable.css'
import ost from '../../assets/audio/ostDoom.mp3'
class GameTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: 85,
            yAxis: 150,
            score: 0,
            gameOver: false,
            showMenace: false
        }
        this.setScore = 0;
        this.startMenace = null;
        this.probabilityToSpawn = 5;
        this.isJumping = false;
    }

    componentDidMount() {
        /* new Audio(ost).play(); */
        this.setScore = setInterval(() => {
            this.setState({
                score: this.state.score + 1
            })
        }, 20)
        this.startMenace = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * this.probabilityToSpawn);
            if (randomNumber == 1) {
                this.state.showMenace = true;
            }
            else {
                this.state.showMenace = false;
            }
        }, 1000)
        /* setInterval(() => {
            const MAGNITUDE = 3
            let yCurrent = this.state.yAxis - MAGNITUDE
            this.setState({
                yAxis: yCurrent
            })
        }, 20) */
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

        const jumpingAnimation = setInterval(() => {
            incrementedY = incrementedY + 2
            this.setState({
                yAxis: incrementedY
            })
            jumpCount = jumpCount + 1
            if (jumpCount == 25) {
                clearInterval(jumpingAnimation)
                jumpCount = 0;
            }
        }, 10)



    }
    render() {

        return (
            <div className='container_game'>
                <h1>IHSP-Game</h1>
                <div className="parallax">
                    <div onClick={this.fly} className='game_container'>
                        {!this.state.gameOver ? <>
                            <div className='score'>
                                <p>{this.state.score}</p>
                            </div>
                            <Character
                                x={this.state.xAxis}
                                y={this.state.yAxis}

                            />

                            <Obstacles />


                        </>
                            : <p className='game_over'>Game Over</p>}


                    </div>
                </div>
            </div>

        )
    }
}
export default GameTable