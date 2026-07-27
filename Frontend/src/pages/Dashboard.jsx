import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { getLeads } from "../services/leadService";

const Dashboard = () => {
  useAuthRedirect();
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError("Unable to load leads for dashboard.");
      }
    };

    fetchLeads();
  }, []);

  const stats = useMemo(() => {
    const newLeads = leads.filter((lead) => lead.status === "New").length;
    const contacted = leads.filter(
      (lead) => lead.status === "Contacted",
    ).length;
    const qualified = leads.filter(
      (lead) => lead.status === "Qualified",
    ).length;

    return {
      newLeads,
      contacted,
      qualified,
    };
  }, [leads]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Your CRM workspace is ready.</p>
          {error && <p className="error">{error}</p>}
        </div>
        <Link to="/leads" className="primary-link">
          View Leads
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>New Leads</h3>
          <p>{stats.newLeads}</p>
        </div>
        <div className="stat-card">
          <h3>Contacted</h3>
          <p>{stats.contacted}</p>
        </div>
        <div className="stat-card">
          <h3>Qualified</h3>
          <p>{stats.qualified}</p>
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
