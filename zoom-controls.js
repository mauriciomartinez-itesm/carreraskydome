AFRAME.registerComponent('zoom-controls', {
  schema: {
    min: { type: "number", default: 5 },
    max: { type: "number", default: 120 }
  },
  init: function() {
    let self = this;
    let sceneEl = document.querySelector("a-scene");
    self.camera = sceneEl.querySelector("#camera");
    //console.log('min: ', self.data.min);
    //console.log('max: ', self.data.max);


    document.querySelector("canvas").addEventListener("wheel", event => {
      let amount = Math.sign(event.deltaY);
      //console.log(self.el.camera)
      let fov = Number(self.el.getAttribute('camera').fov);
      let adjust = amount + fov;
      if (adjust < self.data.min) { adjust = self.data.min; }
      if (adjust > self.data.max) { adjust = self.data.max; }
      //console.log('zoom: ', adjust);
      self.el.setAttribute('camera', 'fov', adjust);
    });
  }
});


const scrollCheck = document.querySelector("#scroll-check");
const keyboardCheck =
  document.addEventListener(
    "wheel",
    function(e) {
      if (scrollCheck.checked && e.ctrlKey) {
        e.preventDefault();
      }
    },
    {
      passive: false
    }
  );