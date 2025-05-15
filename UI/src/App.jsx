import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import ForgetPassword from "./login/ForgetPassword";
import ResetPassword from "./login/ResetPassword";
import ResetConfirmation from "./login/ResetConfirmation";
import Dashboard from "./login/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-confirmation" element={<ResetConfirmation />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
