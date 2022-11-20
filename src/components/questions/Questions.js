import './Questions.css';

const Question = ({
  currQues,
  questions,
  options,
  score,
  handleSelect,
  handleCheck,
  selected
}) => {

  return (
    <>
  <div className='question'>
    <div className='cat-score'>
      
      {/* Show current Question category */}
      <span>{questions[currQues].category}</span>

      {/* Show Score */}
    <span>Score: {score}</span></div>

    <div className="que_text">

    <span>{questions[currQues].question}</span>
    {/* <span>Question</span> */}
    </div>
    <div className="option_list">
      {options ? options.map((option, i) => 
      <div 
      key={i} 
      onClick={() => handleCheck(option)} 
      className={`option ${selected ? handleSelect(option) : `` } ${selected ? `disabled` : `` }`}
      disabled={selected}>
        <span>{option}</span>
        </div>) : null }
 
    </div>
  </div>
{/*   
  <div className='question-footer'>
    <div className="total_que">
    <span><p>{currQues + 1}</p> of <p>{questions.length}</p> Questions</span>
    </div>
    <button onClick={handleQuit} >Quit</button>
    <button onClick={handleNext} >Next</button>
  </div> */}
  </>
  )
}

export default Question