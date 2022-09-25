import React from "react";

function Question(props){
    var classString = props.selectedOption === props.options.option1

    function handleClick(event){
        props.changeSelected(props.id, event.target.innerText);
    }

    function matchCorrect(buttonText){
        var classString = "option"
        if (props.gameOver){
            classString = classString + `${props.selectedOption === buttonText ? " incorrect" : ""}${props.correctOption === buttonText ? " correct" : ""}`;
        }else{
            classString = classString + `${props.selectedOption === buttonText ? " selected" : ""}`;
        }
        return classString;
    }

    return(
        <div className="question">
            <h1>{props.question}</h1>
            <div className="options">
                <button className={matchCorrect(props.options.option1)} onClick={handleClick}>{props.options.option1}</button>
                <button className={matchCorrect(props.options.option2)} onClick={handleClick} >{props.options.option2}</button>
                <button className={matchCorrect(props.options.option3)} onClick={handleClick}>{props.options.option3}</button>
                <button className={matchCorrect(props.options.option4)} onClick={handleClick}>{props.options.option4}</button>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Question;