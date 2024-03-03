// Component to listen for environment menu clicks and notify state with an event.
AFRAME.registerComponent('category-changer', {
    init: function () {
      this.el.addEventListener('click', (evt) => {
        this.el.sceneEl.emit('categorySet', evt.target.getAttribute('text').value.toLowerCase());   
      });
    }
  });