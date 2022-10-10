import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeTicket, getTicket, reset } from "../features/ticket/ticketSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Ticket = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, isError, ticket, isSuccess, message } = useSelector(
    (state) => state.ticket
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTicket(params.ticketId));
    return () => {
      console.log("Single Ticket unmount");
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // dispatch(reset());
  }, [isError, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(params.ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "Close" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
