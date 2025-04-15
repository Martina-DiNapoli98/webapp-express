const notFound = (req, res, next) => {
    res.status(404).json({
        error: `404`,
        message: `Not Found`
    });
}

module.exports = notFound