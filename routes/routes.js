const config = require('../config');
let students = require('../students');

const appRouter = (app) => {
    // GET ALL STUDENTS
    app.get('/students', (req, res) => {
        console.log('Get all students');

        if(students && students.length) {
            res.send({
                status: config.STATUS.OK,
                message: students,
            });
        } else {
            res.send({
                status: config.STATUS.ERROR,
                message: 'Could not find any student',
            });
        }   
    });

    // GET STUDENT DETAILS
    app.get('/students/:id', (req, res) => {
        let student = null;
        console.log('Get student', req.params.id);

        if(students && students.length) {
            student = students.find((student) => ('' + student.id) === req.params.id);
        }
        if(student) {
            res.send({
                status: config.STATUS.OK,
                message: student,
            });
        } else {
            res.send({
                status: config.STATUS.ERROR,
                message: `Could not find student with id: ${req.params.id}`,
            });
        }   
    });

    // UPDATE STUDENT
    app.put('/students/:id', (req, res) => {
        let student = null;
        console.log('update student', req.body);

        if(students && students.length) {
            student = students.find((student) => ('' + student.id) === req.params.id);
        }

        if(student) {
            // students[req.params.id] = req.body;
            students = students.map((s) => {
                return ('' + s.id) === req.params.id ? req.body : s;
            })

            res.send({
                status: config.STATUS.OK,
                message: req.body,
            });
        } else {
            res.send({
                status: config.STATUS.ERROR,
                message: 'Could not find student for update',
            });
        }
    });
    
    // REMOVE STUDENT
    app.delete('/students/:id', (req, res) => {
        console.log('Remove student', req.params.id);
        students = students.filter((student) => ('' + student.id) !== req.params.id);

        res.send({
            status: config.STATUS.OK,
            message: 'Student removed',
        });
    });

    // ADD STUDENT
    app.post('/students/add', (req, res) => {
        const maxIndex = Math.max.apply(Math,students.map((o) => o.id));
        console.log('Add student', req.body, maxIndex);
        let student = req.body;
        student.id = maxIndex + 1;

        students.push(student);

        if(students[students.length - 1] === student) {
            res.send({
                status: config.STATUS.OK,
                message: student,
            });
        } else {
            res.send({
                status: config.STATUS.ERROR,
                message: 'Could not add student',
            });
        }
    });
}

module.exports = appRouter;