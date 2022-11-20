import './InfoPage.css';
import Card from '../card/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from '../../data/Categories';

const InfoPage = (props) => {
  const {
    setInfoPage,
      setRulesPage,
      highestScore,
      username,
      setUsername,
      category,
      setCategory, 
      difficulty,
      setDifficulty, 
      fetchQuestions,
  } = props;

  // Start quiz
  const startQuiz = () => {
    if(username.length > 0){
      fetchQuestions(category, difficulty);
      setInfoPage(false);
      setRulesPage(true);
    } else {
      // throw alert
      toast.error("Oop's! Username is required", {
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

  return (
    <>
   <Card>
  <div className="card-title"><span>Welcome to O'keji Quiz Application</span></div>
  <div className="card-body">
    <form className="info-form">
      <div className="form-group">
        <label>Enter your username</label>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Quiz category</label>
        <select onChange={(e) => setCategory(e.target.value)} >
          <option key='default' value='' > - Random Questions - </option>
        {
          Categories.map((cat, index) => {
            return (
              <option key={index} value={cat.value}>{cat.category}</option>
            )
          })
        } 
        </select>
      </div>

      <div className="form-group">
        <label>Difficulty Level</label>
        <select onChange={(e) => setDifficulty(e.target.value)} >
          <option key='default' value=''> - Difficulty Level - </option>
          <option key="easy" value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </form>
  </div>
  <div className="buttons">
    <div className="highest-score">Highest Score: <span className='score'>{highestScore}</span></div>
    <button type="submit" onClick={ startQuiz } >Let's Play</button>
  </div>
</Card>

{/* Alert conatiner */}
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

export default InfoPage;