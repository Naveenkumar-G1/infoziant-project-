import { Link } from "react-router-dom";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Dashboard = () => {
  useAuthRedirect();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Your CRM workspace is ready.</p>
        </div>
        <Link to="/leads" className="primary-link">
          View Leads
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>New Leads</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Contacted</h3>
          <p>8</p>
        </div>
        <div className="stat-card">
          <h3>Qualified</h3>
          <p>5</p>
        </div>
      </div>

      <div className="panel-card">
        <h2>Quick Actions</h2>
        <ul>
          <li>Review new leads</li>
          <li>Follow up with prospects</li>
          <li>Track opportunities by status</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
