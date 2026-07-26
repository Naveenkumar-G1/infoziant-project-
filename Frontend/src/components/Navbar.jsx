import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/leads", label: "Leads" },
    { path: "/customers", label: "Customers" },
    { path: "/tasks", label: "Tasks" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">AI CRM</div>
      <div className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? "nav-link active" : "nav-link"}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
