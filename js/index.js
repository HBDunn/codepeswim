let urls = {"btn0l" : ["https://gitcdn.link/repo/HBDunn/ipybuilder/master/ipybuild.py","py"],
            "btn1l" : ["https://gitcdn.link/repo/HBDunn/djone/master/mysite/views.py","py"],
            "btn1la" : ["https://gitcdn.link/repo/HBDunn/optweb/master/vu.txt","text"],
            "btn2l" : ["https://gitcdn.link/repo/HBDunn/codepeswim/master/index.html","html"],
            "btn2la" : ["https://gitcdn.link/repo/HBDunn/codepeswim/master/css/style.css","css"],
            "btn2lb" : ["https://gitcdn.link/repo/HBDunn/codepeswim/master/js/index.js","js"],
            "resume" :["https://gitcdn.link/repo/HBDunn/56940072e16f957323e104f7d1ab905f/raw/66b1f74f46022ca4b35e3e5d616ac5cf67549d8d/resume.html"]
           }
let ftContact = document.getElementById("ft-contact");
let address = document.getElementById("address");
let nbtn = document.getElementsByClassName("nbtn")[0];
let back = document.getElementsByClassName("back-color")[0];
let pre = document.getElementById("fileRequest");
var setCodeW = 20;/* px */
// code sizing; gcs: getComputedStyle
var sizes = [1200, 992, 768, 480]
var gcsMxw = parseFloat(window.getComputedStyle(document.documentElement,null).getPropertyValue("--win-max-width"))*16;
// Throttling
var lastOSR = 0,
    accOSR=0;

document.addEventListener('click', function(event) {
    let id = event.target.id;
    if (!id || id.indexOf("3") != -1 || (id.indexOf("bt") == -1 && id.indexOf("nl") == -1)) {
      var a;
    } else if (id.indexOf("bt") != -1){
      let btn_clickedId = document.getElementById(id)
      doNight(id);
      bt_clicked(btn_clickedId);
    } else if (id != "nld"){
      if (id.indexOf("a") !=-1) {
        address.classList.toggle("hided")
      };

      if (id.indexOf("b") !=-1) {
        document.getElementById("projects").classList.toggle("hided")
        };
      if (id.indexOf("c") !=-1) {
        // need to hide prj if open
        if (!document.getElementById("projects").classList.contains("hided")){
          document.getElementById("projects").classList.toggle("hided")
        }
        var res = document.getElementById("resume")
        var rsrc = urls["resume"][0];
        var rlang = "rhtml";
        setTimeout(loadHtml,50,"resume",rsrc,rlang);
        res.classList.toggle("hided");
      };
    }
});

ftContact.onclick = function() {
                    address.classList.toggle("hided");
                  };
nbtn.addEventListener("click", nbtn_clicked);
window.onscroll = function() {slideNav()};
window.onresize = function() {adjCodeWidth()};

function doNight(bid){
  if ((bid.indexOf("bt") != -1) && (bid.indexOf("l") != -1)) {
    nbtn.classList.toggle("hided")
  }
}

function nbtn_clicked(){
  if (pre.classList.contains("blend")) {
    pre.classList.remove("blend")
  } else {
    pre.classList.add("blend")
  }
}

function pp(src,lang){
  if (lang == "html") {//alternative formating
    pre.innerText = src;//PR.prettyPrintOne(src,lang);
    pre.style.setProperty("background-color","#000");
    pre.style.setProperty("color","#fff");
  } else if (lang == "rhtml") {//alternative formating
    document.getElementById("resume").innerHTML = src;
  } else if (lang == "text"){//alternative formating
    pre.innerText = src;
    pre.style.setProperty("background-color","#fff");
  } else {//pretty formating
      pre.innerHTML = PR.prettyPrintOne(src,lang) // ,true adds linenum etc
      pre.style.setProperty("background-color","#000");
  }
}

function setTop(offsetTop){
  back.style.setProperty("top",offsetTop + "px");
  back.style.setProperty("max-width",setCodeW);
}
function bt_clicked(btn){

  var btni = parseInt(btn.id.replace(/[a-z]/gi,""));/* use integer of btn to get url */
  var lid = "item" + btni; /* class name */
  var offsetTop = parseFloat(document.getElementsByClassName(lid)[0].offsetTop) + 55;
  setTimeout(setTop,50,offsetTop);
  loadHtml( "fileRequest", urls[btn.id][0], urls[btn.id][1]);

  if (back.classList.contains("hide") || back.classList.contains("hided")) {
    if(back.classList.contains("hided")) {
      back.classList.remove("hided");
    } else if (back.classList.contains("hide")){
      back.classList.remove("hide");
    }
    back.classList.add("unhide");
  } else {
    back.classList.add("hide")
    back.classList.remove("unhide")
  }
}

function fixBackColorWidth(){
  const pxToem = function (val){
    return Math.round(parseFloat(val)*10)/160. + "em";
    }
  const pxiTopxs = function (val){ //  int (px) to floored int + "px"
    return Math.floor(parseFloat(val)) + "px";
  }

  var dEl = document.documentElement;
  var codeEl = document.getElementsByClassName("code")[0];
  var preEl = document.getElementById("fileRequest");
  var bcEl =  document.getElementsByClassName("back-color")[0];
  var lcode = codeEl.offsetLeft;
  var wbc  = bcEl.offsetWidth;
  var wpre  = preEl.offsetWidth;
  var lpre  = preEl.offsetLeft;

  var setPre,
      preSet;

  var pdiff = (lcode + wpre)
  var bdiff = (lcode + lpre + wbc)
  var fix = (pdiff  - bdiff)

  if (pdiff > bdiff  ){
    setPre = Math.abs(fix+2);
  } else {
    setPre =  (-1 * Math.abs(fix))-2;
  }

  preSet = bcEl.clientWidth + setPre;
  dEl.style.setProperty("--bc-width",preSet);
  bcEl.style.setProperty("width",pxiTopxs(preSet));
}

function adjCodeWidth() {
  var  dEl,
    codeEl,
    bcEl,
    gcsnuMxw,
    gcsCmw,
    gcsNrw,
    codeW,
    codeOSR,
    calcCW = 40,
    avCodeW;

  const pxFlt = function (val){
    return parseFloat(val);
    }
  const pxToem = function (val){
    return Math.round(parseFloat(val)*10)/160. + "em";
    }
  const ispx = (val) => {
      if ((typeof val ==="string"  && val.indexOf("px") != -1) ||
          (typeof val === "number")) {
        return true
      }
      return false
    }
  const gcsf = (elm, prop) => {
      var val =  window.getComputedStyle(elm,null).getPropertyValue(prop);
      if (ispx(val)) {
         return pxFlt(val);
      } else { //only handles em
        return pxFlt(val)*16.;
      }
    }

  /* setup */
  dEl = document.documentElement;
  codeEl = document.getElementsByClassName("code")[0];
  bcEl =  document.getElementsByClassName("back-color")[0];
  gcsnuMxw = gcsf(dEl,"--win-max-width");
  gcsCmw = gcsf(dEl,"--code-min-width");
  gcsNrw = codeEl.offsetLeft;
  avCodeW = pxFlt(window.innerWidth) - pxFlt(gcsNrw)/2;
  codeOSR = pxFlt(window.innerWidth);

  /********************************/
  /* validate and throttle move */
  /*console.log("lastOSR - codeOSR acc",lastOSR ,codeOSR,Math.abs(lastOSR - codeOSR), accOSR);*/
  if ( lastOSR != 0 && Math.abs(lastOSR - codeOSR) < 5 && accOSR < 5 || !gcsMxw || gcsMxw === undefined){
    accOSR += Math.abs((lastOSR - codeOSR));
    return;
  } else { // set calcCW
    if (gcsMxw == sizes[3] || gcsnuMxw < sizes[3] || gcsMxw < 158 || codeOSR < 256) {
      calcCW = gcsCmw-16;
    } else if (codeOSR >= gcsMxw){
        if (gcsMxw >= 158 || codeOSR > 736) {
        calcCW = avCodeW - pxFlt(gcsNrw)/2 - 16;
      } else if (gcsMxw < 158 || (codeOSR < 736 && codeOSR > 480)) {
          calcCW = 480 - 32;
        }
    } else if (avCodeW > gcsCmw && codeOSR  < gcsMxw  && gcsMxw > 158) {
        calcCW = avCodeW - pxFlt(gcsNrw)/2 - 16;
    }
  }

  lastOSR = codeOSR;
   accOSR = 0;

  dEl.style.setProperty("--code-width", pxToem(calcCW-20));
  codeEl.style.setProperty("max-width", pxToem(calcCW));
  document.getElementsByClassName("ul-badge")[0].style.setProperty("max-width",pxToem(calcCW-16));
  setCodeW = calcCW-20;
  fixBackColorWidth();
}

function slideNav() {
  var gcs = window.getComputedStyle(document.documentElement,null);
  var cwin = window.pageYOffset;
	var navtop = document.getElementsByClassName("code")[0].offsetTop;
	var drop =  cwin > navtop?cwin - navtop:navtop - cwin;
	var maxdrop = Math.min(drop,window.innerHeight*.3)

  if (cwin > 0 && cwin <= navtop) {
    document.documentElement.style.setProperty("--navtop", drop + "px")
    document.documentElement.style.setProperty("--drop",maxdrop + "px")
    navbar.classList.add("sticky")
  } else if (cwin > navtop) {
    document.documentElement.style.setProperty("--drop",maxdrop + "px")
	document.documentElement.style.setProperty("--navxtop",0 + "px")
    navbar.classList.add("sticky")
  } else {
    document.documentElement.style.setProperty("--navfixtop", navtop + "px")
    document.documentElement.style.setProperty("--drop", navtop + "px")
    navbar.classList.remove("sticky");
  }
}

/*
 * Replicates the functionality of jQuery's `load` function,
 * used to load some HTML from another file into the current one.
 *
 * Based on this Stack Overflow answer:
 * https://stackoverflow.com/a/38132775/3626537
 * And `fetch` documentation:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 *
 * @param {string} parentElementId - The ID of the DOM element to load into
 * @param {string} htmlFilePath - The path of the HTML file to load
 * Ref: https://stackoverflow.com/questions/38132510/equivalent-to-load-without-jquery - Author: Phrancis
 */
const loadHtml = function(parentElementId, filePath, lang) {
  var cors = "cors";
  var ctyp = "text/plain"
  const init = {
      method : "GET",
      headers : {"Content-Type" : ctyp},
      mode : cors,
      cache : "default"
  };

  const req = new Request(filePath, init);
  fetch(req)
      .then(function(response) {
          return response.text();
      })
      .then(function(body) {
          // Replace `#` char in case the function gets called `querySelector` or jQuery style
          if (parentElementId.startsWith("#")) {
              parentElementId.replace("#", "");
          }
          setTimeout(pp.bind(null,body,lang),50);
      });
};

adjCodeWidth()
