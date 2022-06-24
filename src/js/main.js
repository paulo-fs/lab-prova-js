(function(win, DOM, doc){
  'use strict'

  let app = (function (){
    return {
      init: function (){
        console.log('app started');
        this.initialScreen (0);
      },

      initialScreen: function initialScreen (index){
        this.loadGameData (index);
      },

      loadGameData: function loadGameData (index){
        let ajax = new XMLHttpRequest();
        ajax.open ('GET', './src/data/games.json');
        ajax.send ();
        return ajax.onreadystatechange = function (){
          if(app.isReady (ajax))
            console.log(JSON.parse(ajax.responseText).types[index])
        }
      },

      isReady: function isReady (ajax){
        return (ajax.readyState === 4 && ajax.status === 200)
      },
    }
  })();

  app.init();


})(window, window.DOM, document);