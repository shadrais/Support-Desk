const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketController");
const noteRouter = require("./notesRoutes");

const router = express.Router();

// Re-route into note router
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
