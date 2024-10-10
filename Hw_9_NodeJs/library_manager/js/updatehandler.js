const queries = require('./queries');
var path = require('path');

module.exports = {
    // _______________
    //    Факультеты
    // _______________
    loadEditFacultyPage: async function (req, res) {
        try {
            const {id} = req.params;
            const faculty = await queries.getFacultyById(id);
            if (faculty) {
                res.render(path.join(__dirname, '../pages/edit_faculty'), {faculty});
            } else {
                res.status(404).send('Faculty not found');
            }
        } catch (error) {
            console.error('Error loading faculty edit page:', error);
            res.status(500).send('Error loading faculty edit page');
        }
    },
    updateFaculty: async function (req, res) {
        try {
            const {id} = req.params;
            const {name} = req.body;
            await queries.updateFaculty(id, name);
            res.redirect('/faculties');
        } catch (error) {
            console.error('Error updating faculty:', error);
            res.status(500).send('Error updating faculty');
        }
    },
    // _______________
    //    Группы
    // _______________
    loadEditGroupPage: async function (req, res) {
        try {
            const {id} = req.params;
            const group = await queries.getGroupById(id);
            if (group) {
                res.render(path.join(__dirname, '../pages/edit_group'), {group});
            } else {
                res.status(404).send('Group not found');
            }
        } catch (error) {
            console.error('Error loading group edit page:', error);
            res.status(500).send('Error loading group edit page');
        }
    },

    updateGroup: async function (req, res) {
        try {
            const {id} = req.params;
            const {name, Id_Faculty} = req.body;
            await queries.updateGroup(id, name, Id_Faculty);
            res.redirect('/groups');
        } catch (error) {
            console.error('Error updating group:', error);
            res.status(500).send('Error updating group');
        }
    },
    // _______________
    //    Студенты
    // _______________
    loadEditStudentPage: async function (req, res) {
        try {
            const {id} = req.params;
            const student = await queries.getStudentById(id);
            if (student) {
                res.render(path.join(__dirname, '../pages/edit_student'), {student});
            } else {
                res.status(404).send('Student not found');
            }
        } catch (error) {
            console.error('Error loading student edit page:', error);
            res.status(500).send('Error loading student edit page');
        }
    },

    updateStudent: async function (req, res) {
        try {
            const {id} = req.params;
            const {firstName, lastName, id_group, term} = req.body;
            await queries.updateStudent(id, firstName, lastName, id_group, term);
            res.redirect('/students');
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(500).send('Error updating student');
        }
    }
};
