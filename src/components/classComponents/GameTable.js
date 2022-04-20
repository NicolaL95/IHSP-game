import React, { Component } from 'react'
import Character from '../functionalComponents/ui/Character/Character'
import './GameTable.css'
import { gravityMagnitude } from '../../utils/utils'
class GameTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xAxis: 150,
            yAxis: 50,
            score: 0,
            gameOver: false
        }
        this.setScore = 0
    }

    componentDidMount() {
        this.setScore = setInterval(() => {
            this.setState({
                score: this.state.score + 1
            })
        }, 20)
        /*  setInterval(() => {
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


        let incrementedY = this.state.yAxis + 50;

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
                    </> : <p className='game_over'>Game Over</p>}


                </div>
            </div>

        )
    }
}
export default GameTable