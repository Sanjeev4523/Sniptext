
//import Tesseract from 'node_modules/tesseract.js';
//const Tesseract = require('tesseract.js');
//const { TesseractWorker } = Tesseract;
//import { TesseractWorker } from 'tesseract.js';
const Image = require('Image');
var Tesseract = require('tesseract.js');
//const worker = new TesseractWorker();
//const worker = new Tesseract();
let img = new Image();
img.src = 'D:\Projects\Sniptext\myImage.PNG'
Tesseract.recognize('Sniptext\myImage.PNG')
  .progress(progress => {
    console.log('progress', progress);
  }).then(result => {
    console.log('result', result);
  });
   //<script src='https://unpkg.com/tesseract.js@1.0.19/src/index.js'>