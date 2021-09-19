const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({ message: 'Hello from the Server Side!', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
      tour: tour,
    },
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
