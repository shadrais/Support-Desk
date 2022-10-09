const Ticket = require('../models/ticketModels')
const User = require('../models/userModels')
const asyncHandler = require('express-async-handler')

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(400)
    throw new Error('Unable to get tickets')
  }
  const tickets = await Ticket.find({ user: user._id })
  res.status(200).json(tickets)
})

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please enter product and description')
  }
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(400)
    throw new Error('Unable to create ticket')
  }
  const ticket = await Ticket.create({
    user: user._id,
    product,
    description,
    status: 'Open',
  })
  res.status(201).json(ticket)
})

const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(400)
    throw new Error('Unable to get ticket')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(400)
    throw new Error('Unable to get ticket')
  }
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(400)
    throw new Error('Not authorized to get ticket')
  }
  res.status(200).json(ticket)
})

const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(400)
    throw new Error('Unable to update ticket')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(400)
    throw new Error('Unable to update ticket')
  }
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(400)
    throw new Error('Not authorized to get ticket')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedTicket)
})

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(400)
    throw new Error('Unable to delete ticket')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(400)
    throw new Error('Unable to delete ticket')
  }
  if (ticket.user.toString() !== user._id.toString()) {
    res.status(400)
    throw new Error('Not authorized to get ticket')
  }
  await ticket.remove()
  res.status(200).json({ message: 'Ticket removed' })
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
}
