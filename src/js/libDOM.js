(function (window, document) {
  'use strict'

  function DOM(elements) {
    if(!(this instanceof DOM))
        return new DOM(elements)

    this.element = Array.from(document.querySelectorAll(elements));
  }

  DOM.prototype.on = function on(eventType, callback) {
    this.element.forEach(function (element) {
      element.addEventListener(eventType, callback, false)
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    this.element.forEach.call(function (element) {
      element.removeEventListener(eventType, callback, false)
    });
  }

  DOM.prototype.get = function get(index) {
    if(!index)
        return this.element[0];
    return this.element[index];
  }

  DOM.prototype.getValue = function getValue(index){
    if(!index)
        return this.element[0].value;
    return this.element[index].value;
  }

  DOM.prototype.forEach = function forEach() {
    return this.element.forEach(arguments);
  };

  DOM.prototype.map = function map() {
    return this.element.forEach(arguments);
  };

  DOM.prototype.filter = function filter() {
    return this.element.forEach(arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return this.element.forEach(arguments);
  };


  DOM.prototype.reduceRight = function reduceRight() {
    return this.element.forEach(arguments);
  };


  DOM.prototype.every = function every() {
    return this.element.forEach(arguments);
  };

  DOM.prototype.some = function some() {
    return this.element.forEach(arguments);
  };

  DOM.prototype.isArray = function isArray(param) {
    return Object.prototype.toString.call(param) === '[object Array]'
  };

  DOM.prototype.isObject = function isObject(param) {
    return Object.prototype.toString.call(param) === '[object Object]'
  };

  DOM.prototype.isFunction = function isFunction(param) {
    return Object.prototype.toString.call(param) === '[object Function]'
  };

  DOM.prototype.isNumber = function isNumber(param) {
    return Object.prototype.toString.call(param) === '[object Number]'
  };

  DOM.prototype.isString = function isString(param) {
    return Object.prototype.toString.call(param) === '[object String]'
  };

  DOM.prototype.isBoolean = function isBoolean(param) {
    return Object.prototype.toString.call(param) === '[object Boolean]'
  };

  DOM.prototype.isNull = function isNull(param) {
    return Object.prototype.toString.call(param) === '[object Null]'
      || Object.prototype.toString.call(param) === '[object Undefined]';
  };

  window.DOM = DOM;
})(window, document);
