import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const { logout, role, email } = useAuth()

    const fetchTickets = async () => {
        setLoading(true)
        const res = await api.get("/tickets", {
            params: { status, priority, page, limit: 5 }
        })
        setTickets(res.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchTickets()
    }, [status, priority, page])

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="mb-0">Tickets</h3>
                    <small className="text-muted">
                        Logged in as: <strong>{role === "admin" ? "Admin" : "User"}</strong> <br></br>
                        Welcome : <strong>{email}</strong>
                    </small>
                </div>

                <button className="btn btn-outline-danger" onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="d-flex gap-2 mb-3">
                <select className="form-select" onChange={e => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>

                <select className="form-select" onChange={e => setPriority(e.target.value)}>
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                {role === "user" && (
                    <Link className="btn btn-primary" to="/create">
                        Create
                    </Link>
                )}

            </div>

            {tickets.map(t => (
                <div key={t._id} className="card mb-2">
                    <div className="card-body">
                        <Link to={`/tickets/${t._id}`} className="fw-bold">
                            {t.title}
                        </Link>
                        <div className="text-muted">
                            {t.status} | {t.priority}
                        </div>
                    </div>
                </div>
            ))}

            <div className="d-flex gap-2 mt-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    Prev
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => setPage(p => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default TicketList
