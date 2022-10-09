const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red)

  res.status(res.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = errorHandler
