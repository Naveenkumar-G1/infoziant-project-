import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/leads", label: "Leads" },
    { path: "/customers", label: "Customers" },
    { path: "/tasks", label: "Tasks" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">AI CRM</div>
      {isAuthenticated ? (
        <>
          <div className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  location.pathname === link.path
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button type="button" className="nav-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div className="navbar-links">
          <Link
            to="/login"
            className={
              location.pathname === "/login" ? "nav-link active" : "nav-link"
            }
          >
            Login
          </Link>
          <Link
            to="/register"
            className={
              location.pathname === "/register" ? "nav-link active" : "nav-link"
            }
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
