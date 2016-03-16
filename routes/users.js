var express = require('express');
var router = express.Router();

/*
 * GET athletes.
 */
router.get('/athletes', function (req, res) {
    console.log('getting athletes');
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
});

/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {
    var db = req.db;
    var query = db.query('INSERT INTO Athletes SET ?', req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    console.log(query.sql);
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    console.log(userToDelete);
    var query = db.query('DELETE FROM Athletes WHERE id = ?', userToDelete, function (err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    console.log(query.sql);
});

//router.put('/updateuser/:id', user.updateuser(db));

module.exports = router;
