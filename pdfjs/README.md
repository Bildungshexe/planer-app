# PDF-Leser (lokal)

Für „Aufgaben hochladen“ im Reiter Schriftlich: liest Aufgaben und BE aus einem PDF. Alles läuft auf dem Gerät.

- `pdf.min.mjs`, `pdf.worker.min.mjs`: pdfjs-dist 4.10.38, „legacy“-Ausgabe (Apache-2.0), unverändert aus dem npm-Paket
  (Prüfsumme des Pakets: sha512-/Y3fcFrXEAsMjJXeL9J8+ZG9U01LbuWaYypvDW2ycW1jL269L3js3DVBjDJ0Up9Np1uqDXsDrRihHANhZOlwdQ==)
- `laden.mjs`: bindet den Leser ein; `isEvalSupported` wird beim Öffnen ausgeschaltet.
