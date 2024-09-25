const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'cameronwoodard',
  host: 'localhost',
  database: 'ADHD_App',
  password: '',
  port: 5432,
})

// ALTER TABLE tasks
// ADD FOREIGN KEY (list_id) REFERENCES todo_lists (id);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.get('/', cors(), (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  })

  const getUsers = (request, response) => {
    pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
    //   response.set('Access-Allow-Control-Origin', ["*"]);
      response.status(200).json(results.rows)
    })
  }

  app.get('/users', cors(), getUsers)