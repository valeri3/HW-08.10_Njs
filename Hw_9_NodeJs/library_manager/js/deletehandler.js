const queries = require('./queries');

module.exports = {
    // _______________
    //    Факультеты
    // _______________
    deleteFaculty: async function (req, res) {
        try {
            const {id} = req.params;
            await queries.deleteFaculty(id);
            res.redirect('/faculties');
        } catch (error) {
            console.error('Error deleting faculty:', error);
            res.status(500).send('Error deleting faculty');
        }
    },
    // _______________
    //    Группы
    // _______________
    deleteGroup: async function (req, res) {
        try {
            const {id} = req.params;
            await queries.deleteGroup(id);
            res.redirect('/groups');
        } catch (error) {
            console.error('Error deleting group:', error);
            res.status(500).send('Error deleting group');
        }
    },
    // _______________
    //    Студенты
    // _______________
    deleteStudent: async function (req, res) {
        try {
            const {id} = req.params;
            await queries.deleteStudent(id);
            res.redirect('/students');
        } catch (error) {
            console.error('Error deleting student:', error);
            res.status(500).send('Error deleting student');
        }
    }


};
