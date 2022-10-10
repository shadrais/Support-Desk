import axios from 'axios'

const baseUrl = 'https://3000-shadrais-supportdesk-p1zndkfksd9.ws-us70.gitpod.io/api/tickets'

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

const getTicket = async(id,token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(baseUrl + '/id', config)
  return response.data
}

const ticketApi = {
  createTicket,
  getTickets,
  getTicket
}

export default ticketApi
