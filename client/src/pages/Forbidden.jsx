import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
      <p className="mb-6 text-gray-600">You don't have permission to access this page.</p>
      <p className="mb-6 text-gray-600">คุณไม่มี ปู ... ในการใช้หน้านี้.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
