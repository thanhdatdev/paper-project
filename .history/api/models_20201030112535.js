require('../config/database');
const AWS = require('aws-sdk');
var uuid = require('uuid');

let docClient = new AWS.DynamoDB.DocumentClient();

function getAllItem(res) {
    let params = {
        TableName: "Papers"
    };
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { param: data.Items });

        }
    });
}


function createItem(name_paper, name_author, isbn, sotrang, year, res) {
    let params = {
        TableName: 'Papers',
        Item: {
            name_paper: String(name_paper),
            name_author: String(name_author),
            isbn: String(isbn),
            sotrang: Number(sotrang),
            year: Number(year)
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Lỗi không thêm item, vui lòng cung cấp đủ các tham số' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Thêm thành công',
                book: {
                    name_paper: params.Item.name_paper,
                    name_author: params.Item.name_author,
                    isbn: params.Item.isbn,
                    sotrang: params.Item.sotrang,
                    year: params.Item.year
                }
            }));
        }
    });
}

function updateItem(id, name, birthday, avatar, res) {
    let params = {
        TableName: 'Papers',
        Key: {
            "id_student": String(id),
            "name_student": String(name)
        },
        UpdateExpression: "set #b = :birthday_student, #a = :avatar",
        ExpressionAttributeNames: {
            '#b': 'birthday_student',
            '#a': 'avatar'
        },
        ExpressionAttributeValues: {
            ':birthday_student': String(birthday),
            ':avatar': String(avatar)
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Lỗi không thể update item, vui lòng cung cấp đủ các tham số' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Sửa thành công',
                change: data.Attributes
            }));
        }
    });
}

function deleteItem(id, name, res) {
    let params = {
        TableName: 'Papers',
        Key: {
            "id_student": String(id),
            "name_student": String(name)
        }
    };

    docClient.delete(params, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Lỗi không thể delele item, vui lòng cung cấp đủ các tham số' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Xóa thành công',
                student: {
                    id_student: id_student,
                    name_student: name_student
                }
            }));
        }
    });
}

module.exports = {
    getAllItem: getAllItem,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
};