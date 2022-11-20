import './RulesPage.css';
import Card from '../card/Card';

const RulesPage = (props) => {
  const { username, setInfoPage, setRulesPage, setQuizPage, startTimer, startTimerLine, counter, counterLine } = props;
  
  const exitQuiz = () => {
    setRulesPage(false);
    setInfoPage(true);
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
  }

  const startQuiz = () => {
      setRulesPage(false);
      setQuizPage(true);
      clearInterval(counter); //clear counter
      clearInterval(counterLine); //clear counterLine
      startTimer(15); //calling startTimer function
      startTimerLine(0); //calling startTimerLine function
    }

  return (
    <Card>
  <div className="card-title"><span>Hello <span className='username'>{username}!</span><br />Some Rules of this Quiz</span></div>
  <div className="card-body">
    <div className="rule">1. You will have only <span>15 seconds</span> for all question.</div>
    <div className="rule">2. Once you select your answer, it can't be undone.</div>
    <div className="rule">3. You can't select any option once time goes off..</div>
    <div className="rule">4. You can't exit from the Quiz while you're playing.</div>
    <div className="rule">5. You'll get points on the basis of your correct answers.</div>
  </div>
  <div className="buttons">
    <button onClick={exitQuiz}>Exit Quiz</button>
    <button onClick={startQuiz}>Continue</button>
  </div>
</Card>

  )
}

export default RulesPage