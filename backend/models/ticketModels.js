const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: String,
      required: [true, 'Please enter product name'],
      enum: [
        'Laptop',
        'Mobile',
        'Camera',
        'Television',
        'Headphone',
        'Speaker',
        'Watch',
        'Tablet',
        'Other',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please enter description'],
    },
    status: {
      type: String,
      required: [true, 'Please enter status'],
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
