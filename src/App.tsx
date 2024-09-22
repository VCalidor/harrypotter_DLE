import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Challenges from "./pages/Challenges";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/daily-challenge"
          element={<Challenges isDaily={true} />}
        />
        <Route
          path="/infinite-challenge"
          element={<Challenges isDaily={false} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
