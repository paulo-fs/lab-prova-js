(function(win, DOM, doc){
  'use strict'

  let app = (function (){
    return {
      init: function (){
        console.log('app started');
        this.requireData (this.loadStartScreen);
      },

      loadStartScreen: function loadStartScreen (){
        if(this.readyState !== 4 && this.state !== 200)
          return;
        const data = JSON.parse(this.responseText).types;
        app.fillPageContent(data[0]);
        app.createGameOptions(data);
        app.createBetNumbers(data);
      },
      
      fillPageContent: function fillPageContent (data){
        let gameType = DOM('[data-js="type"]').get();
        let betDescription = DOM('[data-js="bet-description"]').get();
        
        gameType.textContent = 'for ' + data.type;
        betDescription.textContent = data.description;
      },
      
      createGameOptions: function createGameOptions (data){
        let avaliableGames = DOM ('[data-js="avaliable-games"]').get();
        data.forEach(game => {
          let button = doc.createElement('button');
          button.setAttribute('class', app.insertClassOnButton(game));
          button.textContent = game.type;
          avaliableGames.appendChild(button);
        });
      },

      insertClassOnButton: function insertClassOnButton(game){
        switch(game.type){
          case 'Lotofácil':
            return 'btn-game btn-game--lotofacil';
          case 'Mega-Sena':
            return 'btn-game btn-game--mega';
          case 'Quina':
            return 'btn-game btn-game--quina'
        }
      },

      createBetNumbers: function createBetNumbers(data){
        
      },

      requireData: function requireData (callback){
        let ajax = new XMLHttpRequest();
        ajax.open ('GET', './src/data/games.json');
        ajax.send ();
        ajax.addEventListener('readystatechange', callback, false);
      },
    }
  })();

  app.init();


})(window, window.DOM, document);