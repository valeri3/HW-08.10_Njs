var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var displayHandler = require('./js/displayhandler');
var insertHandler = require('./js/inserthandler');
var updateHandler = require('./js/updatehandler');
var deleteHandler = require('./js/deletehandler');

var port = 8080;

// Установка генератора шаблонов
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

// Подгрузка статических файлов из папки pages/css
app.use('/static', express.static(path.join(__dirname, 'pages', 'css')));


app.get('/', (req, res) => {
    res.render('index');
});

// Middleware для обработки данных в формате JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Маршруты для работы с факультетами
app.get('/faculties', displayHandler.displayFaculties);
app.get('/faculties/add', insertHandler.loadAddFacultyPage);
app.post('/faculties/add', insertHandler.addFaculty);
app.get('/faculties/edit/:id', updateHandler.loadEditFacultyPage);
app.post('/faculties/edit/:id', updateHandler.updateFaculty);
app.get('/faculties/delete/:id', deleteHandler.deleteFaculty);

// Маршруты для работы с группами
app.get('/groups', displayHandler.displayGroups);
app.get('/groups/add', insertHandler.loadAddGroupPage);
app.post('/groups/add', insertHandler.addGroup);
app.get('/groups/edit/:id', updateHandler.loadEditGroupPage);
app.post('/groups/edit/:id', updateHandler.updateGroup);
app.get('/groups/delete/:id', deleteHandler.deleteGroup);

// Маршруты для работы со студентами
app.get('/students', displayHandler.displayStudents);
app.get('/students/add', insertHandler.loadAddStudentPage);
app.post('/students/add', insertHandler.addStudent);
app.get('/students/edit/:id', updateHandler.loadEditStudentPage);
app.post('/students/edit/:id', updateHandler.updateStudent);
app.get('/students/delete/:id', deleteHandler.deleteStudent);


// Обработка ошибок
app.use(function (err, req, res, next) {
    if (err) console.log(err.stack);
    res.status(500).send('Oops... something went wrong');
});

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
