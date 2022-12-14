var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "expenses"
});

const connection = () => {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

function insertTransaction(transaction, callback) {
    let date = new Date()
    let time = date.toISOString().slice(0, 19).replace('T', ' ');
    var sql = `INSERT INTO transactions(user_id,name,value,created_at) VALUES(${transaction['userId']},'${transaction['name']}',${transaction['value']},'${time}')`
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("new record is inserted")
        callback(result)
    })
}

function getTransactions(id, callback) {
    var sql = `SELECT * FROM transactions WHERE user_id  = ${id}`;
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("records fetched")
        callback(result)
    })
}

function getBalance(id, callback){
    var sql = `SELECT SUM(value) FROM transactions WHERE user_id  = ${id}`;
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("records fetched")
        callback(result)
    })
}

function getOutNum(id, callback) {
    var sql = `SELECT COUNT(${id}) FROM outcoming`;
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        callback(result)
    })
}

function getInNum(id, callback) {
    var sql = `SELECT COUNT(${id}) FROM incoming`;
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        callback(result)
    })
}

function getTransactionsCount(id, callback) {

    let sql = `SELECT COUNT(user_id)  FROM incoming WHERE user_id =${id} UNION ` +
        `SELECT COUNT(user_id)  FROM outcoming WHERE user_id =${id} `
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        callback({
            'income': result[0]['COUNT(user_id)'],
            'outcome': result[1]['COUNT(user_id)']
        })
    })

}

function getOutcomingTransactions(id, callback) {
    var sql = `SELECT * FROM outcoming WHERE user_id = ${id}`

}
function getIncomingTransactions(id, callback) {
    var sql = `SELECT * FROM incoming WHERE user_id = ${id}`
}

function getUserId(email, callback) {
    var sql = `SELECT id FROM users WHERE email = '${email}'`
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        if (result.length == 1) {
            callback(result[0]['id'])
        }

    })
}


function insertNewUser(user) {
    let date = new Date()
    let time = date.toISOString().slice(0, 19).replace('T', ' ');
    var sql = `INSERT INTO users(name,email,_password,created_at) VALUES('${user['name']}','${user['email']}','${user['password']}','${time}')`
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log('new user inserted!')
    })
}


const findUser = (username, callback) => {
    var sql = `SELECT * FROM users WHERE email = '${username}'`
    con.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log(result)
        callback(result[0])
    })
}

function deleteTransaction(id) {
    let sql = `DELETE FROM`

}


function updateTransaction(rec) {

}

////////////////////////////////////////////////////////////////////////////////////////////

//connection()

/*insertTransaction({
    'userId': 1,
    'name': 'Test',
    'value': 1000,
})*/

/*insertNewUser({
    'name':'Alaa',
    'email':"alaa@test.com",
    'password':'12345678',
 
})*/

/*getUserId('alaa@test.com',(res)=>{
    console.log(res)
})*/


/*getTransactions(1,(result)=>{
    console.log(result);
})*/

/*getInNum(1,(result)=>{
    console.log(result)
})

getOutNum(1,(result)=>{
    console.log(result)
})*/

/*getTransactionsCount(1, (result) => {
    console.log(result)
})
*/

/*connection()
getBalance(1,(result)=>{
    console.log(result[0]['SUM(value)']);
})*/

////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    'connection': connection,
    'findUser': findUser,
    'getUserId': getUserId,
    'getTransactions': getTransactions,
    'insertNewUser': insertNewUser,
    'insertTransaction': insertTransaction,
    'getInNum': getInNum,
    'getOutNum': getOutNum,
    'getTransactionsCount': getTransactionsCount,
    'getBalance':getBalance
}