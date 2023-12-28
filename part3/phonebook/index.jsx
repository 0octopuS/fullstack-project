
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
  { 'id': 1, 'name': 'Arto Hellas', 'number': '040-123456' },
  { 'id': 2, 'name': 'Ada Lovelace', 'number': '39-44-5323523' },
  { 'id': 3, 'name': 'Dan Abramov', 'number': '12-43-234345' },
  { 'id': 4, 'name': 'Mary Poppendieck', 'number': '39-23-6423122' }
]

const app = express()
app.use(cors())
// app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('dist'))
// 3.7 use morgan
morgan.token('body', (req, res) => JSON.stringify(req.body));

// 3.8 Configure morgan so that it also shows the data sent in HTTP POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



// app.get('/', (request, response) => {
//   response.send('<h1>Personal PhoneBook!</h1>')
// })

// 3.1 Node application that returns a hardcoded list of phonebook entries
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

function formatCurrentTime() {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'long',
  };

  const formattedTime = new Date().toLocaleString('en-US', options);

  return formattedTime;
}
// 3.2 show the time that the request was received
app.get('/info', (request, response) => {
  const time = new Date();

  let res = `<p>Phonebook has info for ${persons.length} people</p><p>${formatCurrentTime(time)}</p>`
  response.send(res)
})

// 3.3 displaying the information for a single phonebook entry.
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const selectedperson = persons.find(person => person.id === id)

  if (selectedperson) {
    response.json(selectedperson)
  } else {
    response.status(404).end()
  }
})

// 3.4 delete a single phonebook entry
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const selectedperson = persons.filter(person => person.id === id)
  if (selectedperson) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

// 3.5 new phonebook entries can be added
app.post('/api/persons', (request, response) => {
  const body = request.body
  // 3.6 Error handling
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  // Check if the 'name' already exists in the phonebook
  const nameExists = persons.some((person) => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    // Add other properties as needed
    id: generateId(),
  };

  persons = persons.concat(person)

  response.json(person)
})
// const server = http.createServer(app);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});