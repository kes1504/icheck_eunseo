module.exports = function(app, conn, upload) {
    var express = require('express');
    var router = express.Router();

    router.get('/', (req, res) => {
      res.render('mypage/mypage', {});
    });

    return router;
};