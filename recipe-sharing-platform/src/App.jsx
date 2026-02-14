import HomePage from "./components/HomePage";
import { Route,Routes } from "react-router-dom";

 
 function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
      
    </div>
  );
}

export default App