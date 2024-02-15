const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5'); // to create hash for stored passwords, avoiding to save plain text passwords.

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        // cannot open the database
        console.error(err.message);
        throw err;
    }else{
        console.log('Connected to the SQLite Database!');
        db.run(`CREATE TABLE user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
        )`, (err) => {
            if(err){
                //
            }else{
                // Table is already creted, just add some rows
                var insert = 'INSERT INTO user(name,email,password) VALUES(?,?,?)'
                db.run(insert,["abhijith","a.chowdary@zensar.com",md5("Abhijith@143")])
                db.run(insert,["leepika","l.chowdary@zensar.com",md5("Leepika@143")])
            }
        });
    }
})

module.exports = db;