import React from "react";

function Question(props){
    return(
        <div className="question">
            <h1>{props.item.question}</h1>
            <div className="options">
                <button>{props.optionsArray[0]}</button>
                <button>{props.optionsArray[1]}</button>
                <button>{props.optionsArray[2]}</button>
                <button>{props.optionsArray[3]}</button>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Question;