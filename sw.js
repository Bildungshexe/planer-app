/* Offline-Betrieb: zuerst aus dem Netz (immer die neueste Version), sonst aus dem Zwischenspeicher.
   Es werden nur die Programmdateien zwischengespeichert, nie Noten oder Planerdaten. */
var CACHE = 'lehrerplaner-v116';
var FILES = ['./', 'index.html', 'bewertung.html', 'vertretung.html', 'beratung.html', 'hilfe.html', 'handbuch.html', 'pdfjs/laden.mjs', 'pdfjs/pdf.min.mjs', 'pdfjs/pdf.worker.min.mjs', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png', 'wuerfel/erz_abend.png', 'wuerfel/erz_acht.png', 'wuerfel/erz_alien.png', 'wuerfel/erz_angst.png', 'wuerfel/erz_apfel.png', 'wuerfel/erz_bahnhof.png', 'wuerfel/erz_begeistert.png', 'wuerfel/erz_berg.png', 'wuerfel/erz_berge.png', 'wuerfel/erz_biene.png', 'wuerfel/erz_blitz.png', 'wuerfel/erz_bus.png', 'wuerfel/erz_drache.png', 'wuerfel/erz_drache2.png', 'wuerfel/erz_ei.png', 'wuerfel/erz_einhorn.png', 'wuerfel/erz_eiswelt.png', 'wuerfel/erz_fahrradunfall.png', 'wuerfel/erz_feuerwehr.png', 'wuerfel/erz_freizeitpark.png', 'wuerfel/erz_frosch.png', 'wuerfel/erz_frueh.png', 'wuerfel/erz_fussball.png', 'wuerfel/erz_galaxie.png', 'wuerfel/erz_gespenst.png', 'wuerfel/erz_hexe.png', 'wuerfel/erz_hoehle.png', 'wuerfel/erz_huette.png', 'wuerfel/erz_hund.png', 'wuerfel/erz_insel.png', 'wuerfel/erz_karte.png', 'wuerfel/erz_knall.png', 'wuerfel/erz_koenig.png', 'wuerfel/erz_kristallkugel.png', 'wuerfel/erz_lachen.png', 'wuerfel/erz_maedchen.png', 'wuerfel/erz_meer.png', 'wuerfel/erz_meerwesen.png', 'wuerfel/erz_mittags.png', 'wuerfel/erz_nachricht.png', 'wuerfel/erz_nacht.png', 'wuerfel/erz_park.png', 'wuerfel/erz_peinlich.png', 'wuerfel/erz_ring.png', 'wuerfel/erz_roboter.png', 'wuerfel/erz_sanduhr.png', 'wuerfel/erz_schloss.png', 'wuerfel/erz_schluessel.png', 'wuerfel/erz_schluessel2.png', 'wuerfel/erz_schulausflug.png', 'wuerfel/erz_schule.png', 'wuerfel/erz_schwimmbad.png', 'wuerfel/erz_stadion.png', 'wuerfel/erz_strand.png', 'wuerfel/erz_stromausfall.png', 'wuerfel/erz_supermarkt.png', 'wuerfel/erz_traurig.png', 'wuerfel/erz_ufo.png', 'wuerfel/erz_unwetter.png', 'wuerfel/erz_verlaufen.png', 'wuerfel/erz_vulkaninsel.png', 'wuerfel/erz_wald.png', 'wuerfel/erz_weltraum.png', 'wuerfel/erz_wochenende.png', 'wuerfel/erz_wolf.png', 'wuerfel/erz_wunsch.png', 'wuerfel/erz_wut.png', 'wuerfel/erz_zauberhut.png', 'wuerfel/erz_zauberstab.png', 'wuerfel/erz_zaubertrank.png', 'wuerfel/erz_zeltlager.png', 'wuerfel/erz_zirkus.png', 'wuerfel/sport_armkreisen.png', 'wuerfel/sport_ausfallschritt.png', 'wuerfel/sport_hampelmann.png', 'wuerfel/sport_kniebeuge.png', 'wuerfel/sport_rumpfdrehen.png', 'wuerfel/sport_skipping.png', 'wuerfel/stadt_alexandria.png', 'wuerfel/stadt_athenae.png', 'wuerfel/stadt_barcelona.png', 'wuerfel/stadt_belfast.png', 'wuerfel/stadt_bilbao.png', 'wuerfel/stadt_bordeaux.png', 'wuerfel/stadt_cardiff.png', 'wuerfel/stadt_carthago.png', 'wuerfel/stadt_chicago.png', 'wuerfel/stadt_edinburgh.png', 'wuerfel/stadt_granada.png', 'wuerfel/stadt_liverpool.png', 'wuerfel/stadt_london.png', 'wuerfel/stadt_losangeles.png', 'wuerfel/stadt_lyon.png', 'wuerfel/stadt_madrid.png', 'wuerfel/stadt_manchester.png', 'wuerfel/stadt_marseille.png', 'wuerfel/stadt_newyork.png', 'wuerfel/stadt_nice.png', 'wuerfel/stadt_ostia.png', 'wuerfel/stadt_paris.png', 'wuerfel/stadt_pompeii.png', 'wuerfel/stadt_roma.png', 'wuerfel/stadt_sanfrancisco.png', 'wuerfel/stadt_seattle.png', 'wuerfel/stadt_sevilla.png', 'wuerfel/stadt_strasbourg.png', 'wuerfel/stadt_valencia.png', 'wuerfel/stadt_washington.png', 'wuerfel/wetter_gewitter.png', 'wuerfel/wetter_regen.png', 'wuerfel/wetter_schnee.png', 'wuerfel/wetter_sonne.png', 'wuerfel/wetter_wind.png', 'wuerfel/wetter_wolken.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true });
  }));
});
