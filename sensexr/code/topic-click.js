// Component to listen for environment menu clicks and notify state with an event.
AFRAME.registerComponent('topic-click', {
    init: function () {
      this.el.addEventListener('click', (evt) => {
        this.el.sceneEl.emit('topicSelect', evt.target.getAttribute('id').toLowerCase());   
      });
    }
  });