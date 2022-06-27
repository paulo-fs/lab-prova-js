(function(win, doc){
  'use strict'

  let app = (function (){
    return {
      init: function (){
        console.log('app started');
        this.requireData (this.loadStartScreen);
        doc.querySelector('[data-js="complete-game"]').addEventListener('click', app.handleGameBet.completeGame);
        doc.querySelector('[data-js="clear-game"]').addEventListener('click', app.handleGameBet.clearGame);
        doc.querySelector('[data-js="add-to-cart"]').addEventListener('click', app.handleGameBet.addToCart);
      },

      loadStartScreen: function loadStartScreen (){
        if(this.readyState !== 4 && this.state !== 200)
          return;
        const data = JSON.parse(this.responseText).types;
        app.createGameOptions(data);
        app.handleToggleGames(data);
        app.handleGameBet.data = data[0];
        app.fillPageContent(data[0]);
        app.createBetNumbers(data[0]);
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
        doc.querySelector('[data-js="game-numbers"]').textContent = '';
        app.fillPageContent(data);
        app.createBetNumbers(data);
        app.handleGameBet.data = data;
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
      
      selectNumbers: function selectNumbers(){
        app.handleGameBet.handleNumbers(this);
      },

      handleGameBet: {
        data: {},

        maxNumbers: function maxNumbers(){
          return this.data.min_and_max_number;
        },

        price: function price(){
          return this.data.price;
        },

        range: function range(){
          return this.data.range;
        },

        type: function type(){
          return this.data.type;
        },

        selectedElements:  function selectedElements(){
          let numbers = Array.from(doc.querySelector('[data-js="game-numbers"]').children);
          return numbers.filter(selected => {
            return selected.className === 'btn-number activeNumber';
          });
        },

        notselectedElements: function notselectedElements(){
          let numbers = Array.from(doc.querySelector('[data-js="game-numbers"]').children);
          return numbers.filter(selected => {
            return selected.className !== 'btn-number activeNumber';
          });
        },

        missingNumber: function missingNumber(){
          let selected = app.handleGameBet.selectedElements();
          let missing = app.handleGameBet.maxNumbers() - selected.length;
          return missing;
        },

        handleNumbers: function(num){
          let totalNumbersSelected = this.selectedElements();
          if(totalNumbersSelected.length < this.maxNumbers()){
            return num.classList.toggle('activeNumber');
          } 
          alert('The game is alread complete, add this game to cart!');
        },

        completeGame: function completeGame(){
          let notSelected = app.handleGameBet.notselectedElements();
          if(app.handleGameBet.missingNumber() === 0)
            return alert('The game is alread complete, add this game to cart!');
          for(let i = 0; i < app.handleGameBet.missingNumber(); i++){
            notSelected[Math.floor(Math.random() * notSelected.length)].classList.add('activeNumber');
            if(app.handleGameBet.missingNumber() !== 0)
              notSelected[Math.floor(Math.random() * notSelected.length)].classList.add('activeNumber');
            if(app.handleGameBet.missingNumber() !== 0)
              notSelected[Math.floor(Math.random() * notSelected.length)].classList.add('activeNumber');
            if(app.handleGameBet.missingNumber() !== 0)
              notSelected[Math.floor(Math.random() * notSelected.length)].classList.add('activeNumber');
          }
          console.log('aleatorio', Math.floor(Math.random() * notSelected.length))
          console.log('complete', notSelected.length, app.handleGameBet.missingNumber());
        },

        clearGame: function clearGame(){
          let selectedElements = Array.from(doc.querySelector('[data-js="game-numbers"]').children);
          return selectedElements.forEach(number => number.classList.remove('activeNumber')) || '';
        },

        addToCart: function addToCart(){
          if(app.handleGameBet.missingNumber() !== 0)
            return alert('Is missing ' + app.handleGameBet.missingNumber() +  ' numbers. Please, complete the game before add to cart!')
          const selected = app.handleGameBet.selectedElements();
          const selectedNumbers = selected.map(selected => selected.textContent);
          console.log ({
            bet: selectedNumbers,
            betType: app.handleGameBet.type(),
            betPrice: app.handleGameBet.price(),
          });
        }
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