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
        app.createBetNumbers(data[0]);
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
          button.addEventListener('click', this.gameSelect);
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

      gameSelect: function gameSelect(game){
        console.log(this)
      },

      createBetNumbers: function createBetNumbers(data){
        const range = data.range;
        let divNumbers = DOM('[data-js="game-numbers"]').get();
        for(let i = 1; i <= range; i++){
          let button = doc.createElement('button');
          button.classList.add('btn-number');
          button.textContent = i;
          button.addEventListener('click', this.selectNumbers);
          divNumbers.appendChild(button);
        }
        console.log(range)
      },

      selectNumbers: function selectNumbers(){
        console.log('clicou', this.textContent);
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