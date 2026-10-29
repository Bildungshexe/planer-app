# Texterkennung (lokal)

Für „Klassenliste per Foto“. Alles läuft im Browser auf dem Gerät, das Foto wird nirgendwohin gesendet.

- `tesseract.min.js`, `worker.min.js`: tesseract.js 6.0.1 (Apache-2.0)
- `core/`: tesseract.js-core 6.1.2, nur LSTM-Varianten mit und ohne SIMD (Apache-2.0)
- `lang/deu.traineddata.gz`: deutsches Sprachmodell aus @tesseract.js-data/deu 1.0.0 (4.0.0_best_int)
