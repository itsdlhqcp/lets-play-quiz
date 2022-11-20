import React from "react";
import InfoPage from "./components/infoPage/InfoPage";
import RulesPage from "./components/rulesPage/RulesPage";
import QuizPage from "./components/quizPage/QuizPage";
import ResultPage from "./components/resultPage/ResultPage";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [infoPage, setInfoPage] = useState(true);
  const [rulesPage, setRulesPage] = useState(false);
  const [quizPage, setQuizPage] = useState(false);
  const [resultPage, setResultPage] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState('');
  const [timeText, setTimeText] = useState("Time Left");
  const [timeCount, setTimeCount] = useState(15);
  const [timeLine, setTimeLine] = useState(0);
  let [counter, setCounter] = useState();
  let [counterLine, setCounterLine] = useState();

  // Fetch quiz api
  const fetchQuestions = async (category, difficulty) => {
    // concantenate category and difficulty level into api url
    const url = `https://opentdb.com/api.php?amount=10${category !== '' ? `&category=${category}` : ``}${ difficulty !== `` ? `&difficulty=${difficulty}` : ''}&type=multiple`;
    await axios.get(url)
    .then( (response) => {
      // console.log(response.data.results);      
    setQuestions(response.data.results); 
    }).catch((error) => {
      // console.log("error", error);
      // console.log(url);
    }).finally(() => {
      // console.log("url", url);
    })
  }

  
  // Quiz Timer function
 const startTimer = (time) => {
   const timer = () => {
       setTimeCount(time); //changing the value of timeCount with time value
       time--; //decrement the time value
      //  console.log(time);
       if(time < 9){ //if timer is less than 9
           setTimeCount("0" + time); //add a 0 before time value
       }
       if(time < 1){ //if timer is less than 0
           clearInterval(counter); //clear counter
           setTimeText("Time Off"); //change the time text to time off
           const option = document.getElementsByClassName("option");
          //  console.log(option.length);
           for(let i=0; i < option.length; i++){
            option[i].classList.add("disabled");
        }
          //  options.map((option, i) => options[i].classList.add("disabled") ) //once user select an option then disabled all options
       }
   }
   counter = setInterval(timer, 1000);
   setCounter(counter);
  }

  const startTimerLine = (time) =>{
   const timer = ()=> {
        time += 1; //upgrading time value with 1
        setTimeLine(time + "px"); //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
    counterLine = setInterval(timer, 29);
    setCounterLine(counterLine);
}

  return (
    <>
    {/* Show Info page if true */}
    { infoPage ? (<InfoPage
    setInfoPage={setInfoPage}
    setRulesPage={setRulesPage}
    highestScore={highestScore}
    username={username}
    setUsername={setUsername}
    category={category} 
    setCategory={setCategory} 
    difficulty={difficulty}
    setDifficulty={setDifficulty} 
    fetchQuestions={fetchQuestions}
    />) : '' }

    {/* Show rules page if true */}
    { rulesPage ? (<RulesPage
    username={username}
    setInfoPage={setInfoPage}
    setRulesPage={setRulesPage}
    setQuizPage={setQuizPage}
    startTimer={startTimer}
    startTimerLine={startTimerLine}
    counter={counter}
    counterLine={counterLine}
    setTimeText={setTimeText}
     />) : '' }

    {/* Show quiz page if true */}
    { quizPage ? (<QuizPage
    score={score}
    setScore={setScore} 
    questions={questions}
    setInfoPage={setInfoPage}
    setQuizPage={setQuizPage}
    setResultPage={setResultPage} 
    startTimer={startTimer}
    startTimerLine={startTimerLine}
    counter={counter}
    counterLine={counterLine}
    timeCount={timeCount}
    timeText={timeText}
    setTimeText={setTimeText}
    timeLine={timeLine}
    />) : '' }

    {/* Show result page if true */}
{ resultPage ? (<ResultPage
  username={username}
    score={score}
    setScore={setScore}
    questions={questions}
    highestScore={highestScore}
    setHighestScore={setHighestScore}
    setInfoPage={setInfoPage}
    setQuizPage={setQuizPage}
    setResultPage={setResultPage} 
    startTimer={startTimer}
    startTimerLine={startTimerLine}
    setTimeText={setTimeText}
    counter={counter}
    counterLine={counterLine}
    />) : '' }

    </>
  )
}

export default Home