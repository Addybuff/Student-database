const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to use Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');

app.use('/', indexRouter);
app.use('/students', studentsRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const express = require('express');
const app = express();
const studentsRouter = require('./routes/students');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/students', studentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
