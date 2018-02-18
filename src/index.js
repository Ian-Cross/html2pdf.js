import 'es6-promise/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Worker from './worker.js';
import './plugin/jspdf-plugin.js';

/**
 * Generate a PDF from an HTML element or string using html2canvas and jsPDF.
 *
 * @param {Element|string} source The source element or HTML string.
 * @param {Object=} opt An object of optional settings: 'margin', 'filename',
 *    'image' ('type' and 'quality'), and 'html2canvas' / 'jspdf', which are
 *    sent as settings to their corresponding functions.
 */
var html2pdf = function html2pdf(src, opt) {
  // Create a new worker with the given options.
  var worker = new html2pdf.Worker(opt);

  if (src) {
    // If src is specified, perform the traditional 'simple' operation.
    return worker.from(src).save();
  } else {
    // Otherwise, return the worker for new Promise-based operation.
    return worker;
  }
}
html2pdf.Worker = Worker;

var html2pdf = function(source, opt) {
  // Render the canvas and pass the result to makePDF.
  var onRendered = opt.html2canvas.onrendered || function() {};
  delete opt.html2canvas.onrendered;
  var done = function(canvas) {
    onRendered(canvas);
    document.body.removeChild(overlay);
    html2pdf.makePDF(canvas, pageSize, opt);
  };
  html2canvas(container, opt.html2canvas).then(done);
};

// Expose the html2pdf function.
export default html2pdf;
