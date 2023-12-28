
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person.jsx')


// let persons = [
//   { 'id': 1, 'name': 'Arto Hellas', 'number': '040-123456' },
//   { 'id': 2, 'name': 'Ada Lovelace', 'number': '39-44-5323523' },
//   { 'id': 3, 'name': 'Dan Abramov', 'number': '12-43-234345' },
//   { 'id': 4, 'name': 'Mary Poppendieck', 'number': '39-23-6423122' }
// ]

const app = express()
app.use(cors())
// app.use(bodyParser.json());
app.use(express.json())
// 3.11 use production build frontend, the original phonebook in part2 is changed to vite
app.use(express.static('dist'))
// 3.7 use morgan
morgan.token('body', (req, res) => JSON.stringify(req.body));

// 3.8 Configure morgan so that it also shows the data sent in HTTP POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// 3.1 Node application that returns a hardcoded list of phonebook entries
// 3.13 Fetch data from database
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
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
  Person.countDocuments({})
    .then((personCount) => {
      const time = new Date();
      const res = `<p>Phonebook has info for ${personCount} people</p><p>${formatCurrentTime(time)}</p>`;
      response.send(res);
    })
    .catch(error => next(error));
  // const time = new Date();

  // let res = `<p>Phonebook has info for ${persons.length} people</p><p>${formatCurrentTime(time)}</p>`
  // response.send(res)
})

// 3.3 displaying the information for a single phonebook entry.
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

// 3.4 delete a single phonebook entry
// 3.15 deleting phonebook entries is reflected in the database
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

// 3.5 new phonebook entries can be added
// 3.14 t new numbers are saved to the database
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // 3.6 Error handling
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }
  const newperson = new Person({
    name: body.name,
    number: body.number,
  })
  // console.log(person)
  // Check if the 'name' already exists in the phonebook
  Person.findOne({ name: newperson.name }).then(nameExists => {
    // persons.some((person) => person.name === body.name);
    console.log(nameExists)
    if (nameExists != null) {
      return response.status(400).json({
        error: 'name must be unique',
      });
    } else {
      newperson.save().then(result => {
        console.log(`added ${newperson.name} number ${newperson.number} to phonebook`)
        response.json(newperson)
      })
    }
  }).catch(error => next(error))

})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const personId = request.params.id;

  // 3.6 Error handling
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  // 3.17 support put request
  Person.findById(personId)
    .then(existingPerson => {
      if (existingPerson) {
        existingPerson.number = body.number;

        existingPerson.save()
          .then(updatedPerson => {
            console.log(`Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`);
            response.json(updatedPerson);
          })
          .catch(error => next(error));
      } else {
        // If the person with the provided ID does not exist, create a new entry
        const newPerson = new Person({
          _id: personId, // Set the ID to the provided ID
          name: body.name,
          number: body.number,
        });

        newPerson.save()
          .then(result => {
            console.log(`Added ${newPerson.name} with number ${newPerson.number} to the phonebook`);
            response.json(newPerson);
          })
          .catch(error => next(error));
      }
    })
    .catch(error => next(error));
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

//3.16 Error handling of the application to a new error handler middleware.
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});