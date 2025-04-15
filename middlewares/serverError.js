const errorsHandler = (err, req, res, next) => {
    res.status(500).json({
        error: `500 internal server error`,
        message: err.message
    });
}
module.exports = errorsHandler