import { Route, Routes } from "react-router";
import { GamePage } from "@/routes/game";
import { HomePage } from "@/routes/home";
import { WordCheckerPage } from "@/routes/word-checker";

export const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/game" element={<GamePage />} />
    <Route path="/word-checker" element={<WordCheckerPage />} />
  </Routes>
);
