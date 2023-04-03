const express = require('express');
const router = express.Router();

// A simple mock student data array
const students = [
  { id: 1, name: 'John Doe', age: 18, class: 'Physics' },
  { id: 2, name: 'Jane Doe', age: 19, class: 'Math' },
];

// Route for listing all students
router.get('/', (req, res) => {
  res.send(students);
});

// Route for searching students
router.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const result = students.filter(student => student.name.toLowerCase().includes(query));
  res.send(result);
});

// Route for viewing student details
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  if (student) {
    res.send(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// Route for adding new students
router.post('/', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
    class: req.body.class,
  };
  students.push(newStudent);
  res.status(201).send(newStudent);
});

// Route for updating student information
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (student) {
    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    student.class = req.body.class || student.class;

    res.send(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// Route for deleting a student
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === studentId);

  if (index !== -1) {
    students.splice(index, 1);
    res.send({ message: 'Student deleted successfully' });
  } else {
    res.status(404).send('Student not found');
  }
});

module.exports = router;
