import express from "express"
import cors from "cors"
import logger from "./middleware/logger.js"
import authRoutes from "./routes/auth.routes.js"
import ticketRoutes from "./routes/ticket.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use("/auth", authRoutes)
app.use("/tickets", ticketRoutes)

export default app
