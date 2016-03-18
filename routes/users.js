var express = require('express');
var router = express.Router();

router.get('/athletes', getAthletes);
router.post('/adduser', addUser);
router.delete('/deleteuser/:id', deleteUser);
router.put('/updateuser/:id', updateUser);

module.exports = router;

function getAthletes (req, res) {
    var db = req.db;
    var strQuery = 'SELECT * FROM Athletes';
    db.query(strQuery, function (err, rows) {
        if (err) {
            throw err;
        } else {
            console.log(rows);
            res.json(rows);
        }
    });
}

function addUser (req, res) {
    var db = req.db;
    db.query('INSERT INTO Athletes SET ?', req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
}

function deleteUser (req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    console.log(userToDelete);
    db.query('DELETE FROM AthleteSession WHERE athleteId = ?', userToDelete, function (err) {
        if (err) throw err;
        db.query('DELETE FROM Athletes WHERE id = ?', userToDelete, function (err1) {
            res.send(
                (err1 === null) ? { msg: '' } : { msg: err1 }
            );
        });
    });
}

function updateUser(req, res, next) {
    var db = req.db;
    var userToUpdate = req.params.id;
    var data = req.body;
    
    db.query('UPDATE Athletes SET ? WHERE id = ?', [data, userToUpdate], function (err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
}