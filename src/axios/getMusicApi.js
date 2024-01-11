const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const app = express();

const port = 6067;
let id = '';

// 跨域
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 解析请求体数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3366',
    database: 'python'
});

connection.connect((err) => {
    if (err) {
        console.error('无法连接到数据库:', err);
        return;
    }
    console.log('连接成功!!!');
});

// 获取歌曲全部数据
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM musiclists';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('执行查询时出错:', err);
            res.status(500).json({error: '执行查询时出错!!!'});
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

// 获取当前播放歌曲全部数据
app.get('/musicLists', (req, res) => {
    let param = req.query;
    const decode = jwt.decode(param.token);

    const sql = "select * from allMusicLists where playLists = ? and account = '?'";
    const values = [param.name, decode.thisAccount];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('执行查询时出错:', err);
            res.status(500).json({error: '执行查询时出错!!!'});
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});


// 获取所有音乐数据---用于获取歌单信息
app.get('/getAllMusicLists', (req, res) => {
    let param = req.query;
    const decode = jwt.decode(param.token);

    const sql = "select * from allMusicLists where account = '?'";
    const values = [decode.thisAccount];
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('执行查询时出错:', err);
            res.status(500).json({error: '执行查询时出错!!!'});
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

// 修改昵称或简介
app.post('/changeInformation', (req, res) => {
    const data = req.query;
    // console.log(data);

    const sql = 'UPDATE userInformation SET nickname = ?, introduce = ?, gender = ? WHERE account = "?"';
    const values = [data.nickname, data.introduce, data.gender, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('插入失败', err);
            res.status(500).json({error: '执行插入时出错!!!'});
            return;
        }

        res.status(200).json({
            message: '数据插入成功',
            insertedId: result.insertId
        })
    })
});

// 验证密码
const validatePassword = (password, hashPassword) => password === hashPassword;

// 登录
app.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const sql = "select * from userInformation where account =" + data.account;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('执行查询时出错:', err);
                res.status(500).json({err: '执行查询时出错'});
                return;
            }
            if (results.length === 0) {
                return res.status(401).json({err: '账号或密码出错'});
            }
            const user = results[0];
            const password = data.password;
            // 验证密码
            const isPasswordValid = validatePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({err: '账号或密码出错'});
            }

            // 生成token
            const token = jwt.sign({
                // 设置token有效时间--24h
                exp: Math.floor((Date.now() / 1000) + 86400),
                thisAccount: user.account,
            }, data.account);
            res.json({token, user});
            // console.log(user);
            id = user.account;
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({err: '内部服务器错误!!!'});
    }
});

// 注册账号
app.post('/enroll', (req, res) => {
    const data = req.body;

    const sql1 = 'insert into userInformation (`password`, nickname, introduce, gender) values(?, ?, ?, ?)';
    const values1 = [data.password, data.nickname, data.introduce, data.gender];

    connection.query(sql1, values1, (err, result) => {
        if (err) {
            console.log('创建成功', err);
            res.status(500).json({err: '创建时出错!!!'});
            return;
        }

        res.status(200).json({
            message: '创建成功',
            generatedId: result.insertId //账号
        });
    });
});

// 有token登录
app.get('/haveToken', (req, res) => {
    const data = req.query.token;
    // 获取token的过期时间等参数
    const decode = jwt.decode(data);
    const nowDate = Date.now();

    const sql = "select * from userInformation where account = '?'";
    const values = [decode.thisAccount];

    if (Math.round(nowDate / 1000) >= decode.exp) {
        console.error('token过期:');
        res.status(10009).json({error: 'token过期!!!'});
    } else {
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('执行查询时出错:', err);
                res.status(500).json({error: '执行查询时出错!!!'});
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(results);
            id = decode.thisAccount;
        });
    }

});

app.listen(port, () => {
    console.log(`服务器在 ${port}端口上运行!!!`);
});