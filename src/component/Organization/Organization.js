import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './Organization.css';
import Navbar from '../Navbar/Navbar';

const Organization = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which tab is active based on the current URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('change-role')) return 'change-role';
    if (path.includes('role-master')) return 'role-master';
    if (path.includes('organization-master')) return 'organization-master';
    if (path.includes('location-master')) return 'location-master';
    if (path.includes('user-group-master')) return 'user-group-master';
    if (path.includes('block-unblock-user')) return 'block-unblock-user';
    if (path.includes('user-master')) return 'user-master';
    if (path.includes('employee-master')) return 'employee-master';
    return 'change-role'; // default
  };

  const active = getActiveTab();

  return (
    <div className="organization-module">
      <Navbar />

      <header className="organization-header">
        <h1>🏢 Organization Module</h1>
        <p>Manage organization registration and changes</p>
      </header>

      <nav className="organization-lines">
        <button
          className={`org-line change-role ${active === 'change-role' ? 'active' : ''}`}
          onClick={() => navigate('/organization/change-role')}
        >
          🔄 Change Role/Location
        </button>

        <button
          className={`org-line role-master ${active === 'role-master' ? 'active' : ''}`}
          onClick={() => navigate('/organization/role-master')}
        >
          👥 Role Master
        </button>

        <button
          className={`org-line organization-master ${active === 'organization-master' ? 'active' : ''}`}
          onClick={() => navigate('/organization/organization-master')}
        >
          🏛️ Organization Master
        </button>

        <button
          className={`org-line location-master ${active === 'location-master' ? 'active' : ''}`}
          onClick={() => navigate('/organization/location-master')}
        >
          📍 Location Master
        </button>

        <button
          className={`org-line user-group ${active === 'user-group-master' ? 'active' : ''}`}
          onClick={() => navigate('/organization/user-group-master')}
        >
          👥 User Group Master
        </button>

        <button
          className={`org-line block-unblock ${active === 'block-unblock-user' ? 'active' : ''}`}
          onClick={() => navigate('/organization/block-unblock-user')}
        >
          🚫 Block/Unblock User
        </button>

        <button
          className={`org-line user-master ${active === 'user-master' ? 'active' : ''}`}
          onClick={() => navigate('/organization/user-master')}
        >
          👤 User Master
        </button>

        <button
          className={`org-line employee-master ${active === 'employee-master' ? 'active' : ''}`}
          onClick={() => navigate('/organization/employee-master')}
        >
          👨‍💼 Employee Master
        </button>
      </nav>

      <main className={`organization-content ${active}-active`}>
        <div className="org-panel">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Organization;
