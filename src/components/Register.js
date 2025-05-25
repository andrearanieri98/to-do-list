import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered!");
      navigate("/"); // redirect to task list
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="mb-4 text-center">Register</h2>
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleRegister}
        className="btn btn-success w-full"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );

}
