var GRADES = [
    'grade3',
    'grade4',
    'grade5',
    'grade6',
    'grade7',
    'grade8'
  ];

  var CATEGORIES = [
    'astronomy',
    'biology',
    'maths',
    'geography',
    'chemistry',
    'physics',
    'miscellanious'
  ];

  // aframe-state-component definition.
  AFRAME.registerState({
    // Initial state of our application. We have the current environment and the active menu.
    initialState: {
        hideMenu: false,
        gradeValue : '',
        gradeOptions: [],
        gradeData: {},
        categoryOptions: [],
        categoryData: [],
        menu: 'main',
        topicData : {
        },
        modelId: 0,
        modelPage: 0,
        modelNumPages: 0,
        modelNumPagesGreaterThanModelPage : false,
    },
  
    // State changes are done via events and are handled here.
    handlers: {

      topicSelect : function(state, topicName) {
        console.log(topicName);
        console.log(state)
        let topicData = {};
        for(let i=0;i<state.categoryData.length;i++){
          if(state.categoryData[i].name.toLowerCase() === topicName){
            topicData = state.categoryData[i];
          }
        }
        var categoryMenu = document.getElementById('menu');
        // position="0 2.2 -4"
        categoryMenu.setAttribute("position", "0 0 -10000");
        state.hideMenu = true;
        state.topicData = topicData;


        var entity = document.getElementById("entities");
				// Create a new A-Frame entity
				var newModel = document.createElement('a-entity');

				// Set attributes for the new entity
				newModel.setAttribute('gltf-model', '../Models/'+topicData.category+'/'+topicData.name+'/'+topicData.models[state.modelId].folderName+'/scene.gltf');
				newModel.setAttribute('position', '0 1 -2'); // Set the position of the model
				newModel.setAttribute('id', "gltfModel");
				newModel.setAttribute('scale','0.5 0.5 0.5');
				
				// Append the new entity to the scene
        entity.appendChild(newModel);
        state.modelNumPages = topicData.models.length;
        state.modelPage = 0;
        state.modelNumPagesGreaterThanModelPage = true;
        console.log(state.modelNumPages);

      },
      menuBack: function (state) {
       state.menu = 'main';
      var categoryMenu = document.getElementById('menu');
      categoryMenu.setAttribute("position", "0 2.2 -4");
      state.hideMenu = false;
      },

      categorySet: function(state, category) {
        console.log(state);
        console.log(category);
        let categoryDataTemp = [];
        for(let i=0;i<state.gradeData.topics.length;i++){
            if(state.gradeData.topics[i].category.toLowerCase() == category){
                categoryDataTemp.push(state.gradeData.topics[i]);
            }
        }
        console.log(categoryDataTemp);
        state.menu = 'topics';
        state.categoryData = categoryDataTemp;
        
        var categoryMenu = document.getElementById('categoryDataMenu');
        var buttonsContainer = categoryMenu.querySelector('.buttons');
        // Clear existing entities
        buttonsContainer.innerHTML = '';

        // Populate entities based on categoryData
        categoryDataTemp.forEach(function(category) {
            var entity = document.createElement('a-entity');
            entity.setAttribute('mixin', 'button');
            entity.setAttribute('id', category.name);
            entity.setAttribute('text', {color: '#FFF', value: category.displayName});
            entity.setAttribute('bind-toggle__raycastable', 'menu === "topics"');
            buttonsContainer.appendChild(entity);
        });
      },

      gradeSet: function(state, gradeValue) {
        console.log(state);
        console.log(gradeValue);
        console.log(window['data']);
        let gradeData = [];
        for (let key in window.data) {
            if (window.data.hasOwnProperty(key)) {
                if(window.data[key].grade == gradeValue){
                    gradeData = window.data[key];
                }
            }
        }
        console.log(gradeData);
        state.gradeData = gradeData;
        let categoryOptionsTemp = [];
        for(let i=0;i<gradeData.topics.length;i++){
            categoryOptionsTemp[i] = gradeData.topics[i].category;
        }
        console.log(categoryOptionsTemp);
        state.categoryOptions = categoryOptionsTemp;
        state.gradeValue = gradeValue;

        var categoryMenu = document.getElementById('categoryMenu');
        var buttonsContainer = categoryMenu.querySelector('.buttons');
        // Clear existing entities
        buttonsContainer.innerHTML = '';

        // Populate entities based on categoryData
        categoryOptionsTemp.forEach(function(category) {
            var entity = document.createElement('a-entity');
            entity.setAttribute('mixin', 'button');
            entity.setAttribute('text', {color: '#FFF', value: category});
            entity.setAttribute('bind-toggle__raycastable', 'menu === "categories"');
            buttonsContainer.appendChild(entity);
        });

        state.menu = 'categories';
      },
  
      // This is emitted and proxied from the main menu "Change Environment" button.
      // Once the state is changed, the application will react via the `bind`s, swapping the active menu, and toggling buttons.
      menuCategories: function (state) {
        state.menu = 'categories';  
      },


      modelPageNext: function(state) {
        console.log(state);
        var element = document.getElementById("gltfModel");
        element.parentElement.removeChild(element);

        state.modelId = state.modelId + 1;

        var entity = document.getElementById("entities");
				// Create a new A-Frame entity
				var newModel = document.createElement('a-entity');

				// Set attributes for the new entity
				newModel.setAttribute('gltf-model', '../Models/'+state.topicData.category+'/'+state.topicData.name+'/'+state.topicData.models[state.modelId].folderName+'/scene.gltf');
				newModel.setAttribute('position', '0 1 -2'); // Set the position of the model
				newModel.setAttribute('id', "gltfModel");
				newModel.setAttribute('scale','0.5 0.5 0.5');
				
				// Append the new entity to the scene
        entity.appendChild(newModel);
        state.modelNumPages = state.topicData.models.length;
        state.modelPage = state.modelId;
        if(state.modelId < state.modelNumPages-1 ) {
        state.modelNumPagesGreaterThanModelPage = true;
        }else{
          state.modelNumPagesGreaterThanModelPage = false;
        }

      },

      modelPagePrev: function(state) {
        console.log(state);
        var element = document.getElementById("gltfModel");
        element.parentElement.removeChild(element);

        state.modelId = state.modelId - 1;

        var entity = document.getElementById("entities");
				// Create a new A-Frame entity
				var newModel = document.createElement('a-entity');

				// Set attributes for the new entity
				newModel.setAttribute('gltf-model', '../Models/'+state.topicData.category+'/'+state.topicData.name+'/'+state.topicData.models[state.modelId].folderName+'/scene.gltf');
				newModel.setAttribute('position', '0 1 -2'); // Set the position of the model
				newModel.setAttribute('id', "gltfModel");
				newModel.setAttribute('scale','0.5 0.5 0.5');
				
				// Append the new entity to the scene
        entity.appendChild(newModel);
        state.modelNumPages = state.topicData.models.length;
        state.modelPage = state.modelId;
        if(state.modelId <state.modelNumPages ) {
        state.modelNumPagesGreaterThanModelPage = true;
        }else{
          state.modelNumPagesGreaterThanModelPage = false;
        }
      }

    },
  
    computeState: function (state) {
      state.gradeOptions = GRADES;
      // state.categoryOptions = CATEGORIES;
      // state.categoryData = CATEGORIES;
    }
  });