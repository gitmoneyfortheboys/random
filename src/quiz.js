import React, { useContext } from 'react';
import styled from 'styled-components';
import { QuizContext } from './QuizProvider';
import './styles.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #3873FF;
  border-radius: 8px;

  /* Apply vertical layout for mobile devices */

  @media (max-width: 768px) {
    flex-direction: column;    
  }
`;

const Question = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: ${(props) => (props.selected ? '#0077cc' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#0077cc')};
  border: 1px solid #0077cc;
  border-radius: 8px;
  margin: 5px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #D7F2F3;
`;


export { Wrapper };

const Feedback = styled.div`
  margin-top: 20px;
  font-size: 1rem;
`;

const AnswerButton = ({
    answerText,
    answerKey,
    selectedAnswer,
    handleAnswerSelection,
    isAnswered,
  }) => {
    const isSelected = selectedAnswer === answerKey;
  
    return (
      <Button
        type="button"
        onClick={(e) => handleAnswerSelection(e, answerKey)}
        selected={isSelected}
        disabled={isAnswered}
      >
        {answerKey}: {answerText}
      </Button>
    );
  };  

function Quiz() {
    const { quizState, dispatch } = useContext(QuizContext);
    const { currentQuestion, answers, score } = quizState;
    const question = quizState.questions[currentQuestion];

    const handleAnswerSelection = (e, answer) => {
        dispatch({ type: 'SELECT_ANSWER', payload: { id: question.id, answer } });
        handleSubmit(e, answer);
    };

    const handleSubmit = (e, selectedAnswer) => {
        e.preventDefault();
        const isCorrect = selectedAnswer === question.correctAnswer
        dispatch({ type: 'SET_ANSWER_FEEDBACK', payload: { id: question.id, isCorrect } });
        dispatch({ type: 'SET_ANSWERED', payload: true})
      };

    const handleNextQuestion = () => {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: currentQuestion + 1 });
        dispatch({ type: 'SET_ANSWERED', payload: false });
    };

    if (quizState.questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    return (
        <Container>
            {question ? (
                <div>
                    <Question>{question.questionText}</Question>
                    <form onSubmit={handleSubmit}>
                        {Object.entries(question.answers).map(([key, value]) => (
                            <AnswerButton
                                key={key}
                                answerKey={key}
                                answerText={value}
                                selectedAnswer={answers[question.id]}
                                handleAnswerSelection={handleAnswerSelection}
                                isAnswered={quizState.answered}
                            />
                        ))}
                    </form>
                    {answers[question.id] && (
                        <Feedback>
                            {answers[question.id].answer === question.correctAnswer ? (
                                <div>
                                    <p>Correct!</p>
                                    {currentQuestion < quizState.questions.length ? (
                                        <Button onClick={handleNextQuestion}>Next question</Button>
                                    ) : (
                                        <p>You've finished the quiz!</p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <p>Incorrect.</p>
                                    <p>{question.explanation}</p>
                                    <Button onClick={handleNextQuestion}>Next question</Button>
                                </div>
                            )}
                        </Feedback>
                    )}
                </div>
            ) : (
                <div>
                    <p>You've finished the quiz!</p>
                    <p>Your score: {score} out of {quizState.questions.length}</p>
                </div>
            )}
        </Container>
    );
}

export default Quiz;
