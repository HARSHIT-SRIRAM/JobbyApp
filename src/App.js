import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import JobItemDetails from "./components/JobItemDetails";

import "./App.css";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
      <Route
        path="/jobs/:id"
        element={<ProtectedRoute element={<JobItemDetails />} />}
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  </HashRouter>
);

export default App;
