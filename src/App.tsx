import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import WelcomePage from "./components/welcome";
import CustomizePage from "./routes/customize";
import QuizPage from "./routes/quiz-page";

function App() {
  return (
    <div className="dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05]">
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/customize" element={<CustomizePage />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
