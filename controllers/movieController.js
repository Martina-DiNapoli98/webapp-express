
function index(req, res) {
    res.json({ message: 'List of movies' })
};


function show(req, res) {
    const { id } = req.params
    res.json({ message: `List of movies with id: ${id}` })
};

module.exports = { index, show }