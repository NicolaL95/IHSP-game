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

        //state
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

        //Variabili
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

        //Play della soundtrack
        this.ostAudio.play()

        //setInterval per il calcolo dello score
        this.setScore = setInterval(() => {

            if (this.gameHasStarted && !this.state.gameOver) {   //<-- Se il game é iniziato e non é GameOver
                this.setState({
                    score: this.state.score + 1
                })

                //Prendo 'best_score' dal sessionStorage (Inizialmente sará null) e lo metto in una variabile
                let best = sessionStorage.getItem('best_score')

                //Controllo se lo score nel sessionStorage é maggiore della variabile 'best'
                if (best < this.state.score) {
                    sessionStorage.setItem('best_score', this.state.score)
                }
            }
        }, 20)

        //setInverval per spawn, movimento e hitBox nemici
        this.startMenace = setInterval(() => {

            //Prendo la posizione del nostro pg e lo metto in un array. Le hitBox vengono calcolate aggiungendo
            //e sottraendo due valori. Con .keys() lo trasformiamo in un oggetto per poi eseguirci un .map per inserirlo in un array.
            const rangeXChar = [...Array((this.state.xAxis + 35) - (this.state.xAxis - 35) + 1).keys()].map(x => x + (this.state.xAxis - 35));

            //Se il nemico é giá spawnato esco dal setInterval
            if (this.menaceisOnScrenn == true) {
                return
            }

            //Numero random per spawn nemici: se il numero é == 1 e la variabile gameHasStarted é 'true'
            //un nemico comparirá a schermo
            let randomNumber = Math.floor(Math.random() * this.probabilityToSpawn);

            if (randomNumber == 1 && this.gameHasStarted) {

                //Numero random per immagine del nemico
                this.state.imgMenace = Math.floor(Math.random() * 4);

                //Metto a 'true' la variabile del nemico spawnato
                this.menaceisOnScrenn = true;

                //Numero random per posizione sull'asse Y del nemico, per poi fare setState
                let yAxisMenace = Math.floor(Math.random() * (280 - 25) + 25);
                this.setState({
                    yAxisM: yAxisMenace
                })

                this.state.showMenace = true; //<---------------------------------------controllare se é veramente inutile o meno


                //setInterval per lo spostamento dei nemici
                const menaceAttack = setInterval(() => {

                    //variabile per asse X del nemico
                    let xAxisM = this.state.xAxisM


                    //Difficoltá: in base allo score, lo spostamento dei nemici cambia
                    if (this.state.score < 1000) {
                        xAxisM = xAxisM - 2

                    } else if (this.state.score > 1000 && this.state.score < 2000) {
                        xAxisM = xAxisM - 3

                    } else {
                        xAxisM = xAxisM - 4

                    }

                    //Setto la posizione dell'asse X del nemico
                    this.setState({
                        xAxisM: xAxisM
                    })


                    //Prendo la posizione del nostro pg e lo metto in un array. Le hitBox vengono calcolate aggiungendo
                    //e sottraendo due valori. Con .keys() lo trasformiamo in un oggetto per poi eseguirci un .map per inserirlo in un array.
                    
                    const rangeXMenace = [...Array((this.state.xAxisM + 40) - (this.state.xAxisM - 40) + 1).keys()].map(x => x + (this.state.xAxisM - 40));

                    const rangeYMenace = [...Array((this.state.yAxisM + 20) - (this.state.yAxisM - 20) + 1).keys()].map(x => x + (this.state.yAxisM - 20))

                    const rangeYChar = [...Array((this.state.yAxis + 50) - (this.state.yAxis - 10) + 1).keys()].map(x => x + (this.state.yAxis - 10))

                    //Creo due variabili che confrontano i due array (rangeXChar con rangeXMenace, rangeYChar con rangeYMenace) per
                    //verificare se ci sono state collisioni. Le due variabili diventano 'true' o 'false' 
                    const foundX = rangeXChar.some(r => rangeXMenace.indexOf(r) >= 0)
                    const foundY = rangeYChar.some(r => rangeYMenace.indexOf(r) >= 0)

                    //Se é stata trovata una collisione entro nel ciclo per calcolare il danno
                    if (foundX && foundY) {


                        //Se la variabile 'damageRecived' é 'false' allora setto gli hp a -1
                        if (!this.damageRecived) {
                            let newHp = this.state.hp - 1
                            this.setState({ hp: newHp })

                            //Setto 'damageRecived' a true. Questo serve per evitare di prendere due danni accidentali di fila
                            this.damageRecived = true

                            //Eseguo il suono di hit
                            this.hitAudio.play()
                        }
                    }

                    //Se gli HP sono a zero, setto il GameOver
                    if (this.state.hp == 0) {
                        this.setState({
                            gameOver: true
                        })

                        //Forzo lo stop della soundtrack
                        this.ostAudio.stop()
                    }

                    //Se la posizione del nemico é al di fuori dello schermo, setto 
                    //le variabili a false e faccio clearInterval dell'attacco del nemico
                    if (xAxisM <= -80) {
                        this.menaceisOnScrenn = false;
                        this.damageRecived = false;
                        clearInterval(menaceAttack)
                        this.setState({
                            xAxisM: 650
                        })
                    }
                }, 1)
            }   //<--- fine if per attacco nemico
            else {

                //Se il numero random non é uguale a 1, setto la variabile a false.
                this.state.showMenace = false;
            }
        }, 1000)

        //setInterval per gravitá
        const grav = setInterval(() => {

            //Se il gico non é ancora iniziato e se il personaggio sta saltando
            //Si esce dal setInterval. Cosí facendo, la gravitá non infuenza il salto

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

            properties.jumpingAnimation.goToAndPlay(2)


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
                                <p className='tapToStart'>Schiva i "facilissimi" progetti di Boberto!</p>
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