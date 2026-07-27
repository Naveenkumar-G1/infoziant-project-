import { useEffect, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { createCustomer, getCustomers } from "../services/customerService";

const emptyCustomer = {
  name: "",
  email: "",
  company: "",
  phone: "",
  industry: "",
};

const Customers = () => {
  useAuthRedirect();
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyCustomer);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        setMessage("Failed to load customers.");
      }
    };

    loadCustomers();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const customer = await createCustomer(form);
      setCustomers([customer, ...customers]);
      setForm(emptyCustomer);
      setMessage("Customer added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customer relationships and account details here.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Customer name"
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
          name="industry"
          value={form.industry}
          onChange={handleChange}
          placeholder="Industry"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Customer"}
        </button>
      </form>

      {message && <p className="error">{message}</p>}

      <div className="lead-list">
        {customers.map((customer) => (
          <div key={customer._id} className="lead-card">
            <div>
              <strong>{customer.name}</strong>
              <p>{customer.email}</p>
              <p>{customer.company || "—"}</p>
              <p>{customer.industry || "Industry not set"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
