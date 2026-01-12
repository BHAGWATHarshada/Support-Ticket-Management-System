import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

const decodeToken = (token) => {
  if (!token) return null
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token")
  const decoded = decodeToken(storedToken)

  const [token, setToken] = useState(storedToken)
  const [role, setRole] = useState(decoded?.role || null)
  const [email, setEmail] = useState(decoded?.email || null)

  const login = (t) => {
    localStorage.setItem("token", t)
    const d = decodeToken(t)
    setToken(t)
    setRole(d?.role || null)
    setEmail(d?.email || null)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setRole(null)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ token, role, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
