const mssql = require('mssql');
const connection = require('./config');

module.exports = {
    // _______________
    //    Факультеты
    // _______________
    // Получение всех факультетов
    getAllFaculties: async function (req, res) {
        try {
            const pool = await connection;
            const result = await pool.request().query('SELECT * FROM Faculties');
            res.render('faculties', {faculties: result.recordset});
        } catch (error) {
            console.error('Error fetching faculties:', error);
            res.status(500).send('Error fetching faculties');
        }
    },
    // Получение факультета по ID
    getFacultyById: async function (id) {
        try {
            const pool = await connection;
            const result = await pool.request()
                .input('Id', mssql.Int, id)
                .query('SELECT * FROM Faculties WHERE Id = @Id');
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching faculty by ID:', error);
            throw error;
        }
    },
    // Вставка факультета с транзакцией
    insertFaculty: async function (name, req, res) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Name', mssql.NVarChar(20), name)
                .query('INSERT INTO Faculties (Name) VALUES (@Name)');
            await transaction.commit();
            res.redirect('/faculties');
        } catch (error) {
            console.error('Transaction error (insertFaculty):', error);
            await transaction.rollback();
            res.status(500).send('Error adding faculty');
        }
    },
    // Обновление факультета с транзакцией
    updateFaculty: async function (id, name) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Id', mssql.Int, id)
                .input('Name', mssql.NVarChar(20), name)
                .query('UPDATE Faculties SET Name = @Name WHERE Id = @Id');
            await transaction.commit();
        } catch (error) {
            console.error('Transaction error (updateFaculty):', error);
            await transaction.rollback();
            throw error;
        }
    },
    // Удаление факультета с транзакцией
    deleteFaculty: async function (id) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Id', mssql.Int, id)
                .query('DELETE FROM Faculties WHERE Id = @Id');
            await transaction.commit();
        } catch (error) {
            console.error('Transaction error (deleteFaculty):', error);
            await transaction.rollback();
            throw error;
        }
    },
    // _______________
    //    Группы
    // _______________
    // Получение всех групп
    getAllGroups: async function (req, res) {
        try {
            const pool = await connection;
            const result = await pool.request().query('SELECT * FROM Groups');
            res.render('groups', {groups: result.recordset});
        } catch (error) {
            console.error('Error fetching groups:', error);
            res.status(500).send('Error fetching groups');
        }
    },
    // Получение группы по ID
    getGroupById: async function (id) {
        try {
            const pool = await connection;
            const result = await pool.request()
                .input('Id', mssql.Int, id)
                .query('SELECT * FROM Groups WHERE Id = @Id');
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching group by ID:', error);
            throw error;
        }
    },
    // Вставка группы с транзакцией
    insertGroup: async function (name, Id_Faculty, req, res) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Name', mssql.NVarChar(10), name)
                .input('Id_Faculty', mssql.Int, Id_Faculty)
                .query('INSERT INTO Groups (Name, Id_Faculty) VALUES (@Name, @Id_Faculty)');
            await transaction.commit();
            res.redirect('/groups');
        } catch (error) {
            console.error('Transaction error (insertGroup):', error);
            await transaction.rollback();
            res.status(500).send('Error adding group');
        }
    },
    // Обновление группы с транзакцией
    updateGroup: async function (id, name, Id_Faculty) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Id', mssql.Int, id)
                .input('Name', mssql.NVarChar(10), name)
                .input('Id_Faculty', mssql.Int, Id_Faculty)
                .query('UPDATE Groups SET Name = @Name, Id_Faculty = @Id_Faculty WHERE Id = @Id');
            await transaction.commit();
        } catch (error) {
            console.error('Transaction error (updateGroup):', error);
            await transaction.rollback();
            throw error;
        }
    },
    // Удаление группы с транзакцией
    deleteGroup: async function (id) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Id', mssql.Int, id)
                .query('DELETE FROM Groups WHERE Id = @Id');
            await transaction.commit();
        } catch (error) {
            console.error('Transaction error (deleteGroup):', error);
            await transaction.rollback();
            throw error;
        }
    },
    // _______________
    //    Студенты
    // _______________
    // Получение всех студентов
    getAllStudents: async function (req, res) {
        try {
            const pool = await connection;
            const result = await pool.request().query('SELECT * FROM Students');
            res.render('students', {students: result.recordset});
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).send('Error fetching students');
        }
    },
    // Получение студента по ID
    getStudentById: async function (id) {
        try {
            const pool = await connection;
            const result = await pool.request()
                .input('Id', mssql.Int, id)
                .query('SELECT * FROM Students WHERE Id = @Id');
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching student by ID:', error);
            throw error;
        }
    },
    // Вставка студента с транзакцией
    insertStudent: async function (firstName, lastName, id_group, term, req, res) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('FirstName', mssql.NVarChar(50), firstName)
                .input('LastName', mssql.NVarChar(50), lastName)
                .input('Id_Group', mssql.Int, id_group)
                .input('Term', mssql.Int, term)
                .query('INSERT INTO Students (FirstName, LastName, Id_Group, Term) VALUES (@FirstName, @LastName, @Id_Group, @Term)');
            await transaction.commit();
            res.redirect('/students');
        } catch (error) {
            console.error('Transaction error (insertStudent):', error);
            await transaction.rollback();
            res.status(500).send('Error adding student');
        }
    },
    // Обновление студента с транзакцией
    updateStudent: async function (id, firstName, lastName, id_group, term) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Id', mssql.Int, id)
                .input('FirstName', mssql.NVarChar(50), firstName)
                .input('LastName', mssql.NVarChar(50), lastName)
                .input('Id_Group', mssql.Int, id_group)
                .input('Term', mssql.Int, term)
                .query('UPDATE Students SET FirstName = @FirstName, LastName = @LastName, Id_Group = @Id_Group, Term = @Term WHERE Id = @Id');
            await transaction.commit();
        } catch (error) {
            console.error('Transaction error (updateStudent):', error);
            await transaction.rollback();
            throw error;
        }
    },
    // Удаление студента с транзакцией
    deleteStudent: async function (id) {
        const transaction = new mssql.Transaction(connection);
        try {
            await transaction.begin();
            const request = new mssql.Request(transaction);
            await request.input('Id', mssql.Int, id)
                .query('DELETE FROM Students WHERE Id = @Id');
            await transaction.commit();
        } catch (error) {
            console.error('Transaction error (deleteStudent):', error);
            await transaction.rollback();
            throw error;
        }
    }
};
