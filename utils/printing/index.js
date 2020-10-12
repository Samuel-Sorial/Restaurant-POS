'use strict';
const nodeHtmlToImage = require('node-html-to-image');
const ejs = require('ejs');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
var device;
var printer;
async function connectPrinter() {
  try {
    device = await new escpos.USB('0x0483', '0x070B');
    printer = await new escpos.Printer(device);
  } catch (error) {
    console.log(error);
  }
}

async function loadLogo() {
  return new Promise((resolve) => {
    escpos.Image.load('./utils/printing/assets/image.png', (result) => {
      resolve(result);
    });
  });
}

connectPrinter();
const LOGO = loadLogo();

async function renderInvoice(data) {
  return nodeHtmlToImage({
    // output: 'o.png',
    html: await ejs.renderFile(
      './utils/printing/assets/invoice.ejs',
      data,
      null
    ),
    encoding: 'base64',
    transparent: true,
  });
}

async function main(data,ttl=1) {
  console.log('Printinnnng');
  try {
    let htm = await renderInvoice(data);
    let invoice = 'data:image/png;base64,' + htm;

    let logo = await LOGO;
    escpos.Image.load(invoice, async function (inv) {
      if (!device) {
console.log('device not');
        await connectPrinter();
	if(ttl>0) main(data,ttl-1);
        return false;
      }
      try {
        device.open(async function (err) {
          if (err) {
            throw new Error(err);
          }
          printer.raster(logo);
          printer.raster(inv);
          printer.close();
        });
      } catch (error) {
console.log(error);
        await connectPrinter();
	if(ttl>0) main(data,ttl-1);
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (!device) {
      return false;
    }
    device.close();
  }
}
module.exports = main;
