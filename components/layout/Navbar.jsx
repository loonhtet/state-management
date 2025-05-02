"use client";
import { useDispatch, useSelector } from "react-redux";
import { LoginButton } from "../ui/Buttons";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-navy text-cream p-4">
      <h1 className="text-2xl font-bold">State Management</h1>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <LoginButton href="/login" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;