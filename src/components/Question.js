import React from "react";

function Question(props){
    var classString = props.selectedOption === props.options.option1

    function handleClick(event){
        props.changeSelected(props.id, event.target.innerText);
    }

    return(
        <div className="question">
            <h1>{props.question}</h1>
            <div className="options">
                <button className={`option${props.selectedOption === props.options.option1 ? " selected" : ""}`} onClick={handleClick}>{props.options.option1}</button>
                <button className={`option${props.selectedOption === props.options.option2 ? " selected" : ""}`} onClick={handleClick} >{props.options.option2}</button>
                <button className={`option${props.selectedOption === props.options.option3 ? " selected" : ""}`} onClick={handleClick}>{props.options.option3}</button>
                <button className={`option${props.selectedOption === props.options.option4 ? " selected" : ""}`} onClick={handleClick}>{props.options.option4}</button>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Question;