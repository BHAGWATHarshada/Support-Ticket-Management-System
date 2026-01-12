import Ticket from "../models/Ticket.js"

export const createTicket = async (req, res) => {
  const { title, description, priority } = req.body
  if (!title || !description || !priority)
    return res.status(400).json({ message: "All fields required" })

  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only users can create tickets" })
  }


  const ticket = await Ticket.create({
    title,
    description,
    priority,
    createdBy: req.user.id
  })

  res.status(201).json(ticket)
}

export const getTickets = async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query
  const filter = {}

  if (status) filter.status = status
  if (priority) filter.priority = priority
  if (req.user.role !== "admin") filter.createdBy = req.user.id

  const tickets = await Ticket.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 })

  res.json(tickets)
}

export const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) return res.status(404).json({ message: "Ticket not found" })

  if (req.user.role !== "admin" && ticket.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" })

  res.json(ticket)
}

export const updateTicket = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" })
  }

  const { status, priority } = req.body
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) return res.status(404).json({ message: "Ticket not found" })

  ticket.status = status || ticket.status
  ticket.priority = priority || ticket.priority
  await ticket.save()

  res.json(ticket)
}


export const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) return res.status(404).json({ message: "Ticket not found" })

  if (
    req.user.role !== "admin" &&
    !(ticket.createdBy.toString() === req.user.id && ticket.status === "open")
  ) {
    return res.status(403).json({ message: "Forbidden" })
  }

  await ticket.deleteOne()
  res.json({ message: "Ticket deleted" })
}
