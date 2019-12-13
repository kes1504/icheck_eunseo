module.exports = function(app, conn, upload) {
    var express = require('express');
    var router = express.Router();

  
  router.get('/', (req, res) => {
    var kid= req.params.id;
    var kidssql = "SELECT * FROM kids ";

    conn.query(kidssql, [kid], function(err, kids, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);
      } else {
        res.render('kids/kids', {kids: kids});
      }
    });
  });



   /*KIDS 데이터 DB INSERT*/
  router.post('/', upload.single('upload'), (req, res) => {
    var name = req.body.name;
    var clas = req.body.clas;
    var upload = req.file.filename;
    
    var sql = 'INSERT INTO kids (`name`, `clas`,`upload`) VALUES(?, ?, ?)';
    conn.query(sql, [name, clas, upload], function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);
      } else {
        res.redirect('/kids/');
      }
    });
  });

/*댓글 DELETE DB row*/
router.post('/:kid', (req, res) => {
  var kid = req.params.kid;
  var sql = 'DELETE FROM kids WHERE kid = ?';
  conn.query(sql, [kid], function(err, kids, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error: ' + err);
    } else {
      //console.log(sql);
      //console.log(kid);
      res.redirect('/kids/');
    }
  });
});


return router;
};