const express = require('express');
const router = express.Router();
const DATA = require('../api/models');

//Lấy danh sách tất cả các cuốn sách
router.get('/papers', (req, res) => {
    DATA.getAllItem(res);
});

//Tạo một cuốn sách
router.post('/papers/new', ((req, res) => {
    res.render('/papers/new', title: 'New Paper');
    let name_paper = req.body.name_paper;
    let name_author = req.body.name_author;
    let isbn = req.body.isbn;
    let sotrang = req.body.sotrang;
    let year = req.body.year;
    DATA.createItem(name_paper, name_author, isbn, sotrang, year, res);
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