'use strict';

const alfy = require('alfy');
const qr = require('qr-image');
const fs = require('fs');
const input = alfy.input;
let id = (new Date()).getTime();

function file(name) {
  return fs.createWriteStream(__dirname + '/img/' + name);
}

function delImg(path) {
  let files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach((file,index)=>{
      var curPath = path + "/" + file;
      fs.unlinkSync(curPath);
    });
  }
};

delImg(__dirname + '/img/');

function output() {
  let qrcode = qr.image(input, { type: 'png', parse_url: false, margin: 1}).pipe(file(id + '.png'));

  qrcode.on('finish', () => {
    alfy.output([{
      type: 'file',
      title: input,
      arg: input,
      "icon": {
        "path":__dirname + '/img/' + id + ".png"
      }
    }]);
  });
  return qrcode;
}

output();
