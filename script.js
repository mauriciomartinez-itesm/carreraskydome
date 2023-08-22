
var mural = document.querySelector("#mural");
var lastCheckpoint = document.querySelector("#initialCheckpoint");

var width = .486;
var height = .1015;

var cont = 0;

document.addEventListener('DOMContentLoaded', function() {
  var scene = document.querySelector('a-scene');
  var splash = document.querySelector('#splash');
  scene.addEventListener('loaded', function(e) {
    splash.style.display = 'none';
    inicioTxt.style.display = 'none';
    btnComenzar.style.visibility = "visible";
  });
});

function comenzar() {
  btnComenzar.style.display = 'none';
  document.getElementById("fade-init").style.display = 'none';
  logoPEGS.style.display = 'none';
  footer.style.display = 'none';
  logoTec.style.visibility = 'visible';
}


for (var i = 1; i < estructuraJSON.length - 2; i++) {
  for (var j = 0; j < 13; j++) {


    var boxCompleto = document.createElement("a-entity");

    var box = document.createElement("a-box");
    box.setAttribute("width", ".483");
    box.setAttribute("height", ".0990");
    box.setAttribute("depth", ".02");
    box.setAttribute("numi", i);

    try {
      box.setAttribute("imagen", infoJSON[cont]["NombreArchivo"]);
    } catch (err) {
      box.setAttribute("imagen", null);
    }

    box.setAttribute("color", numberToHex(estructuraJSON[j][i]));

    try {

      if (infoJSON[cont]["Categoria"] != "BLANK") {
        box.addEventListener("click", premioClick)
        box.addEventListener("mouseenter", premioEnter)
        box.addEventListener("mouseleave", premioLeave)
        box.setAttribute("class", "premio");
      }
    } catch (err) {

    }

    var text = document.createElement("a-text");
    text.setAttribute("font", "font/MYRIADPRO-REGULAR-msdf.json");
    text.setAttribute("negate", "false");
    text.setAttribute("align", "center");
    text.setAttribute("baseline", "center");
    text.setAttribute("scale", ".085 .085 .085");
    text.setAttribute("alpha-test", 0);

    var text2 = document.createElement("a-text");
    text2.setAttribute("font", "font/MYRIADPRO-REGULAR-msdf.json");
    text2.setAttribute("negate", "false");
    text2.setAttribute("align", "center");
    text2.setAttribute("baseline", "center");
    text2.setAttribute("scale", ".065 .065 .065");
    text2.setAttribute("alpha-test", 0);


    if (estructuraJSON[j][i] == 1) {
      text.setAttribute("color", "#000000");
      text2.setAttribute("color", "#000000");
    } else {
      text.setAttribute("color", "#FFFFFF");
      text2.setAttribute("color", "#FFFFFF");
    }

    try {
      if (infoJSON[cont]["Info"].split("\n").length == 3) {
        text.setAttribute("position", "0 .012 0.01");
        text2.setAttribute("position", "0 -.027 0.01");
      } else {
        text.setAttribute("position", "0 .012 0.01");
        text2.setAttribute("position", "0 -.035 0.01");
      }

      text.setAttribute("value", infoJSON[cont]["Info"].split("\n").slice(0, -1).join("\n"));
      text2.setAttribute("value", infoJSON[cont]["Info"].split("\n").reverse()[0]);

    } catch (err) {

    }

    box.appendChild(text);
    box.appendChild(text2);

    //console.log(infoJSON[cont]["Info"].split("\n").reverse()[0]);
    //console.log(infoJSON[cont]["Info"].split("\n").slice(0, -1).join("\n"));


    boxCompleto.appendChild(box);

    if (i <= 5) {
      boxCompleto.setAttribute("position", ((i * (width) - (width))) + " " + (-j * (height)) + " 0");
      boxCompleto.setAttribute("miPos", ((i * (width) - (width))) + " " + (-j * (height)) + " 0");
    } else {
      boxCompleto.setAttribute("rotation", "0 90 0");

      boxCompleto.setAttribute("position", "2.611 " + (-j * (height)) + " " + (-.594 + (((-i + 6) * (width)))));
      boxCompleto.setAttribute("miPos", "2.611 " + (-j * (height)) + " " + (-.594 + (((-i + 6) * (width)))));

    }

    mural.appendChild(boxCompleto);
    cont++;

  }
}

function luzClick(e) {
  var lightbox = new FsLightbox();
  lightbox.props.sources = ["assets/img/luz_interior.png"];
  lightbox.open();
}

function explClick(e) {
  var lightbox = new FsLightbox();
  lightbox.props.sources = ["assets/img/pegs_explicacion.png"];
  lightbox.open();
}

function premioClick(e) {
  var lightbox = new FsLightbox();
  lightbox.props.sources = ["assets/img/" + this.getAttribute("imagen") + "-min.png"];
  lightbox.open();

}

function premioEnter(e) {
  //console.log(e.target.parentNode)
  var numi = e.target.getAttribute("numi");
  var thisPos = e.target.parentNode.getAttribute("miPos");


  if (numi <= 5) {
    e.target.parentNode.setAttribute("animation__position", "property:position; from: " + thisPos + ";to:" + thisPos.split(" ")[0] + " " + thisPos.split(" ")[1] + " " + (thisPos.split(" ")[2] + .05) + "; dur:1000; loop:0;easing:easeOutElastic");
  } else {
    e.target.parentNode.setAttribute("animation__position", "property:position; from: " + thisPos + ";to:" + (Number(thisPos.split(" ")[0]) + .05) + " " + thisPos.split(" ")[1] + " " + thisPos.split(" ")[2] + "; dur:1000; loop:0;easing:easeOutElastic");
  }

  e.target.parentNode.setAttribute("animation__scale", "property:scale; from:1 1 1; to:1.5 1.5 1.5; dur:1000; loop:0;easing:easeOutElastic");

  //console.log(this)
  //console.log(e.target.childNodes[0])
}

function premioLeave(e) {
  //console.log(e.target.parentNode)
  var numi = e.target.getAttribute("numi");
  var thisPos = e.target.parentNode.getAttribute("miPos");

  e.target.parentNode.setAttribute("animation__position", "");

  if (numi <= 5) {
    e.target.parentNode.setAttribute("animation__position", "property:position; to: " + thisPos + ";from:" + thisPos.split(" ")[0] + " " + (thisPos.split(" ")[1]) + " " + (thisPos.split(" ")[2] + .05) + "; dur:1000; loop:0;easing:easeOutExpo");
  } else {
    e.target.parentNode.setAttribute("animation__position", "property:position; to: " + thisPos + ";from:" + (Number(thisPos.split(" ")[0]) + .05) + " " + thisPos.split(" ")[1] + " " + thisPos.split(" ")[2] + "; dur:1000; loop:0;easing:easeOutExpo");
  }

  e.target.parentNode.setAttribute("animation__scale", "property:scale; to:1 1 1; dur:1000; loop:0;easing:easeOutElastic");

  //console.log(this)
  //console.log(e.target.childNodes[0])
}

function numberToHex(miNum) {

  var hex = "";

  switch (miNum) {
    case 0:
      hex = "#DDDDDD";
      break;
    case 1:
      hex = "#BBBBBB"
      break;
    case 2:
      hex = "#222222"
      break;
    case 3:
      hex = "#555555"
      break;
  }

  return hex;
}

function checkpoint(e) {
  try {
    lastCheckpoint.setAttribute("animation", "property:scale;dur:500; easing:easeInOutQuad;to:1 1 1");

  } catch (err) { }

  //console.log(e);

  e.setAttribute("scale", "0 0 0");
  e.setAttribute("animation", "property:scale;dur:500; easing:easeInOutQuad;to:0 0 0;");


  lastCheckpoint = e;


  rig.setAttribute("animation", "property:position;dur:1000; easing:easeInOutQuad;to:" + e.getAttribute("position").x + " 0 " + e.getAttribute("position").z);



}

document.querySelector(".blocker").addEventListener("mouseenter", blockerOver);

function blockerOver(e) {
  document.querySelector(".a-canvas.a-grab-cursor").css("cursor", "defaut !important;")
}