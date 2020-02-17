var fs = require("fs");
var mysql = require('mysql2/promise');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const args = process.argv;

var conn = mysql.createPool({
    host: 'localhost',
    user: args[0],
    password: args[1],
    database: 'SCOUTING_DATA'
});

app.use(express.static('./src'));

app.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.sendFile(__dirname + '/src/index.html');
});

app.get('/admin', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.sendFile(__dirname + '/src/admin/index.html');
});

io.on('connection', function (socket) {
    console.log("connected");
    socket.on('receive', (data) => {
        console.log(data)
    });
    socket.on('upload', async (columns) => {
        await conn.execute("DROP TABLE `SCOUTING_DATA`");
        await conn.execute("CREATE TABLE `SCOUTING_DATA`(`team_num` int default 0 null, `match_num` int default 0 null, alliance varchar(255) null);");
        let filtered = columns.filter(item => !["team_num", "match_num", "alliance"].includes(item.id));
        const types = {
            "number": "int",
            "text": "varchar(255)",
            "opts": "varchar(255)"
        };
        for (let item of filtered) {
            await conn.execute("ALTER TABLE `SCOUTING_DATA` ADD COLUMN `" + item.id + "` " + types[item.type]);
        }
    });
    socket.on("get", async () => {
        let results = (await conn.execute("SELECT * FROM SCOUTING_DATA"))[0];
        socket.emit("catch", results)
    });
    socket.on("clear", () => {
        conn.execute("DELETE FROM SCOUTING_DATA;");
    });
});
server.listen(80);