import React, {useState, useEffect} from "react";
import data from "../defaultData";
import Question from "./Question";
import { nanoid } from "nanoid"
import { shuffle } from "../helperFunctions";

function Questions(){

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestion] = useState(data);
    const [gameOver, setGameOver] = useState(false);

    function preProcess(data){
        var processedArray = data.results.map((item)=>{
            return {
                "id": nanoid(),
                "question": item.question,
                "options": shuffle([
                    item.correct_answer,
                    item.incorrect_answers[0],
                    item.incorrect_answers[1],
                    item.incorrect_answers[2]
                ]),
                "correctOption": item.correct_answer,
                "selectedOption": null
            }
        })
        setQuestion(processedArray)
        setIsLoading(false);
    }

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => preProcess(data))
    },[]);


    // useEffect(()=>(
    //     setIsLoading(false)
    // ), [])

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

    var content;
    if(isLoading){
        content = <div className="loader">
                        <h1>Loading...</h1>
                  </div>;
    }else{
        content = <>
                    {elementArray}
                    < div className = "footer" >
                        <button className="submit" onClick={checkSubmission}>Check Answers</button>
                    </div >
                </>
    }
    
    return(
        <div className="questions">
            {content}
        </div>
    )
}

export default Questions;