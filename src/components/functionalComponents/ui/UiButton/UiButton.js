import { waitFor } from '@testing-library/dom'
import React from 'react'

//Style
import '../UiButton/UiButton.css'


function UiButton(props) {

    function buttonClick(e) {
        return props.callback(props.path)
    }


    return (
        <div onClick={buttonClick} path={props.path} className={props.className}>
            {props.label}
        </div>
    )

}

export default UiButton