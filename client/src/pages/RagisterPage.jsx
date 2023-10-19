import React from "react";
import { Link } from "react-router-dom";

function RagisterPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="my-2 text-center text-gray-500">
            Already have an account?
            <Link to="/login" className="text-blue-500 pl-1">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RagisterPage;
