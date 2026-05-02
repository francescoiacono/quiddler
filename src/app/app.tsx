import { Route, Routes } from "react-router";
import { HomePage } from "@/routes/home";

export const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);
