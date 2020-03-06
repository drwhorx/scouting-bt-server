var fs = require("fs");
var mysql = require('mysql2/promise');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require(__dirname + "/src/js/data");
const args = process.argv;
var conn = mysql.createPool({
    host: 'localhost',
    user: args[2],
    password: args[3],
    database: 'SCOUTING_DATA'
});

app.use(express.static(__dirname + '/src'));

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
    socket.on('receive', async (data) => {
        let titles = "(`" + Object.keys(data).join("`, `") + "`)";
        let values = "('" + Object.values(data).join("', '") + "')";
        conn.query("INSERT INTO `SCOUTING_DATA` " + titles + "  VALUES " + values);
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
    socket.on('metadata', async (obj) => {
        await conn.execute("DROP TABLE `METADATA`");
        await conn.execute("CREATE TABLE `METADATA`(`column` varchar(255) null, `option` varchar(255) null)");
        for (let col of obj) {
            for (let opt of col.opts) {
                await conn.query("INSERT INTO `METADATA` (`column`, `option`) VALUES ('" + col.id + "', '" + opt + "')");
            }
        }
    });
    socket.on("get", async () => {
        let results = (await conn.execute("SELECT * FROM SCOUTING_DATA"))[0];
        if (results.length == 0) {
            let headers = (await conn.execute("SHOW COLUMNS FROM SCOUTING_DATA"))[0];
            results = {
                "headers": true,
                "values": headers
            }
        }
        socket.emit("catch", results);
    });
    socket.on("clear", () => {
        conn.execute("DELETE FROM SCOUTING_DATA;");
    });
    socket.on("save", async data => {
        await conn.execute("DELETE FROM SCOUTING_DATA;");
        for (let datum of data) {
            let titles = "(`" + Object.keys(datum).join("`, `") + "`)";
            let values = "('" + Object.values(datum).join("', '") + "')";
            conn.query("INSERT INTO `SCOUTING_DATA` " + titles + "  VALUES " + values);
        }
    });
});
server.listen(80);