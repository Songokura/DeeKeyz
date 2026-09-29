/* ============================================================
   DEEKEYZ MOTORS - скрипт страницы.
   Плиты (герой: база на интро, лак по скроллу, толщиномер;
   фото-плиты: проход краскопульта по --p1) · перевод RU/EN,
   казахский словарь грузится отдельным файлом по кнопке KZ ·
   меню · бегущая лента · лента работ с кнопками · счётчики ·
   WhatsApp с готовым текстом · форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77761566666";
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;
var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";

/* ---------------- КОНВЕРСИИ GOOGLE ADS ----------------
   Ярлыки задаёт index.html (window.DK_CONV): phone, contact, lead. Пусто - не шлём. */
function conv(key, item){
  var id = (window.DK_CONV || {})[key];
  if (!id || typeof window.gtag !== "function") return;
  var p = {send_to: id, value: 1.0, currency: "USD", transport_type: "beacon"};
  if (item) p.item = item;
  window.gtag("event", "conversion", p);
}

/* ---------------- АНГЛИЙСКИЙ СЛОВАРЬ ---------------- */
var EN = {
  "m.title":"Car Painting and Body Repair in Almaty - DEEKEYZ MOTORS",
  "m.desc":"Body repair and car painting in Almaty since 2017. Panel painting from 40,000 KZT, accident repair, polishing, paint protection film, interior restoration. Free photo estimate on WhatsApp, 5-year paint warranty.",
  "m.ogt":"DEEKEYZ MOTORS - car painting and body repair in Almaty",
  "a.menu":"Menu","a.home":"DEEKEYZ MOTORS - home","a.nav":"Sections","a.lang":"Site language","a.call":"Call","a.mnav":"Mobile menu",
  "a.hero":"Car painting and body repair in Almaty","a.nums":"Numbers and clients","a.pokraska":"Car painting","a.kuzovnoy":"Body repair","a.polirovka":"Paint polishing","a.bron":"Paint protection film","a.salon":"Interior restoration","a.proc":"How we work","a.prev":"Back","a.next":"Forward","a.strip":"Repair photos","a.price":"All services and prices","a.dirs":"Detailing, fleets, parts","a.offers":"Offers and gifts","a.guar":"Warranty","a.kont":"Contacts","a.bar":"Quick contact",
  "n.uslugi":"Services","n.ceny":"Prices","n.raboty":"Work","n.akcii":"Offers","n.garantiya":"Warranty","n.kontakty":"Contacts",
  "mn.pokraska":"Car painting","mn.kuzovnoy":"Body repair","mn.polirovka":"Polishing","mn.bronplenka":"Protection film","mn.salon":"Interior restoration",
  "b.wa":"Message on WhatsApp","b.price":"Get a price","b.all":"All prices","b.terms":"Fleet terms","b.find":"Find a part","b.call":"Call",
  "h.kicker":"Almaty · body shop · since 2017",
  "h.l1":"Car painting","h.l2":"and body repair of any complexity",
  "h.lead":"Free repair estimate from photos on WhatsApp. Panel painting from 40,000 KZT, 5-year paint warranty, photo and video report at every stage.",
  "h.b1":"Photo estimate on WhatsApp","h.b2":"Services and prices","h.ig":"Shop work on Instagram",
  "g.lbl":"Paint layers","g.primer":"Primer","g.base":"Base","g.clear":"Clear",
  "c.1":"cars restored","c.2":"clients trusted us with their cars","c.3":"cars in the shop every month","c.4":"the year the shop opened","c.5y":"years","c.5":"paint warranty",
  "c.vip":"Our clients include Kairat Nurtas, artists and bloggers of Almaty",
  "p1.k":"Painting","p1.h":"Car painting","p1.s":"one panel, spot repair or the whole car",
  "p1.l":"Colour matched to your shade, booth painting, 5-year paint warranty. After a full repaint - interior cleaning as a gift.",
  "p1.c1":"One panel","p1.c2":"Gauge-proof","p1.c3":"Whole car",
  "p2.k":"Body repair","p2.h":"Body repair","p2.s":"and restoration after an accident",
  "p2.l":"From a dent to frame geometry after a crash. We source and order parts and show every stage in photos and video.",
  "p2.c1":"After accident","p2.c2":"Dents and scratches","p2.c3":"Frame geometry",
  "p3.k":"Polishing","p3.h":"Paint polishing","p3.s":"professional, in 3 stages",
  "g.unit":"microns",
  "p3.l":"We remove swirl marks, holograms and fine scratches, bringing back colour depth and a mirror shine.",
  "p3.c1":"3 stages","p3.c2":"Headlights","p3.c3":"Exterior care",
  "p4.k":"Protection film","p4.h":"Protection film","p4.s":"for the body: luxury package or full wrap",
  "p4.l":"Clear protection for your paint against chips, sand and road salt. High-risk zones or the whole body.",
  "p4.c1":"Luxury package","p4.c2":"Full wrap",
  "p5.k":"Interior","p5.h":"Interior restoration","p5.s":"leather, steering wheel, plastic, deep cleaning",
  "p5.l":"We bring the interior back to new without replacing parts: leather and plastic restoration, steering wheel, deep cleaning.",
  "p5.c1":"Interior","p5.c2":"Steering wheel","p5.c3":"Deep cleaning",
  "w.k":"Transparent repair","w.h":"You see every stage",
  "w.l":"Free photo and video report: from teardown to handover. A 2020 Toyota Highlander after an accident - full repaint and restoration in our Ryskulov shop.",
  "w.ig":"More work on Instagram",
  "ba.c10":"Door card: reupholstery",
  "ba.c9":"Land Cruiser interior: leather reupholstery",
  "ba.c8":"Land Cruiser 200: body restoration",
  "ba.c7":"Land Cruiser Prado: body restoration",
  "ba.c6":"Land Cruiser 200: restyling",
  "ba.c5":"Land Cruiser 200: body restoration",
  "ba.c4":"Land Cruiser 200: restyling",
  "ba.c3":"Mercedes-Benz S-Class: restyling",
  "ba.c2":"Land Cruiser 200 after an accident: body work and restyling",
  "ba.c1":"Land Cruiser 200 after an accident: restoration and restyling",
  "ba.after":"After",
  "ba.before":"Before",
  "ba.l":"Our clients' cars: top - as they arrived, bottom - as they left.",
  "ba.h":"Before and after",
  "ba.k":"Our work",
  "a.ba":"Before and after",
  "v.cap":"After an accident: full repaint and restoration in our Ryskulov shop",
  "v.snd":"Watch with sound",
  "a.video":"Video: 2020 Toyota Highlander after an accident, repaint and restoration in the shop",
  "al.parts":"Parts warehouse: shelving with parts",
  "s1.h":"Photo on WhatsApp","s1.t":"Free estimate","s2.h":"Inspection and quote","s2.t":"Scope and price agreed upfront","s3.h":"Repair with reports","s3.t":"Photos and video at every stage","s4.h":"Wash and handover","s4.t":"Free wash, taxi at drop-off",
  "u.k":"Prices","u.h":"All services and starting prices",
  "u.l":"We give the exact price after a photo estimate or a free inspection at the shop. Tap a service - WhatsApp opens with a ready question.",
  "u.g1":"Body and paint","u.g2":"Exterior","u.g3":"Interior and service",
  "u.1":"Accident repair","u.2":"Body element repair and restoration","u.3":"Frame geometry restoration","u.4":"Dent and scratch removal","u.5":"Body part replacement and repair","u.6":"Bumper and plastic restoration","u.7":"Painting of individual panels","u.8":"Spot painting","u.9":"Gauge-proof painting","u.10":"Whole car repaint","u.11":"Complete vehicle restoration",
  "u.12":"Full paint polishing","u.13":"Headlight and optics restoration","u.14":"Protection film: luxury package","u.15":"Full body protection film wrap","u.16":"Windshield replacement","u.17":"Exterior restoration and care","u.18":"Detailing","u.19":"Restyling and exterior redesign",
  "u.20":"Interior restoration","u.21":"Steering wheel restoration","u.22":"Interior deep cleaning","u.23":"Parts sourcing and ordering","u.24":"Repair for corporate clients and fleets",
  "u.note":"Starting prices in tenge. The final price depends on the model, damage and materials.",
  "ph.empty":"Object photo","ph.parts":"Object photo: parts warehouse",
  "d1.h":"Detailing and deep cleaning","d1.t":"Interior deep cleaning from 40,000 KZT, detailing from 30,000 KZT. A free wash after any repair.",
  "d2.h":"Fleets and business","d2.t":"Up to 25% off and priority queue. Repair from 50,000 KZT, contract and report for each car. Car clubs 20%, bikers 25%.",
  "d3.h":"Parts sourcing","d3.t":"We work with the largest wholesalers in Kazakhstan and used-parts warehouses in China and Almaty. Parts from 5,000 KZT, delivery across Kazakhstan.",
  "o.k":"Offers","o.h":"What comes free with your repair","o.l":"We take care of you, not just the car: from the first photo to the keys.",
  "o1.h":"Photo estimate","o1.t":"Send photos on WhatsApp - we give a free price guide",
  "o2.h":"Inspection and advice","o2.t":"Free before the repair, no obligation",
  "o3.h":"Taxi on us","o3.t":"We pay your ride home or to the office when you drop off the car",
  "o4.h":"Free wash","o4.t":"The car comes back clean after any repair",
  "o5.h":"Free deep cleaning","o5.t":"After a full repaint",
  "o6.h":"Photo and video report","o6.t":"Every stage of the work - on your phone",
  "o7.h":"Club discounts","o7.t":"Car clubs 20%, bikers 25%, fleets up to 25%",
  "o8.h":"Bring a friend","o8.t":"A bonus on the next repair for both of you",
  "gr.k":"Warranty","gr.h":"5 years on paintwork","gr.l":"When there is no physical impact. Restoration work is covered until the next hit.",
  "y1.h":"Transparent","y1.t":"Scope and cost agreed upfront, no black box",
  "y2.h":"Full cycle","y2.t":"From estimate and parts to washing and handing over the keys",
  "y3.h":"Care","y3.t":"Taxi, wash, deep cleaning - on us",
  "y4.h":"Real people","y4.t":"You talk to the shop owner directly, not a call centre",
  "rv.t":"Read client reviews on our 2GIS page - they are real, with dates and photos.","rv.b":"Reviews on 2GIS",
  "k.k":"Contacts","k.h":"Send photos - we estimate for free","k.l":"We reply on WhatsApp, by phone or on Telegram. Open 08:00-20:00, two shops in Almaty.",
  "k.hrs":"Daily","k.a1":"Ryskulov St. 103/3, level -1, office 1","k.a2":"Tastybulak district, Alexey Khegay St. 6/1",
  "f.name":"Name","f.nameph":"How should we address you","f.phone":"Phone","f.what":"What do you need","f.w0":"Choose a service",
  "f.msg":"Make, model, what happened","f.msgph":"Toyota Camry 70, scratch on the rear bumper","f.send":"Send on WhatsApp",
  "f.note":"The request opens in your WhatsApp: add photos of the damage there.",
  "f.ok":"Thank you! Opening WhatsApp with your request - if the window did not appear, message us directly.",
  "f.err":"Enter your phone so we can reply.",
  "ft.d":"Body repair and car painting in Almaty. Since 2017.",
  "al.hero":"DEEKEYZ MOTORS technician in a spray booth next to a Toyota Highlander","al.pokraska":"Spray gun on a masked body panel before painting","al.kuzovnoy":"Technician shaping a rear fender before painting","al.polirovka":"Polishing a black car body with a machine polisher","al.bron":"Applying protection film to the hood and headlight","al.salon":"Leather car interior after restoration",
  "al.det":"Detailing: brushing a wheel rim","al.fleet":"Fleet cars in a service bay",
  "mq.list":"Car painting|Body repair|Accident restoration|Polishing|Protection film|Interior restoration|Detailing|Parts|Fleets"
};
var RU_MQ = "Покраска авто|Кузовной ремонт|Ремонт после ДТП|Полировка|Бронеплёнка|Реставрация салона|Детейлинг|Запчасти|Автопаркам";
var I18N = {en: EN};
var RU = {};                                       /* снимок русского текста из разметки */

/* ---------------- WHATSAPP: текст по кнопке ----------------
   data-wa="general|photo|service"; service берёт название из data-wa-title (ключ i18n).
   Обработчик в фазе захвата на window - раньше трекера LeadBot, чтобы он дописал код к готовой ссылке. */
var WA_T = {
  ru:{general:"Здравствуйте! Пишу с сайта DEEKEYZ MOTORS.", photo:"Здравствуйте! Хочу получить бесплатную оценку ремонта по фото. Отправляю фото повреждений:", service:"Здравствуйте! Пишу с сайта DEEKEYZ MOTORS. Интересует:\n{name}\nПодскажите стоимость и сроки."},
  en:{general:"Hello! I'm writing from the DEEKEYZ MOTORS website.", photo:"Hello! I'd like a free repair estimate from photos. Sending photos of the damage:", service:"Hello! I'm writing from the DEEKEYZ MOTORS website. I'm interested in:\n{name}\nPlease tell me the price and timing."}
};
function tr(key){
  var L = curLang(), d = I18N[L];
  return (d && d[key]) || RU[key] || "";
}
function waText(kind, titleKey){
  var L = curLang(), T = WA_T[L] || WA_T.ru;
  if (L === "kk" && window.SITE_KK && window.SITE_KK.__wa) T = window.SITE_KK.__wa;
  var t = T[kind] || T.general;
  if (kind === "service" && titleKey) t = t.replace("{name}", tr(titleKey));
  return t;
}
window.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("a[href]") : null;
  if (!a) return;
  var h = a.getAttribute("href") || "";
  if (a.dataset.wa) {
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(waText(a.dataset.wa, a.dataset.waTitle));
    conv("contact", a.dataset.waTitle || a.dataset.wa);
  } else if (h.indexOf("tel:") === 0) conv("phone");
}, true);

/* ---------------- ЯЗЫК ---------------- */
function curLang(){ return root.getAttribute("lang") || "ru"; }
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ RU[el.dataset.i] = el.textContent; });
  document.querySelectorAll("[data-i-ph]").forEach(function(el){ RU[el.dataset.iPh] = el.getAttribute("placeholder"); });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.getAttribute("alt"); });
  document.querySelectorAll("[data-i-t]").forEach(function(el){ RU[el.dataset.iT] = el.textContent; });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
  RU["mq.list"] = RU_MQ;
}
function applyLang(lang){
  var d = lang === "ru" ? RU : (I18N[lang] || RU);
  function g(k){ return d[k] != null ? d[k] : RU[k]; }
  document.querySelectorAll("[data-i]").forEach(function(el){ var v = g(el.dataset.i); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i-ph]").forEach(function(el){ var v = g(el.dataset.iPh); if (v != null) el.setAttribute("placeholder", v); });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ var v = g(el.dataset.iAria); if (v != null) el.setAttribute("aria-label", v); });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ var v = g(el.dataset.iAlt); if (v != null) el.setAttribute("alt", v); });
  document.querySelectorAll("[data-i-t]").forEach(function(el){ var v = g(el.dataset.iT); if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ var v = g(el.dataset.iC); if (v != null) el.setAttribute("content", v); });
  root.setAttribute("lang", lang);
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.dataset.lang === lang;
    b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("dk-lang", lang); } catch(e){}
  buildMarquee(g("mq.list"));
  fitAll();
}
/* казахский словарь - отдельным файлом, только по выбору человека */
function loadLang(lang, done){
  if (I18N[lang] || lang !== "kk") return done();
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
  s.onload = function(){ if (window.SITE_KK) I18N.kk = window.SITE_KK; done(); };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}
function setLang(lang){
  if (["ru","kk","en"].indexOf(lang) < 0) lang = "ru";
  loadLang(lang, function(){ applyLang((I18N[lang] || lang === "ru") ? lang : "ru"); });
}
document.querySelectorAll(".lang button").forEach(function(b){ b.addEventListener("click", function(){ setLang(b.dataset.lang); }); });
function initLang(){
  var q = new URLSearchParams(location.search).get("lang"), saved = null;
  try { saved = localStorage.getItem("dk-lang"); } catch(e){}
  var L = q || saved || "ru";
  if (L !== "ru") setLang(L); else buildMarquee(RU_MQ);
}

/* ---------------- БЕГУЩАЯ ЛЕНТА ---------------- */
function buildMarquee(list){
  var box = document.getElementById("mq1"); if (!box) return;
  var items = (list || RU_MQ).split("|"), html = "";
  items.forEach(function(t){ html += "<b>" + t + "</b>"; });
  box.innerHTML = html + html;                                 /* две копии: цикл в одну копию */
  requestAnimationFrame(function(){
    var w = box.scrollWidth / 2;
    box.style.setProperty("--tkw", w + "px");
    box.style.setProperty("--tkd", Math.max(18, w / 60) + "s");
  });
}

/* ---------------- ШАПКА И МЕНЮ ---------------- */
var hdr = document.getElementById("hdr"), burger = document.getElementById("burger");
function hdrState(){ hdr.classList.toggle("solid", scrollY > 40); }
function closeMenu(){ document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); }
burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
function goTo(id, push){
  var el = document.getElementById(id); if (!el) return;
  closeMenu();
  var top = el.getBoundingClientRect().top + scrollY;
  if (el.classList.contains("pw") && el.id !== "top") top += 2;   /* плита: чуть внутрь, чтобы enter = 1 */
  else if (!el.classList.contains("pw")) top -= parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 72;
  scrollTo({top: Math.max(0, top), behavior: RED ? "auto" : "smooth"});
  if (push !== false) { try { history.pushState(null, "", "#" + id); } catch(e){} }
}
document.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("[data-go]") : null; if (!a) return;
  e.preventDefault(); goTo(a.dataset.go);
});

/* ---------------- FIT TEXT ---------------- */
function fitOne(el){
  el.style.fontSize = "";
  var box = el.parentElement, max = box.clientWidth, guard = 0;
  var fs = parseFloat(getComputedStyle(el).fontSize);
  while (el.scrollWidth > max + 1 && guard < 14) { fs *= .95; el.style.fontSize = fs + "px"; guard++; }
}
function fitAll(){ document.querySelectorAll(".fit").forEach(fitOne); }
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
addEventListener("resize", fitAll);

/* ---------------- ПЛИТЫ ----------------
   Один слушатель scroll через rAF. На каждую .pw пишем --enter/--exit/--stay
   и --p1 (проход базы). Герой: --f (интро - база), --p2 (лак по скроллу), толщиномер. */
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function easeInOut(t){ return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

var heroPw = document.getElementById("top");
var pws = [].slice.call(document.querySelectorAll(".pw"));
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var gread = document.getElementById("gread");
var introK = 1, introDone = true, lastRead = -1;
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw) {
      var f = easeInOut(clamp((introK - 0.1) / 0.9));
      var p2 = easeInOut(clamp(stay / 0.72));
      pw.style.setProperty("--f", f.toFixed(3));
      pw.style.setProperty("--p1", easeInOut(clamp(introK / 0.82)).toFixed(3));
      pw.style.setProperty("--p2", p2.toFixed(3));
      var read = Math.round(40 + 20 * clamp(introK / 0.82) + 50 * p2);
      if (gread && read !== lastRead) { gread.textContent = read; lastRead = read; }
    } else {
      pw.style.setProperty("--p1", easeInOut(clamp((enter - 0.12) / 0.72)).toFixed(3));
    }
  });
  hdrState();
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
  pws.forEach(function(pw){ pw.classList.add("on"); });
  if (gread) gread.textContent = "110";
  addEventListener("scroll", function(){ hdrState(); if (bar) bar.classList.toggle("show", scrollY > innerHeight * 0.55); }, {passive:true});
  hdrState();
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  /* интро 1500 мс: кадр лежит в грунте, проход краскопульта наносит базу, текст поднимается.
     Пропускаем при хэше / прокрутке - человек из рекламы сразу видит собранный экран. */
  var skip = location.hash || scrollY > 80;
  if (skip) {
    update();
  } else {
    introK = 0; introDone = false; update();
    var t0 = null;
    var step = function(ts){
      if (introDone) return;
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1500);
      introK = p;
      update();
      if (p < 1) requestAnimationFrame(step);
      else introDone = true;
    };
    requestAnimationFrame(function(){ requestAnimationFrame(step); });
    setTimeout(function(){ if (!introDone) { introDone = true; introK = 1; update(); } }, 2200);
  }
}
window.plateSync = function(){ introDone = true; introK = 1; update(); };
addEventListener("hashchange", function(){
  var id = location.hash.slice(1); if (!id || !document.getElementById(id)) return;
  goTo(id, false);
  setTimeout(function(){ goTo(id, false); }, 420);
});

/* ---------------- ПОЯВЛЕНИЕ И СЧЁТЧИКИ ---------------- */
function runCounters(box){
  box.querySelectorAll("[data-count]").forEach(function(el){
    var to = parseInt(el.dataset.count, 10) || 0, t0 = null;
    if (RED) { el.textContent = to; return; }
    var step = function(ts){
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1300), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = v;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); if (e.target.classList.contains("nums")) runCounters(e.target); io.unobserve(e.target); } });
  }, {threshold:.08, rootMargin:"0px 0px -5% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) { el.classList.add("in"); if (el.classList.contains("nums")) runCounters(el); }
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
  document.querySelectorAll("[data-count]").forEach(function(el){ el.textContent = el.dataset.count; });
}

/* ---------------- ВИДЕО HIGHLANDER ----------------
   src ставится, когда видео входит в кадр: без звука, петлёй; ушло из кадра - пауза.
   Кнопка «со звуком» включает звук и прячется. reduced-motion - только постер и controls. */
(function(){
  var v = document.getElementById("hlv"), b = document.getElementById("hlvs");
  if (!v) return;
  function load(){ if (!v.getAttribute("src")) { v.src = v.dataset.src; } }
  function play(){ load(); var p = v.play(); if (p && p.catch) p.catch(function(){}); }
  if (b) b.addEventListener("click", function(){ v.muted = false; v.volume = 1; play(); b.hidden = true; });
  v.addEventListener("volumechange", function(){ if (b && !v.muted) b.hidden = true; });
  if (HAS_IO && !RED) {
    new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) play(); else if (!v.paused) v.pause(); });
    }, {threshold:.5}).observe(v);
  } else load();
})();

/* ---------------- ЛЕНТА С КНОПКАМИ ЛИСТАНИЯ ----------------
   Шаг - ровно одна карточка (ширина из getBoundingClientRect + gap из стилей),
   крайняя кнопка гаснет, обе прячутся, если всё влезло без прокрутки. */
var strips = [];
document.querySelectorAll(".strip-wrap").forEach(function(w){
  var s = w.querySelector(".strip"), prev = w.querySelector(".prev"), next = w.querySelector(".next");
  if (!s || !prev || !next) return;
  function stepW(){
    var f = s.querySelector("figure"); if (!f) return s.clientWidth;
    var gap = parseFloat(getComputedStyle(s).columnGap); if (isNaN(gap)) gap = 16;
    return f.getBoundingClientRect().width + gap;
  }
  function state(){
    var max = s.scrollWidth - s.clientWidth;
    var none = max <= 1;
    prev.hidden = none; next.hidden = none;
    prev.disabled = s.scrollLeft <= 1;
    next.disabled = s.scrollLeft >= max - 1;
  }
  prev.addEventListener("click", function(){ s.scrollBy({left: -stepW(), behavior: RED ? "auto" : "smooth"}); });
  next.addEventListener("click", function(){ s.scrollBy({left: stepW(), behavior: RED ? "auto" : "smooth"}); });
  s.addEventListener("scroll", state, {passive:true});
  s.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev.click(); }
  });
  strips.push(state);
  state();
});
function stripsState(){ strips.forEach(function(f){ f(); }); }
addEventListener("load", stripsState);
addEventListener("resize", stripsState);

/* ---------------- ФОРМА -> WhatsApp ---------------- */
var FORM_T = {
  ru:{hello:"Здравствуйте! Заявка с сайта DEEKEYZ MOTORS.", name:"Имя", what:"Услуга", msg:"Авто и что случилось", phone:"Телефон", none:"не выбрана"},
  en:{hello:"Hello! Request from the DEEKEYZ MOTORS website.", name:"Name", what:"Service", msg:"Car and what happened", phone:"Phone", none:"not chosen"}
};
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var phone = form.phone.value.trim();
  if (phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; form.phone.focus(); return; }
  err.hidden = true;
  var L = curLang(), F = FORM_T[L] || FORM_T.ru;
  if (L === "kk" && window.SITE_KK && window.SITE_KK.__form) F = window.SITE_KK.__form;
  var sel = form.what, what = sel.value ? sel.options[sel.selectedIndex].textContent.trim() : F.none;
  var name = form.name.value.trim(), msg = form.msg.value.trim();
  var t = F.hello + "\n" + (name ? F.name + ": " + name + "\n" : "") + F.what + ": " + what + "\n" +
          (msg ? F.msg + ": " + msg + "\n" : "") + F.phone + ": " + phone;
  ok.hidden = false;
  conv("lead", what);
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
hdrState();
fitAll();
/* прямой переход по якорю: встать на блок, интро пропущено выше */
if (location.hash) {
  var hid = location.hash.slice(1);
  if (document.getElementById(hid)) {
    setTimeout(function(){ goTo(hid, false); }, 60);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (location.hash.slice(1) === hid) goTo(hid, false); });
  }
}
})();
