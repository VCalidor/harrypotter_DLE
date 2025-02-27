import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassicChallenges from "./pages/ClassicChallenges";
import EmojiChallenge from "./pages/EmojiChallenge";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/daily-challenge"
          element={<ClassicChallenges isDaily={true} />}
        />
        <Route
          path="/infinite-challenge"
          element={<ClassicChallenges isDaily={false} />}
        />
        <Route
          path="/emoji-challenge"
          element={<EmojiChallenge isDaily={true} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
