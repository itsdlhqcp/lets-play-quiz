import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";

function MyRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default MyRoutes;
