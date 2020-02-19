import React, { useContext } from 'react';
import { RespostasContext } from '../../contexts/respostas.contexts';
import { Button } from 'semantic-ui-react';

export default function Questoes({questions}){

    const [resposta, setResposta] = useContext(RespostasContext);

    return(

        <div>
        {
                    <div className='quiz'>
                        <p className='questions'>{questions.question}</p>

                        <div className='all-answers'>
                        {
                            questions.answers.map((answer) => answer.map((a, i) => (
                                    <Button
                                        className='button-answer'
                                        value={a} 
                                        onClick={(e) => 
                                        setResposta([...resposta, {marcado: e.target.value, correta: questions.correct_answer}])} 
                                        key={i} primary>{a}
                                    </Button>
                            ))
                            )
                        }
                        </div>
                        </div>
            }
        </div>
    )
}