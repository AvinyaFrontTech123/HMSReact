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
import OrganizationMaster from "./component/OrganizationMaster/OrganizationMaster";
import LocationMaster from "./component/LocationMaster/LocationMaster";
import Organization from "./component/Organization/Organization";
import UserGroupMaster from "./component/UserGroupMaster/UserGroupMaster";
import BlockUnblockUser from "./component/BlockUnblockUser/BlockUnblockUser";
import UserMaster from "./component/UserMaster/UserMaster";
import EmployeeMaster from "./component/EmployeeMaster/EmployeeMaster";
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

         <Route
          path="/organization-master"
            element={
              <PrivateRoute>
                <OrganizationMaster />
              </PrivateRoute>
              }
        />

        <Route
          path="/organization"
          element={
            <PrivateRoute>
              <Organization />
            </PrivateRoute>
          }
        >
          <Route
            path="change-role"
            element={
              <PrivateRoute>
                <ChangeLoginRole embedded={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="role-master"
            element={
              <PrivateRoute>
                <RoleMaster embedded={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="organization-master"
            element={
              <PrivateRoute>
                <OrganizationMaster embedded={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="location-master"
            element={
              <PrivateRoute>
                <LocationMaster embedded={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="user-group-master"
            element={
              <PrivateRoute>
                <UserGroupMaster />
              </PrivateRoute>
            }
          />
          <Route
            path="block-unblock-user"
            element={
              <PrivateRoute>
                <BlockUnblockUser />
              </PrivateRoute>
            }
          />
          <Route
            path="user-master"
            element={
              <PrivateRoute>
                <UserMaster embedded={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="employee-master"
            element={
              <PrivateRoute>
                <EmployeeMaster embedded={true} />
              </PrivateRoute>
            }
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
