import './index.scss';
import React, {useState} from 'react';

const questions = [
    {
        title: 'React - is ... ?',
        variants: ['a library', 'a framework', 'an application'],
        correct: 0,
    },
    {
        title: 'Component - is ... ',
        variants: ['an application', 'a part of an application or a page', '...I don\'t know what it is'],
        correct: 1,
    },
    {
        title: 'What is JSX?',
        variants: [
            'simple HTML',
            'function',
            'HTML, but able to manage JS-code',
        ],
        correct: 2,
    },
];

function Result({correct, onClickStart}) {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
            <h2>You named {correct} correct answers from {questions.length}</h2>
            <button onClick={onClickStart}>Try again</button>
        </div>
    );
}

function Game({step, question, onClickVariant}) {

    const percentage = Math.round((step / questions.length) * 100)
    return (
        <>
            <div className="progress">
                <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((text, index) => <li key={text} onClick={() => onClickVariant(index)}>{text}</li>)}
            </ul>
        </>
    );
}

function App() {
    const [step, setStep] = useState(0);
    const question = questions[step];
    const onClickVariant = (index) => {
        setStep(step+1)
        if (index === question.correct) {
            setCorrect(correct+1)
        }
    }
    const [correct, setCorrect] = useState(0);
    const onClickStart = () => {
        setStep(0);
        setCorrect(0)
    }
    return (
        <div className="App">
            {step !== questions.length
                ? <Game step={step} question={question} onClickVariant={onClickVariant}/>
                : <Result correct={correct} onClickStart={onClickStart}/>}
        </div>
    );
}

export default App;
