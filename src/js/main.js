(function(win, doc){
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
        app.createGameOptions(data);
        app.handleToggleGames(data);
        app.fillPageContent(data[0]);
        app.createBetNumbers(data[0]);
        app.actualBet;
        app.handleBet(data[0]);
      },

      handleToggleGames: function(data){
        let buttons = Array.from(doc.querySelectorAll('.btn-game'));
        let lotofacil = doc.querySelector('.btn-game--lotofacil');

        lotofacil.classList.add('active');
        buttons.forEach((button, index) => {
          button.addEventListener('click', () => {
            buttons.forEach(eachButton => eachButton.classList.remove('active') || '');
            button.classList.toggle('active');
            app.loadSelectedGameContent(data[index]);
          });
        });
      },

      loadSelectedGameContent: function loadSelectedGameContent(data){
        DOM('[data-js="game-numbers"]').get().textContent = '';
        app.fillPageContent(data);
        app.createBetNumbers(data);
        app.handleBet(data);
      },
      
      fillPageContent: function fillPageContent (data){
        let gameType = doc.querySelector('[data-js="type"]');
        let betDescription = doc.querySelector('[data-js="bet-description"]');
        
        gameType.textContent = 'for ' + data.type;
        betDescription.textContent = data.description;
      },
      
      createGameOptions: function createGameOptions (data){
        let avaliableGames = doc.querySelector('[data-js="avaliable-games"]');
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
        const range = data.range;
        let divNumbers = doc.querySelector('[data-js="game-numbers"]');
        for(let i = 1; i <= range; i++){
          let button = doc.createElement('button');
          button.classList.add('btn-number');
          button.textContent = i;
          button.addEventListener('click', this.selectNumbers);
          divNumbers.appendChild(button);
        };
      },
      
      actualBet: [],

      selectNumbers: function selectNumbers(){
        app.actualBet.push(this.textContent);
        // console.log(app.actualBet)
      },

      handleBet: function handleBet(data){
        const maxSelectedNumbers = data.min_and_max_number;
        const price = data.price;
        app.actualBet.length = maxSelectedNumbers;

        console.log(maxSelectedNumbers, price);
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


})(window, document);