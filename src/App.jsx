import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import FieldworkTemplate from "./FieldworkTemplate";
import FieldworkV2 from "./FieldworkV2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/v1" element={<FieldworkTemplate />} />
        <Route path="/v2" element={<FieldworkV2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
