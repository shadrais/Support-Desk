import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { closeTicket, getTicket, reset } from "../features/ticket/ticketSlice";
import { getNotes, createNote } from "../features/notes/notesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { isLoading, isError, ticket, isSuccess, message } = useSelector(
    (state) => state.ticket
  );
  const { notes } = useSelector((state) => state.notes);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTicket(params.ticketId));
    dispatch(getNotes(ticketId));
    return () => {
      console.log("Single Ticket unmount");
      dispatch(reset());
    };
  }, []);

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success("Ticket Closed");
        navigate("/tickets");
      })
      .catch(toast.error);
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText("");
        closeModal();
      })
      .catch(toast.error);
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // if (!ticket) {
  //   return <Spinner />;
  // }
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
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
