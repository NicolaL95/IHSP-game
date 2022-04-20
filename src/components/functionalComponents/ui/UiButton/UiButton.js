import React from 'react'

//Style
import '../UiButton/UiButton.css'


function UiButton(props) {

    function buttonClick() {
        return props.callback(props.path)

    }


    return (
        <div onClick={buttonClick} path={props.path}>
            {props.label}
        </div>
    )

}


export default UiButton