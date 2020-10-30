const express = require('express');
const router = express.Router();
const DATA = require('./aws');

//Lấy danh sách tất cả các cuốn sách
router.get('/students', (req, res) => {
    let y1 = req.query.y1;
    let y2 = req.query.y2;
    let id_student = req.query.id_student;
    let name_student = req.query.name_student;
    if (y1 && y2) {
        if (id_student) {

        } else {

        }
    } else if (id_student || name_student) {
        DATA.search(name_student, id_student, res);
    } else {
        DATA.getAllItem(res);
    }
});

//Tạo một cuốn sách
router.post('/students', ((req, res) => {
    let id = req.body.id_student;
    let name = req.body.name_student;
    let birthday = req.body.birthday_student;
    let avatar = req.body.avatar;
    DATA.createItem(id, name, birthday, avatar, res);
}));

//Update sách
router.put('/students/:id_student/:name_student', ((req, res) => {
    let id = req.params.id_student;
    let name = req.params.name_student;
    let birthday = req.body.birthday_student;
    let avatar = req.body.avatar;
    DATA.updateItem(id, name, birthday, avatar, res);
}));

router.delete('/students/:id_student', ((req, res) => {
    let id = req.params.id_student;
    DATA.deleteItem(id, "", res);
}));

module.exports = router;