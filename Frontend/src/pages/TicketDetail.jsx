import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../auth/AuthContext"

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { role } = useAuth()

  const [ticket, setTicket] = useState(null)
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get(`/tickets/${id}`).then(res => {
      setTicket(res.data)
      setStatus(res.data.status)
      setPriority(res.data.priority)
    })
  }, [id])

  const updateTicket = async () => {
    setLoading(true)
    await api.patch(`/tickets/${id}`, { status, priority })
    setLoading(false)
    alert("Updated")
  }

  const deleteTicket = async () => {
    await api.delete(`/tickets/${id}`)
    navigate("/tickets")
  }

  if (!ticket) return <div className="container mt-4">Loading...</div>

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <button className="btn btn-link" onClick={() => navigate("/tickets")}>
        ← Back
      </button>

      <div className="card mt-2">
        <div className="card-body">
          <h4>{ticket.title}</h4>
          <p>{ticket.description}</p>

          <p className="text-muted">
            Status: {ticket.status} | Priority: {ticket.priority}
          </p>

          {role === "admin" && (
            <>
              <div className="mb-2">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={updateTicket}>
                  Update
                </button>
              
              </div>
            </>
          )}
            <button className="btn btn-danger" onClick={deleteTicket}>
                  Delete
                </button>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
