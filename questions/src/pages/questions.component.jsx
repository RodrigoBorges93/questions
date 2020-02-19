import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { QuestionContext } from '../contexts/questions.contexts';
import { RespostasContext } from '../contexts/respostas.contexts';
import { Button } from 'semantic-ui-react';
import Questoes from '../components/questions/questions.component';
import './questions.styles.css';

export default function Questions(){
    const [questions, setQuestions] = useContext(QuestionContext);
    const [resposta, setResposta] = useContext(RespostasContext);
    let [acertos, setAcertos] = useState(0);
    let [index, setIndex] = useState(0);
    const history = useHistory();
    let[answered, setAnswered] = useState(false);


    function nextQuestion(item){
        if (index < questions.length -1){
        setIndex(index += 1);
        }

        else{

            item.map((respondidas) => {
            if (respondidas.marcado === respondidas.correta){
                setAcertos(acertos += 1)
            }
            });

            Swal.fire({
                title: 'Results',
                text: `Você acertou ${acertos} questões`,
                icon: 'info',
                confirmButtonText: 'Try different questions!',
                onClose: () => history.push("/")
            })

            setResposta([]);
            setAcertos(0);
            setIndex(0);
        }
    }

    questions.map((question) => (
                    question.answers = [[...question.incorrect_answers, question.correct_answer]]
                ))
    
    return (
        <>
        <div>
            <Questoes questions={questions[index]} />
            <Button className='send-button' secondary onClick={() => nextQuestion(resposta)}> Send Results </Button>
        </div>
        </>
    )
}