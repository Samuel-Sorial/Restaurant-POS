'use strict';
const nodeHtmlToImage = require('node-html-to-image');
const ejs = require('ejs');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
var device;
var printer;
function connectPrinter() {
  try {
    device = new escpos.USB('0x0483', '0x070B');
    printer = new escpos.Printer(device);
  } catch (error) {
    console.log(error);
  }
}

async function loadLogo() {
  return new Promise((resolve) => {
    escpos.Image.load('assets/image.png', (result) => {
      resolve(result);
    });
  });
}

connectPrinter();
const LOGO = loadLogo();

async function renderInvoice(data) {
  return nodeHtmlToImage({
    // output: 'o.png',
    html: await ejs.renderFile('assets/invoice.ejs', data, null),
    encoding: 'base64',
    transparent: true,
  });
}

async function main(data) {
  try {
    let htm = await renderInvoice(data);
    let invoice = 'data:image/png;base64,' + htm;

    let logo = await LOGO;
    escpos.Image.load(invoice, function (inv) {
      if (!device) {
        connectPrinter();
        return false;
      }
      try {
        device.open(function (err) {
          if (err) {
            throw new Error(err);
          }
          printer.raster(logo);
          printer.raster(inv);
          printer.close();
        });
      } catch (error) {
        connectPrinter();
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (!device) {
      connectPrinter();
      return false;
    }
    device.close();
  }
}
module.exports = main;
