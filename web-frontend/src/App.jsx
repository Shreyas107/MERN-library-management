import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <div style={{ marginTop: "64px" }}>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
