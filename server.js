var fs = require("fs");
var mysql = require('mysql2/promise');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var conn = mysql.createPool({
    host: '169.254.55.30',
    user: "5530",
    password: "larry5530",
    database: 'SCOUTING_DATA'
});

app.use(express.static(__dirname + '/content'));

app.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.sendFile(__dirname + '/content/index.html');
});

io.on('connection', function (socket) {
    console.log("connected");
    socket.on('submit', async (data, callback) => {
        try {
            let titles = "(`" + Object.keys(data).join("`, `") + "`)";
            let values = "('" + Object.values(data).join("', '") + "')";
            await conn.query("INSERT INTO `SCOUTING_BLUE` " + titles + "  VALUES " + values);
            callback();
        } catch (err) {
            callback(err);
        }
    });
    socket.on('upload', async (columns) => {
        try {
            await conn.execute("DROP TABLE `SCOUTING_DATA`");
            await conn.execute("DROP TABLE `SCOUTING_BLUE`");
        } catch (err) {}
        await conn.execute("CREATE TABLE `SCOUTING_BLUE`(`id` MEDIUMINT NOT NULL AUTO_INCREMENT, `team` int default 0 null, `match` int default 0 null, alliance varchar(255) null, primary key (id));");
        let filtered = columns.filter(item => !["team", "match", "alliance"].includes(item.id));
        const types = {
            "number": "int",
            "text": "varchar(255)",
            "toggle": "varchar(255)"
        };
        for (let item of filtered) {
            await conn.execute("ALTER TABLE `SCOUTING_BLUE` ADD COLUMN `" + item.id + "` " + types[item.type]);
        }
    });
});
server.listen(80);