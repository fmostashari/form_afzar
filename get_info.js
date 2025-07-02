
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const fss = require('node:fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function(req, res) {
  app.use(express.static(path.join(__dirname, 'img')));
  res.sendFile(path.join(__dirname, 'img','test-final.html'));

});
app.get('/main.html', function(req, res) {
  app.use(express.static(path.join(__dirname, 'img')));
  res.sendFile(path.join(__dirname, 'img','main.html'));
  
});
app.get('/pre-get-info.html', function(req, res) {

  res.sendFile(path.join(__dirname, 'pre-get-info.html'));
  
});
app.get('/form.html', function(req, res) {

  res.sendFile(path.join(__dirname, 'form.html'));
  
});


app.get('/form2.html', function(req, res) {

  res.sendFile(path.join(__dirname, 'form2.html'));
  
});

app.use(bodyParser.json());

app.post('/info', (req, res) => {
  const formData = req.body;

  
  fs.appendFile('test.txt', JSON.stringify(formData) + '\n', (err) => {
    if (err) throw err;
    console.log('اطلاعات با موفقیت به فایل ذخیره شد');
  });


res.sendFile(path.join(__dirname, 'recive_info.html'));
});
app.get('/get-form-data', (req, res) => {
  
  fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('خطا در خواندن اطلاعات فرم:', err);
      res.send('خطای سرور');
    } else {
      const formDataArray = data.split('\n').filter(Boolean).map(JSON.parse);
      res.json(formDataArray);
    
    }
  });
});

app.listen(8000,()=>{
    console.log('app run on port 8000'); 
    });