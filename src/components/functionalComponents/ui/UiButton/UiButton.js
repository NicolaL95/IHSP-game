import React from 'react'

//Style
import '../UiButton/UiButton.css'


function UiButton(props) {

    function buttonClick(e) {
        return props.callback(e.target.path)
    }


    return (
        <div onClick={buttonClick} path={props.path}>
            {props.label}
        </div>
    )

}


export default UiButton