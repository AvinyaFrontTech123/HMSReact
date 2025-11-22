import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./component/Security/PrivateRoute";

// Existing modules
import HospitalFrontOffice from "./component/HospitalFrontOffice/HospitalFrontOffice";
import Laboratory from "./component/Laboratory/Laboratory";
import Doctor from "./component/Doctor/Doctor";
import Nursing from "./component/Nursing/Nursing";
import Specialty from "./component/Specialty/Specialty";
import ChangeLoginRole from "./component/Change_Role_Location/ChangeLoginRole";
import RoleMaster from "./component/RoleMaster/RoleMaster";
// Home dashboard
import Home from "./component/Home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/frontoffice"
          element={
            <PrivateRoute>
              <HospitalFrontOffice />
            </PrivateRoute>
          }
        />

        <Route
          path="/laboratory"
          element={
            <PrivateRoute>
              <Laboratory />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <PrivateRoute>
              <Doctor />
            </PrivateRoute>
          }
        />

        <Route
          path="/nursing"
          element={
            <PrivateRoute>
              <Nursing />
            </PrivateRoute>
          }
        />

        <Route
          path="/specialty"
          element={
            <PrivateRoute>
              <Specialty />
            </PrivateRoute>
          }
        />

        
        <Route
          path="/change-login-role"
          element={
            <PrivateRoute>
              <ChangeLoginRole />
            </PrivateRoute>
          }
        />

        <Route
          path="/role-master"
          element={
            <PrivateRoute>
              <RoleMaster />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
