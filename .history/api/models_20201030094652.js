require('../config/database');
const AWS = require('aws-sdk');
var uuid = require('uuid');

let docClient = new AWS.DynamoDB.DocumentClient();

function getAllItem(res) {
    let params = {
        TableName: "Students"
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Lỗi không thể truy xuất dữ liệu' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            if (data.Items.length === 0) {
                res.end(JSON.stringify({ message: 'Table rỗng, chưa có item nào được thêm' }));
            }
            res.end(JSON.stringify(data.Items));
        }
    });
}


function createItem(id, name, birthday, avatar, res) {
    let params = {
        TableName: 'Students',
        Item: {
            id: uuid.v1(),
            id_student: String(id),
            name_student: String(name),
            birthday_student: Number(birthday),
            avatar: String(avatar)
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
                    id: params.Item.id,
                    id_student: params.Item.id_student,
                    name_student: params.Item.name_student,
                    birthday_student: params.Item.birthday_student,
                    avatar: params.Item.avatar
                }
            }));
        }
    });
}

function updateItem(id, name, birthday, avatar, res) {
    let params = {
        TableName: 'Students',
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
        TableName: 'Students',
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