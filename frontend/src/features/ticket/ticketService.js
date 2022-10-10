import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/tickets'

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(baseUrl, ticketData, config)
  return response.data
}

const getTickets = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const ticketApi = {
  createTicket,
  getTickets,
}

export default ticketApi
