const express = require('express');
const res = require('express/lib/response');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello form the Middleware!');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS:
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  //   if (id > tours.length) {
  if (!tour) {
    return res.status(400).json({
      status: 'Fail',
      message: "This Tour doesn't exist in database!",
    });
  }
  res.status(200).json({
    status: 'Success',
    results: tour.length,
    data: {
      tour,
    },
  });
};

const EditTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'Fail',
      message: "This Tour doesn't exist in database!",
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      message: '<Updated tour here...>',
    },
  });
};

const DeleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'Fail',
      message: "This Tour doesn't exist in database!",
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const CreateTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getAllUsers = () => {
  res.json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = () => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const getUser = () => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const deleteUser = () => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = () => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', CreateTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', EditTour);
// app.delete('/api/v1/tours/:id', DeleteTour);

app.route('/api/v1/tours').get(getAllTours).post(CreateTour);

app.route('/api/v1/tours/:id').get(getTour).patch(EditTour).delete(DeleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).post(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
