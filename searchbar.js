const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

btn.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
  input.setAttribute("placeholder", "Buscar...");
});

var selecter = $('#select-tools').selectize({
  maxItems: 1,
  valueField: 'NombreArchivo',
  labelField: 'Ganador',
  searchField: 'Info',
  options: infoJSON,
  create: false,
  plugins: ["auto_position"],
  closeAfterSelect: true,
  onChange: function(e) {
    var color = document.querySelector("[imagen='" + e + "']").getAttribute("color");
    
    document.querySelector("[imagen='" + e + "']").setAttribute("animation__color", "property:color; from:#FFFFFF; to:" + color + ";loop:5;dur:300;");
    search.classList.toggle('active');

    if (e < 39) {
      checkpoint(document.querySelector("#initialCheckpoint"));

    } else if (e >= 40 && e < 65) {
      checkpoint(document.querySelector("#ch2"));

    } else if (e >= 66) {
      checkpoint(document.querySelector("#ch4"));

    }
    try {
      this.clear();
    } catch (err) { }

  }
});

selecter[0].selectize.removeOption(62);
selecter[0].selectize.removeOption(65);
selecter[0].selectize.refreshOptions(false);
