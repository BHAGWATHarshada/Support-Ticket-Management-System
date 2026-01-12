import { useState } from "react"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await api.post("/auth/register", { email, password })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Register failed")
    }
    setLoading(false)
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-3">Register</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  )
}

export default Register
