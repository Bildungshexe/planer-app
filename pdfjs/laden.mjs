/* Lädt den PDF-Leser (pdf.js, Apache-2.0) und meldet ihn der Seite. Nur Textauslesen, keine Skripte aus PDFs. */
import * as pdfjsLib from './pdf.min.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('./pdf.worker.min.mjs', import.meta.url).href;
window.pdfjsLib = pdfjsLib;
window.dispatchEvent(new Event('pdfjs-bereit'));
