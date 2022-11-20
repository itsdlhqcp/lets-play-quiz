import './QuizPage.css';
import Questions from '../questions/Questions';
import Card from '../card/Card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const QuizPage = (props) => {
  const {
    score,
    setScore,
    questions,
    setQuizPage,
    setInfoPage,
    setResultPage,
    timeCount,
    timeText,
    setTimeText,
    timeLine,
    startTimer,
    startTimerLine,
    counter,
    counterLine
  } = props;
  
  // console.log(counter);

  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [selected, setSelected] = useState("");
  const [correct, setCorrect] = useState("");

useEffect(() => {
  // console.log(questions);

  // const correct = questions[currQues]?.correct_answer;

  setOptions(
    questions ? handleShuffle([
      questions[currQues]?.correct_answer,
      ...questions[currQues]?.incorrect_answers,
    ]) : ''
  );

  setCorrect(questions[currQues]?.correct_answer);
}, [questions, currQues, correct]);

const handleShuffle = (options) => {
  return options.sort(() => Math.random()-0.5);
}
  
  const handleSelect = (option) =>{
    
    if(selected === option && selected === correct){
      return "correct";
    }else if(selected === option && selected !== correct){
      return "incorrect";
    }else if(option === correct){
      return "correct";
    }
  }

const handleCheck = (option) =>{
  // console.log(correct, option);
  setSelected(option);
  if(option === correct){
    setScore(score + 1);
    
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    setTimeText("Time Left") //Reset time text
  }
  }
  
  const handleNext = () => {
    if(currQues > 8){
      setQuizPage(false);
      setResultPage(true);
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      startTimer(15); //calling startTimer function
      startTimerLine(0); //calling startTimerLine function
      setTimeText("Time Left") //Reset time text
    }else if(selected){
      setCurrQues(currQues + 1);
      setSelected();
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      startTimer(15); //calling startTimer function
      startTimerLine(0); //calling startTimerLine function
      setTimeText("Time Left") //Reset time text
    }else{    

// Go to next Question if time off
      const option = document.getElementsByClassName("option"); 
      if(option.length > 1){
        for(let i=0; i < option.length; i++){
          if(option[i].classList.contains("disabled")){
            // console.log("sss",option[i].classList.contains("disabled"));
          option[i].classList.remove("disabled");
          }
        }

        setCurrQues(currQues + 1);
      setSelected();
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      startTimer(15); //calling startTimer function
      startTimerLine(0); //calling startTimerLine function
      setTimeText("Time Left") //Reset time text
      }else{
    toast.error("Please select an option", {
      theme: "colored",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
  }
  }

  const handleQuit = () => {     
  setScore(0);
  setQuizPage(false);
  setInfoPage(true);
  }
  
  return (
    <>
    <Card>
  <div className='question-header'>
    <div className="title">O'keji Quiz Application</div>
    {/* Question timer */}
    <div className="timer">
      <div className="time_left_txt">{timeText}</div>
      <div className="timer_sec">{timeCount}</div>
    </div>
    <div className="time_line" style={{width: timeLine}} />
  </div>

{/* Import Question if exist */}
  { questions ? (<Questions 
  currQues={currQues}
  setCurrQues={setCurrQues}
  questions={questions}
  options={options}
  score={score}
  correct={questions[currQues]?.correct_answer}
  handleNext={handleNext}
  handleQuit={handleQuit}
  handleCheck={handleCheck}
  handleSelect={handleSelect}
  selected={selected}
  />) :
  // show loading icon if no questions
   <FaSpinner className='spinner' />
}

<div className='question-footer'>
    <div className="total_que">
    <span><p>{currQues + 1}</p> of <p>{questions.length}</p> Questions</span>
    </div>
    <button onClick={handleQuit} >Quit</button>
    {/* Disable button if no question */}
    <button onClick={handleNext} disabled={questions ? '' : true } >Next</button>
  </div>
    </Card>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
</>
  )
}

export default QuizPage