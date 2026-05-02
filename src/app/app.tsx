import { Route, Routes } from "react-router";
import HomePage from "../routes/home/home-page";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default App;
