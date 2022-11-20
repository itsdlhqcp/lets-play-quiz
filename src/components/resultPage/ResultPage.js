import './ResultPage.css';
import Card from '../card/Card';
import { useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';

const ResultPage = (props) => {
  
  // Get props
  const {
    username,
    questions,
     score, 
     setScore,
     highestScore,
      setHighestScore,
      setInfoPage,
      setQuizPage,
      setTimeText,
     setResultPage,
     startTimer,
     startTimerLine,
     counter, 
     counterLine
  } = props;

  const [scoreText, setScoreText] = useState();

  useEffect(() => {

    // if score is greater than 5, display message
  if (score > 5){ 
    setScoreText(`and congrats! 🎉, You got ${score} out of ${questions.length}`);
} else if(score > 3){ 
  // if score is greater than 3, display message
  setScoreText(`and nice 😎, You got ${score} out of ${questions.length}`);
 } else{ 
  // if score is less than 3, display message
  setScoreText(`and sorry 😐, You got ${score} out of ${questions.length}`);
  }
  },[score, questions.length])

  // Replay quiz
  const handleReplay = () =>{
    if(score > highestScore){
      setHighestScore(score);
    }
    setScore(0);
    setResultPage(false);
    setQuizPage(true);
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
    setTimeText("Time Left") //Reset time text
  }

  // Quit quiz
  const handleQuit = () =>{
    if(score > highestScore){
      setHighestScore(score);
    }
    setScore(0);
    setResultPage(false);
    setInfoPage(true);
  }

  return (
    <Card>
      <div className='result'>
  <div className="icon">
    <FaCrown />
  </div>
  <div className="complete-text"><span className='username'>{username}</span>, you've completed the Quiz!</div>
  <div className="score-text"><span>{scoreText}</span></div>
  <div className="buttons">
    <button className="restart" onClick={handleReplay}>Replay Quiz</button>
    <button className="quit" onClick={ handleQuit }>Quit Quiz</button>
  </div>
</div>

    </Card>
  )
}

export default ResultPage