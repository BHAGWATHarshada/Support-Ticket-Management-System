import { Router } from "express"
import auth from "../middleware/auth.js"
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} from "../controllers/ticket.controller.js"

const router = Router()

router.use(auth)

router.post("/", createTicket)
router.get("/", getTickets)
router.get("/:id", getTicketById)
router.patch("/:id", updateTicket)
router.delete("/:id", deleteTicket)

export default router
