import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketApi from "./ticketService";
import { logout } from "../auth/authSlice";

const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const unauthorised = (message, thunkAPI) => {
  if (message === "Session expired, please login again") {
    thunkAPI.dispatch(logout());
  }
};

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketApi.createTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      unauthorised(message, thunkAPI);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTickets = createAsyncThunk(
  "ticket/allTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketApi.getTickets(token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      unauthorised(message, thunkAPI);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTicket = createAsyncThunk(
  "ticket/singleTicket",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketApi.getTicket(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      unauthorised(message, thunkAPI);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeTicket = createAsyncThunk(
  "ticket/close",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketApi.closeTicket(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      unauthorised(message, thunkAPI);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.ticket = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? ticket.status === "Closed"
            : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
