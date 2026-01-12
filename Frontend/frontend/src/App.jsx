import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import TicketList from "./pages/TicketList"
import TicketDetail from "./pages/TicketDetail"
import CreateTicket from "./pages/CreateTicket"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./auth/AuthContext"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/:id"
            element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateTicket />
              </ProtectedRoute>
            }
          />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
