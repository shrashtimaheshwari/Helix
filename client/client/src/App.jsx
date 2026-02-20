import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RiskAssessment from "./pages/RiskAssessment";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* NEW PAGE */}
      <Route path="/risk" element={<RiskAssessment />} />
    </Routes>
  );
}
