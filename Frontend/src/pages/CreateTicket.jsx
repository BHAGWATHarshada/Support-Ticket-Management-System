import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

const CreateTicket = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.post("/tickets", { title, description, priority })
    setLoading(false)
    navigate("/tickets")
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h3>Create Ticket</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Title"
          value={title} onChange={e => setTitle(e.target.value)} />

        <textarea className="form-control mb-2" placeholder="Description"
          value={description} onChange={e => setDescription(e.target.value)} />

        <select className="form-select mb-3"
          value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  )
}

export default CreateTicket
