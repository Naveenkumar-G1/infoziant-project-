import { useEffect, useState } from "react";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../services/leadService";

const emptyLead = {
  name: "",
  email: "",
  company: "",
  phone: "",
  status: "New",
  source: "",
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(emptyLead);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      setMessage("Could not load leads");
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const created = await createLead(form);
      setLeads([created, ...leads]);
      setForm(emptyLead);
      setMessage("Lead created successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      setLeads(leads.filter((lead) => lead._id !== id));
      setMessage("Lead deleted");
    } catch (error) {
      setMessage("Failed to delete lead");
    }
  };

  const handleStatusUpdate = async (lead) => {
    const nextStatus = lead.status === "New" ? "Contacted" : "New";
    try {
      const updated = await updateLead(lead._id, {
        ...lead,
        status: nextStatus,
      });
      setLeads(leads.map((item) => (item._id === lead._id ? updated : item)));
    } catch (error) {
      setMessage("Failed to update lead");
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Leads</h1>
      <p>Create and manage your sales leads.</p>

      <form onSubmit={handleSubmit} className="card-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Lead name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Won">Won</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Lead"}
        </button>
      </form>

      {message && <p className="error">{message}</p>}

      <div className="lead-list">
        {leads.map((lead) => (
          <div key={lead._id} className="lead-card">
            <div>
              <strong>{lead.name}</strong>
              <p>{lead.email}</p>
              <p>{lead.company || "—"}</p>
            </div>
            <div className="lead-actions">
              <span className="status-pill">{lead.status}</span>
              <button type="button" onClick={() => handleStatusUpdate(lead)}>
                Toggle Status
              </button>
              <button type="button" onClick={() => handleDelete(lead._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;
