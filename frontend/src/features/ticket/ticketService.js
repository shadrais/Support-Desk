import axios from "axios";

const baseUrl = "https://brown-beaver-slip.cyclic.app/api/tickets";

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, ticketData, config);
  return response.data;
};

const getTickets = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getTicket = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(baseUrl + "/" + id, config);
  return response.data;
};

const closeTicket = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    baseUrl + "/" + id,
    { status: "Closed" },
    config
  );
  return response.data;
};

const ticketApi = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketApi;
