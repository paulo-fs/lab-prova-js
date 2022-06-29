(function(_win, doc){
  'use strict'

  let app = (function (){
    return {
      init: function (){
        this.requireData (this.loadStartScreen);
        app.handleCart.showTotal();
        app.handleCart.emptyCart();
        doc.querySelector('[data-js="complete-game"]').addEventListener('click', app.handleGameBet.completeGame);
        doc.querySelector('[data-js="clear-game"]').addEventListener('click', app.handleGameBet.clearGame);
        doc.querySelector('[data-js="add-to-cart"]').addEventListener('click', app.handleGameBet.addToCart);
      },

      loadStartScreen: function loadStartScreen (){
        if(this.readyState !== 4 && this.state !== 200)
          return;
        const data = JSON.parse(this.responseText).types;
        app.data = data;
        app.createGameOptions(data);
        app.handleToggleGames(data);
        app.handleGameBet.data = data[0];
        app.fillPageContent(data[0]);
        app.createBetNumbers(data[0]);
      },

      data: {},

      handleToggleGames: function(data){
        const buttons = Array.from(doc.querySelectorAll('.btn-game'));
        function active(index=0){  
          return `background-color: ${data[index].color};
          border-color: ${data[index].color};
          color: #fff;`
        };
        app.isInactiveGame();
        buttons[0].setAttribute('style', active());
        buttons.forEach((button, index) => {
          button.onmouseenter = () => {
            button.style.filter = 'brightness(90%)';
          };
          button.onmouseleave = () => {
            button.style.filter = 'brightness(100%)';
          };
          button.addEventListener('click', () => {
            app.isInactiveGame();
            button.setAttribute('style', active(index));
            app.loadSelectedGameContent(data[index]);
          });
        });
      },

      isInactiveGame: function(){
        const data = app.data;
        const buttons = Array.from(doc.querySelectorAll('.btn-game'));
        buttons.forEach((button, index) => {
          button.setAttribute('style', `
            background-color: 'transparente';
            border-color: ${data[index].color};
            color: ${data[index].color};
          `);
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
          button.setAttribute('class', 'btn-game');
          button.textContent = game.type;
          avaliableGames.appendChild(button);
        });
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

        color: function color(){
          return this.data.color;
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
          if(num.className === 'btn-number activeNumber'){
            return num.classList.remove('activeNumber')
          }
          alert('The game is alread complete, add this game to cart!');
        },

        completeGame: function completeGame(){
          let notSelected = app.handleGameBet.notselectedElements();
          if(app.handleGameBet.missingNumber() === 0)
            return alert('The game is alread complete, add this game to cart!');
          for(let i = 0; i < app.handleGameBet.missingNumber(); i++){
            for(let j = 0; j <= 40; j++){
              if(app.handleGameBet.missingNumber() !== 0)
                notSelected[Math.floor(Math.random() * notSelected.length)].classList.add('activeNumber');
            }
          }
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
          app.handleCart.gameData ={
            bet: selectedNumbers,
            betType: app.handleGameBet.type(),
            betPrice: app.handleGameBet.price(),
            betColor: app.handleGameBet.color()
          };
          app.handleCart.createCartItem();
          app.handleCart.calcTotalCart();
          app.handleCart.removeEmptyCart();
          app.handleGameBet.clearGame();
        }
      },

      handleCart: {
        gameData: {},

        total: 0,

        emptyCart: function(){
          const cartItem = doc.querySelectorAll('.cart-item');
          if(cartItem.length === 0)
            return this.showEmptyCart();
          return this.removeEmptyCart();
        },

        showEmptyCart: function(){
          const cartItens = doc.querySelector('[data-js="cart-itens"]');
          const div = doc.createElement('div');
          const p1 = doc.createElement('p');
          const p2 = doc.createElement('p');
          div.setAttribute('class', 'cart-empty');
          p1.textContent = 'Cart empty';
          p2.textContent = 'Make your bet!';
          div.appendChild(p1);
          div.appendChild(p2);
          cartItens.appendChild(div);
          return cartItens;
        },

        removeEmptyCart: function removeEmptyCart(){
          const cartItens = doc.querySelector('[data-js="cart-itens"]');
          const emptyCartMsg = doc.querySelector('.cart-empty');
          if(emptyCartMsg)
            cartItens.removeChild(emptyCartMsg);
        },

        showTotal: function(){
          let divTotal = doc.querySelector('[data-js="total"]');
          let total = this.total.toFixed(2).replace('.', ',');
          divTotal.textContent = 'total: R$' + total;
        },

        calcTotalCart: function(){
          let betPrice = this.gameData.betPrice;
          this.total += betPrice;
          this.showTotal();
        },

        createCartItem: function createCartItem(){
          let fragment = doc.createDocumentFragment();
          let cartItens = doc.querySelector('[data-js="cart-itens"]');
          let cartItem = doc.createElement('div');
          cartItem.setAttribute('class', 'cart-item');
          cartItem.appendChild(this.imgFactory());
          cartItem.appendChild(this.contentFactory());
          fragment.appendChild(cartItem);
          cartItens.appendChild(fragment);
        },

        confirmDelete: function(){
          if(confirm('Are you sure you want to delete this bet?'))
            return true;
          return false;
        },

        deleteCartItem: function deleteCartItem(){
          if(!app.handleCart.confirmDelete())
            return;
          const parentNode = doc.querySelector('[data-js="cart-itens"]');
          const toBeDeleted = this.parentNode;
          let betPrice = toBeDeleted.querySelector('.price').textContent.replace('R$', '').replace(',', '.');
          betPrice = parseFloat(betPrice);
          app.handleCart.total -= betPrice;
          app.handleCart.showTotal();
          parentNode.removeChild(toBeDeleted);
          app.handleCart.emptyCart();
        },

        imgFactory: function imgFactory(){
          let button = doc.createElement('button');
          let img = doc.createElement('img');
          button.setAttribute('class', 'cart-item-delete');
          img.setAttribute('src', 'src/img/icons/trash_gray.png');
          img.setAttribute('alt', 'remove item from cart');
          button.appendChild(img);
          button.addEventListener('click', this.deleteCartItem);
          return button;
        },

        contentFactory: function contentFactory(){
          let div = doc.createElement('div');
          let betType = this.gameData.betType;
          betType = betType.toLowerCase();
          div.setAttribute('class', `cart-item-data cart-item-game`);
          div.setAttribute('style', `border-color: ${this.gameData.betColor}`);
          div.appendChild(this.pFactory());
          div.appendChild(this.typePriceFactory());
          return div;
        },

        pFactory: function pFactory(){
          let p = doc.createElement('p');
          let pContent = Array.from(this.gameData.bet);
          p.setAttribute('class', 'small');
          p.textContent = pContent;
          return p;
        },

        typePriceFactory: function(){
          let div = doc.createElement('div');
          div.setAttribute('class', 'cart-item-data-game');
          div.appendChild(this.pTypeFactory());
          div.appendChild(this.pPriceFactory());
          return div;
        },

        pTypeFactory: function pTypeFactory(){
          let pType = doc.createElement('p');
          let pColor = this.gameData.betColor;
          pType.setAttribute('class', 'game');
          pType.setAttribute('style', `color: ${pColor}`);
          pType.textContent = this.gameData.betType;
          return pType;
        },

        pPriceFactory: function pPriceFactory(){
          let pPrice = doc.createElement('p');
          let price = this.gameData.betPrice.toFixed(2).replace('.', ',');
          pPrice.setAttribute('class', 'price');
          pPrice.textContent = 'R$' + price;
          return pPrice;
        },
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