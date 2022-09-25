import React, {useState, useEffect} from "react";
import data from "../defaultData";
import { shuffle } from "../helperFunctions";
import Question from "./Question";
import { nanoid } from "nanoid"

function Questions(){

    const [questions, setQuestion] = useState(data);
    const [gameOver, setGameOver] = useState(false);

    function preProcess(data){
        var processedArray = data.results.map((item)=>{
            return {
                "id": nanoid(),
                "question": item.question,
                "options": {
                    "option1": item.correct_answer,
                    "option2": item.incorrect_answers[0],
                    "option3": item.incorrect_answers[1],
                    "option4": item.incorrect_answers[2]
                },
                "correctOption": item.correct_answer,
                "selectedOption": null
            }
        })
        setQuestion(processedArray)
    }

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => preProcess(data))
    },[]);

    console.log(questions);

    function checkSubmission(){
        setGameOver(true);
        // setQuestion((currentState) => {
        //     return currentState.map((item) => {
        //         var newObj = (item.id === id) ? { ...item, selectedOption: optionString } : item;
        //         return newObj;
        //     });
        // })
    }

    function changeSelected(id, optionString){
        setQuestion((currentState)=>{
            return currentState.map((item)=>{
                var newObj = (item.id === id) ? { ...item, selectedOption : optionString } : item;
                return newObj;
            });
        })
    }

    var elementArray = questions.map((item)=>{
        return(
            <Question
                key = {item.id}
                {...item}
                changeSelected = {changeSelected} 
                gameOver = {gameOver}
            />
        )
    })

    // var elementArray = questions.map((item) => {
    //     var optionsArray = [item.correct_answer, ...item.incorrect_answers];
    //     optionsArray = shuffle(optionsArray);
    //     console.log(optionsArray)
    //     return (
    //         <Question
    //             key={nanoid()}
    //             item = {item}
    //             optionsArray = {optionsArray}
    //         />
    //     )
    // })

    
    return(
        <div className="questions">
            {elementArray}
            <button onClick={checkSubmission}>Submit</button>
        </div>
    )
}

export default Questions;