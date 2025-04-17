const connection = require('../data/db')


function index(req, res) {

    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })
        console.log(results)
        res.json(results)
    })

};

function storeReview(req, res) {
    const id = Number(req.params.id)
    const { name, text, vote } = req.body
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const update_at = created_at

    const insertSql = 'INSERT INTO reviews (movie_id, name, vote, text, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?)'
    const values = [id, name, vote, text, created_at, update_at]

    connection.query(insertSql, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })

        console.log(results)
        res.status(201).json({ message: ' Review added successfully', reviewId: results.insertId })
    })
};

function show(req, res) {
    const id = Number(req.params.id)
    const sql = 'SELECT * FROM movies WHERE id = ?'
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?'
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ error: 'Movies not found' })
        const movie = results[0]

        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: err.message })
            movie.reviews = reviews
            console.log(movie.reviews)
            res.json(movie)
        })

    });
};



module.exports = { index, show, storeReview }