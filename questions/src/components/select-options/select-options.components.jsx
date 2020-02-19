import React, { useState, useContext } from 'react';
import { QuestionContext } from '../../contexts/questions.contexts';
import { Select, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import { CATEGORIES, NUM_OF_QUESTIONS } from '../../options/gatheringOptions';
import './select-options.styles.css';

export default function SelectOptions(){

    const [numOfQuestions, setNumOfQuestions] = useState();
    const [categoryIndex, setCategoryIndex] = useState();
    const history = useHistory();
    const [questions, setQuestions] = useContext(QuestionContext);

    const findIndexKey = (item) => {
        for (let i=0; i < CATEGORIES.length; i++){
            if (CATEGORIES[i].text === item){
                setCategoryIndex(CATEGORIES[i].key);
                break
            }
        }
    }

    function pullQuestionFromApi(categoryIndex, numOfQuestions){
        if (categoryIndex !== 0){
        fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${categoryIndex}&type=multiple`)
        .then((results) => results.json())
        .then((data) => {
            if (data.results.length === 0){
                Swal.fire({
                    title: "Error",
                    text: `There aren't ${numOfQuestions} questions in the selected category, please change one of the values and try again.`,
                    icon: 'error',
                    confirmButtonText: "OK!"
                })
            }
            
            else {
                setQuestions(data.results);
                Swal.fire({
                    title: "Success",
                    text: 'We got the questions successfully! Plase click in the button below to get into questions',
                    icon: 'success',
                    confirmButtonText: "OK!",
                    onClose: () => history.push("questions")
                })
            }
        }
        )
        }

        else{
             fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&type=multiple`)
        .then((results) => results.json())
        .then((data) => {
            Swal.fire({
                    title: "Success",
                    text: 'We got the questions successfully! Plase click in the button below to get into questions',
                    icon: 'success',
                    confirmButtonText: 'OK!',
                    onClose: () => history.push("teste")

                })
        }
        )
        }
    }

    
    return (
        <>
        <h1 className="title">Select the options below to find some questions</h1> 
        <div className="options">
            <Select placeholder = 'Select the category' options={CATEGORIES} onChange={(e) => findIndexKey(e.target.textContent)}/>
            <Select placeholder = 'Select number of questions' options={NUM_OF_QUESTIONS} onChange={(event) => setNumOfQuestions(event.target.textContent)} />
            <Button primary onClick={() => pullQuestionFromApi(categoryIndex, numOfQuestions)}> Send</Button>
        </div>
        </>
    )
}
