const queries = require('./queries');

module.exports = {
    // _______________
    //    Факультеты
    // _______________
    displayFaculties: function (req, res) {
        queries.getAllFaculties(req, res);
    },
    // _______________
    //    Группы
    // _______________
    displayGroups: function (req, res) {
        queries.getAllGroups(req, res);
    },
    // _______________
    //    Студенты
    // _______________
    displayStudents: function (req, res) {
        queries.getAllStudents(req, res);
    }
};
