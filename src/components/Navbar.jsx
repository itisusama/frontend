import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
  }

  return (
    <>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 text-sm text-base-content">
        <Link className="flex gap-2 items-center">
          <h2 className="text-3xl font-bold">Likho</h2>
          <div className="rounded-full w-3 h-3 bg-primary"></div>
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500 text-base-content/80">
          <a href="#" className="hover:text-primary transition">Home</a>
          <a href="#features" className="hover:text-primary transition">Features</a>
          <a href="#testimonials" className="hover:text-primary transition">Testimonials</a>
          <a href="#cta" className="hover:text-primary transition">Contact</a>
        </div>

        {/* <div className="flex gap-2">
          <a
            href=""
            className="hidden md:inline-flex btn btn-primary rounded-full"
          >
            Get started
          </a>
          <Link
            to="/login"
            className="hidden md:inline-flex btn btn-outline rounded-full"
          >
            Login
          </Link>
        </div> */}
        <div className="flex gap-2">
      
      {user ? (
        <div className="flex gap-2 items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 hidden md:inline-flex btn btn-outline rounded-full">{user.fullname}</div>
          <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 shadow-sm">
            <li><Link to="/profile">Profile</Link></li>
            <li><button type="button" className="text-primary" onClick={()=>handleLogout()}>Log Out</button></li>
          </ul>
        </div>
        </div>
      ) : (
        <>
        <a
        href=""
        className="hidden md:inline-flex btn btn-primary rounded-full"
      >
        Get started
      </a>
        <Link
          to="/login"
          className="hidden md:inline-flex btn btn-outline rounded-full"
        >
          Login
        </Link>
        </>
      )}
    </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden btn btn-ghost btn-circle"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-base-content/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <a href="/" className="text-base-100">Home</a>
        <a href="/products" className="text-base-100">Products</a>
        <a href="/stories" className="text-base-100">Stories</a>
        <a href="/pricing" className="text-base-100">Pricing</a>

        <button
          onClick={() => setMenuOpen(false)}
          className="btn btn-primary btn-square"
          aria-label="Close menu"
        >
          X
        </button>
      </div>
    </>
  );
};

export default Navbar;