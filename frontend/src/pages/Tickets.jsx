import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TicketItems from "../components/TicketItems";
import { getTickets, reset } from "../features/ticket/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.ticket
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate("/login");
    }
    // dispatch(reset());
  }, [dispatch, isError, message, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div> </div>
        </div>
        {tickets.map((ticket) => (
          <TicketItems key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
