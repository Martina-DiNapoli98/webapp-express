const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const errorsHandler = require("./middlewares/serverError");
const notFound = require("./middlewares/error_404")
const moviesRouter = require("./routers/movies");



app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173'
    }
));
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.send('Welcome on our server!');
});

app.use('/api/v1/movies', moviesRouter);



app.use(errorsHandler);

app.use(notFound)



