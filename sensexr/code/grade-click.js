// Component to listen for environment menu clicks and notify state with an event.
AFRAME.registerComponent('grade-click', {
    init: function () {
      this.el.addEventListener('click', (evt) => {
        this.el.sceneEl.emit('gradeSet', evt.target.getAttribute('text').value.toLowerCase());   
      });
    }
  });