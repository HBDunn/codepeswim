var bt0l = document.getElementById("btn0l");
function bt0l_clicked(){
  console.log('click')
}

bt0l.addEventListener("click", bt0l_clicked);

window.onscroll = function() {slideNav()};
window.onresize = function() {adjCodeWidth()};

// code sizing; gcs: getComputedStyle

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
    //var strg = "convert " + prop + " ispx " + ispx(val) + " and val " + val + " is type " + typeof val + " return " + (ispx(val)?pxFlt(val):pxFlt(val)*16.)
    //console.log(strg)
  
    if (ispx(val)) {
       return pxFlt(val);
    } else { //only handles em
      return pxFlt(val)*16.;
    }
  }  
const gcs = (elm, prop) => window.getComputedStyle(elm,null).getPropertyValue(prop);

var lastOSR = 0,
    accOSR=0;

adjCodeWidth()
function adjCodeWidth() {
  console.log("lastOSR ",lastOSR)
  var  dEl,
    codeEl, 
    gcsMxw,
    gcsCmw,
    gcsNrw,
    codeW,
    codeOSR,
    calcCW,
    avCodeW;
  
  /* setup */
  dEl = document.documentElement;
  codeEl = document.getElementsByClassName("code")[0];
  
  gcsMxw = gcsf(dEl,"--win-max-width");
  gcsCmw = gcsf(dEl,"--code-min-width");
  gcsNrw = codeEl.offsetLeft;
  codeW = gcsf(codeEl,"width");
  avCodeW = pxFlt(window.innerWidth) - pxFlt(gcsNrw);
  console.log("-- running adj --")
  
  //offsetright
  codeOSR = pxFlt(window.innerWidth); 
  
  /********************************/
  /* validate and throttle move */
  /*console.log("lastOSR - codeOSR acc",lastOSR ,codeOSR,Math.abs(lastOSR - codeOSR), accOSR);*/
  if ( lastOSR != 0 && Math.abs(lastOSR - codeOSR) < 5 && accOSR < 5 || !gcsMxw || gcsMxw === undefined){
    accOSR += Math.abs((lastOSR - codeOSR));
    return;
  } else { // set calcCW
    console.log("TEST", codeOSR > gcsCmw && codeOSR  < gcsMxw)
    console.log("TEST data codeOSR " + codeOSR + " gcsCmw " + gcsCmw + " gcsMxw " + gcsMxw)
    if (gcsMxw <= 414) {
          console.log('SETTING 414 ', gcsCmw)
          calcCW = gcsCmw;  
    } else if (avCodeW >= 750. || gcsMxw == 736.) {
      console.log('SETTING in 750 ', gcsMxw)
      if (avCodeW >= gcsMxw) {
        console.log(" in 750 " + gcsMxw)
        calcCW = pxFlt(gcsMxw) - gcsNrw;
      } else if ((avCodeW > gcsCmw) && (codeOSR  < gcsMxw)) {
        console.log("avcode-lmts", avCodeW, gcsCmw, gcsMxw);
        calcCW = avCodeW - gcsNrw; 
      } else {
        console.log("else avcodeW " + avCodeW + " setting to " + gcsMxw)
        calcCW = gcsMxw - 20;
      }
    }
  }
  // debug
    var brk = "<br/>"
    var info = ['iw: ' +  window.innerWidth + brk, 
                'avail: ' + avCodeW + brk,
                'codeW: ' + codeW + brk,
                'OSR: ' + codeOSR + brk,
                "calcCW: " + calcCW + brk,
                'real nav: ' + gcsNrw + brk,
                "gcsMxw: " + gcsMxw + brk,
                "gcsCmw: " + gcsCmw
                ]
    document.getElementsByClassName("bns")[0].innerHTML = info.join("")
  // debug end
  lastOSR = codeOSR;
   accOSR = 0;
  console.log("WIDTH ", calcCW)
  codeEl.style.setProperty("--code-width", pxToem(calcCW-20));
  codeEl.style.setProperty("max-width", pxToem(calcCW));
                           
  document.getElementsByClassName("ul-badge")[0].style.setProperty("max-width",pxToem(calcCW-(20)));
  
  
}
//adjCodeWidth()

function codeNav(){
  var cnav = document.getElementsByClassName("ul-badge")[0]
  var cbtn = document.getElementsByClassName("nbtn")[0]
  //console.log("cnav",cnav);
  var gcs = window.getComputedStyle(cnav,null);  
  var gcsb = window.getComputedStyle(cbtn,null);  
  var cnOffset = cnav.offsetLeft;
  //console.log('btn adj', parseInt(gcsb.getPropertyValue("width"))/1.25)
  
  var cnWidth = parseInt(gcs.getPropertyValue("width")) - (parseInt(gcsb.getPropertyValue("width"))/1.25);
  console.log("ul-badge width",parseInt(gcs.getPropertyValue("width")));
  console.log("cnav",cnOffset);
  console.log("cnav width",cnWidth);
  cnav.style.setProperty("--code-offset",cnWidth + "px")
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
/* download generic
const download = document.getElementById("fileRequest");
download.addEventListener('click', request);
function request() {
    window.location = "https://gitcdn.link/repo/HBDunn/ipybuilder/master/ipybuild.py";
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
const loadHtml = function(parentElementId, filePath) {
    const init = {
        method : "GET",
        headers : { "Content-Type" : "text/html" },
        mode : "cors",
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
            document.getElementById(parentElementId).innerHTML = body;

        });
};

adjCodeWidth()
//var request = ["fileRequest","filerequest"];
loadHtml( "fileRequest" ,   "https://gitcdn.link/repo/HBDunn/ipybuilder/master/ipybuild.py")

//loadHtml( "frequest",   //"https://gitcdn.link/repo/HBDunn/ipybuilder/master/ip//ybuild.py")