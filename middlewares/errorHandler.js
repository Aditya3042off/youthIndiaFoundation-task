const customErrorHandler = (err, req, res, next) => {
    const { message, type } = err;
    const status = err.status || 500;
    res.status(status).json({ type, message });
};

module.exports = { customErrorHandler };