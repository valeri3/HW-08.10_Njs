const queries = require('./queries');
var path = require('path');

module.exports = {
    // _______________
    //    Факультеты
    // _______________
    loadAddFacultyPage: function (req, res) {
        res.render(path.join(__dirname, '../pages/add_faculty'));
    },

    addFaculty: function (req, res) {
        const {name} = req.body;
        queries.insertFaculty(name, req, res);
    },
    // _______________
    //    Группы
    // _______________
    loadAddGroupPage: function (req, res) {
        res.render(path.join(__dirname, '../pages/add_group'));
    },

    addGroup: function (req, res) {
        const {name, Id_Faculty} = req.body;
        queries.insertGroup(name, Id_Faculty, req, res);
    },
    // _______________
    //    Студенты
    // _______________
    loadAddStudentPage: function (req, res) {
        res.render(path.join(__dirname, '../pages/add_student'));
    },

    addStudent: function (req, res) {
        const {firstName, lastName, id_group, term} = req.body;
        queries.insertStudent(firstName, lastName, id_group, term, req, res);
    }


};
