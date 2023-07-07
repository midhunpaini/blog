import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { logoutUser } from "../helper";
import ConfirmationDialog from "./ConfirmationDialog";

const Header = () => {
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleLogoutConfirmation() {
    setShowConfirmation(true);
  }

  function handleConfirmLogout() {
    logoutUser(setUser);
    setShowConfirmation(false);
  }
  function handleCancelLogout() {
    setShowConfirmation(false);
  }
  function handleClick() {
    if (user) {
      handleLogoutConfirmation()
    } else {
      navigate("/login");
    }
  }
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to logout?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">Blog Application</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <p className="text-gray-300 hover:text-white cursor-pointer"  onClick={handleClick}>
                {user ? user : "Login"}
              </p>
            </li>
            <li>
              <Link to="/">
                <p
                  className="text-gray-300 hover:text-white"
                >
                  Blogs
                </p>
              </Link>
            </li>
            {user&&<li>
              <a className="text-gray-300 hover:text-white cursor-pointer" onClick={handleClick}>Logout</a>
            </li>}
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
