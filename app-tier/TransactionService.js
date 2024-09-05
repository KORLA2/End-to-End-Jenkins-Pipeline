const dbcreds = require('./DbConfig');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: 3306,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});
 function addTransaction(amount,desc){
    var mysql = `INSERT INTO \`transactions\` (\`amount\`, \`description\`) VALUES ('${amount}','${desc}')`;
    con.query(mysql, function(err,result){
        if (err) {console.log(err); throw err;}
        console.log("Adding to the table should have worked");
    }) 
    return 200;
}

function getAllTransactions(callback) {
    var sql = "SELECT * FROM transactions";
    console.log("Executing SQL Query...");
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error executing query:", err);
            return callback(null, err); // Pass the error to the callback
        }
        console.log("Query executed successfully.");
        return callback(result);
    });
}

function findTransactionById(id,callback){
    var mysql = `SELECT * FROM transactions WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`retrieving transactions with id ${id}`);
        return(callback(result));
    }) 
}

function deleteAllTransactions(callback){
    var mysql = "DELETE FROM transactions";
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Deleting all transactions...");
        return(callback(result));
    }) 
}

function deleteTransactionById(id, callback){
    var mysql = `DELETE FROM transactions WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`Deleting transactions with id ${id}`);
        return(callback(result));
    }) 
}


module.exports = {addTransaction ,getAllTransactions, deleteAllTransactions, deleteAllTransactions, findTransactionById, deleteTransactionById};



// const sql = require('mssql');

// const config = {
//     user: dbcreds.DB_USER,
//     password: dbcreds.DB_PWD,
//     server: dbcreds.DB_HOST,  // Example: 'localhost'
//     database: dbcreds.DB_DATABASE,
//     options: {
//         encrypt: true, // Use true for Azure SQL, false for local SQL Server
//         trustServerCertificate: true // Use true for local development
//     }
// };

// const config = {
//     server: 'INHYNGKORLA01\\SQLEXPRESS',
    
//     database: 'webappdb',
//     options: {
//         trustServerCertificate: true ,// Required for self-signed certificates
//     },
//     authentication: {
//         type: 'ntlm',
//         options: {
//             domain: '',
//             userName: '', // Can leave empty for Windows Authentication
//             password: '' // Can leave empty for Windows Authentication
//         }
//     }
// };
// async function connectToDB() {
//     try {
       
//         const pool = await sql.connect(config);
//         return pool;
//     } catch (err) {
       
//         console.error('SQL Server connection error: ', err);
//         throw err;
//     }
// }

// async function addTransaction(amount, desc) {
//     const pool = await connectToDB();
//     const query = `INSERT INTO transactions (amount, description) VALUES (@amount, @desc)`;
//     await pool.request()
//         .input('amount', sql.Decimal(18, 2), amount)
//         .input('desc', sql.VarChar, desc)
//         .query(query);
//     console.log("Adding to the table should have worked");
//     return 200;
// }

// async function getAllTransactions(callback) {
//     const pool = await connectToDB();
//     const result = await pool.request().query("SELECT * FROM transactions");
//     console.log("Getting all transactions...");
//     callback(result.recordset);
// }

// async function findTransactionById(id, callback) {
//     const pool = await connectToDB();
//     const result = await pool.request()
//         .input('id', sql.Int, id)
//         .query("SELECT * FROM transactions WHERE id = @id");
//     console.log(`Retrieving transactions with id ${id}`);
//     callback(result.recordset);
// }

// async function deleteAllTransactions(callback) {
//     const pool = await connectToDB();
//     await pool.request().query("DELETE FROM transactions");
//     console.log("Deleting all transactions...");
//     callback();
// }

// async function deleteTransactionById(id, callback) {
//     const pool = await connectToDB();
//     await pool.request()
//         .input('id', sql.Int, id)
//         .query("DELETE FROM transactions WHERE id = @id");
//     console.log(`Deleting transactions with id ${id}`);
//     callback();
// }

// module.exports = { addTransaction, getAllTransactions, deleteAllTransactions, findTransactionById, deleteTransactionById };




