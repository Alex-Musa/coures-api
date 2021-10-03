const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    // Home
    res.send('Hello World');
})

app.get('/api/courses', (req, res) => {
    // Get all info
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    // Get info by id
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
})


app.post('/api/courses', (req, res) => {
    // Input Validation
    if(!req.body.name || req.body.name.length < 3){
        // 400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
    }
    // Post
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course);
})


app.put('/api/courses/:id', (req, res) => {
    // Look up the course, if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // Validate
    // if invalid, return 404 - Bad requrest
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
    }
    // Update courses
    course.name = req.body.name;
    // Return the updated course to clint
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course, if not existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))