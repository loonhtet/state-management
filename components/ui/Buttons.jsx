import Link from "next/link";

export const AddButton = ({ onClick }) => {
    return (
      <button onClick={onClick} className="cursor-pointer px-6 py-3 bg-sand text-navy font-semibold text-sm uppercase shadow-sm hover:bg-bg-opacity-75 focus:outline-none transition duration-300">
        Add
      </button>
    );
};
  
export const UpdateButton = ({ onClick }) => {
    return (
      <button onClick={onClick} className="cursor-pointer px-6 py-3 bg-teal text-navy font-semibold text-sm uppercase shadow-sm hover:bg-bg-opacity-75 focus:outline-none transition duration-300">
        Update
      </button>
    );
};
  

export const DeleteButton = ({ onClick }) => {
    return (
      <button onClick={onClick} className="cursor-pointer px-6 py-3 bg-danger text-navy font-semibold text-sm uppercase shadow-sm hover:bg-bg-opacity-75 focus:outline-none transition duration-300">
        Delete
      </button>
    );
};
  
export const LoadMoreButton = ({ onClick, loading }) => {
  return (
    <button disabled={loading} onClick={onClick} className="cursor-pointer px-6 py-3 bg-navy text-cream font-semibold text-sm uppercase shadow-sm hover:bg-bg-opacity-75 focus:outline-none transition duration-300">
      {loading ? (
        "Loading..."
      ) : (
        "Load More"
      )}
    </button>
  );
};

export const LoginButton = ({ href }) => {
  return (
    <Link href={href} className="cursor-pointer px-6 py-3 bg-sand text-navy font-semibold text-sm uppercase shadow-sm hover:bg-bg-opacity-75 focus:outline-none transition duration-300">
      Login
    </Link>
  );
};