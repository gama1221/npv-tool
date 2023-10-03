import './App.css';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Navigation from './Components/navigation/Navigation';
import HomePage from "./Components/home/HomePage";
import ContactPage from "./Components/contact/ContactPage";
import NPVToolPage from "./Components/npvtool/NPVToolPage";
import NPVScenarioDescription from "./Components/npvtool/NPVScenarioDescription";
import NotFound from "./Components/notfound/NotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/npv" element={<NPVToolPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:npvId" element={<NPVScenarioDescription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
