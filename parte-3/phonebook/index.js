const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

morgan.token("body", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const nameExists = (name) => {
  const person = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  if (person) {
    return true;
  }

  return false;
};

app.get("/", (request, response) => {
  response.send("<h1>Persons Phonebook API</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => (person.id = id));

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date(
              Date.now()
            ).toUTCString()} (Eastern European Standard Time)</p>
        `);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: {
        message: "name field is missing",
        statusCode: 400,
      },
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: {
        message: "number field is missing",
        statusCode: 400,
      },
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  if (nameExists(body.name)) {
    return response.status(400).json({
      error: {
        message: "name already exist",
        statusCode: 400,
      },
    });
  } else {
    persons = persons.concat(person);

    response.json(person);
  }
});

app.delete("/api/delete/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
