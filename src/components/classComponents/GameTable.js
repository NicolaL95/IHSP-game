import React, { Component } from 'react'
import Character from '../functionalComponents/ui/Character/Character'
import Obstacles from '../functionalComponents/ui/Obstacles/Obstacles'
import './GameTable.css'
import ost from '../../assets/audio/ostDoom.mp3'
class GameTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: 150,
            yAxis: 50,
            score: 0,
            gameOver: false,
            showMenace: false
        }
        this.setScore = 0;
        this.startMenace = null;
        this.probabilityToSpawn = 5;

    }

    componentDidMount() {
        new Audio(ost).play();
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
          setInterval(() => {
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

        let incrementedY = this.state.yAxis + 70;

        this.setState({
            yAxis: incrementedY
        })
    }
    render() {

        return (
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
                        {this.state.showMenace ? <Obstacles /> : ''}

                    </>
                        : <p className='game_over'>Game Over</p>}


                </div>
            </div>

        )
    }
}
export default GameTable