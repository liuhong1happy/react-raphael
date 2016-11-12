"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Raphael = require('raphael');
var Utils = {
  createPaper: function createPaper(container, props) {
    var width = props.width,
        height = props.height;

    var paper = Raphael(container, width, height);
    Utils.paper = paper;
    return paper;
  },
  create: function create(type, props) {
    var element = null;
    switch (type) {
      case "set":
        element = Utils.paper.set();
        break;
      case "circle":
        var x = props.x,
            y = props.y,
            r = props.r;

        element = Utils.paper.circle(x, y, r);
        break;
      case "ellipse":
        var x = props.x,
            y = props.y,
            rx = props.rx,
            ry = props.ry;

        element = Utils.paper.ellipse(x, y, rx, ry);
        break;
      case "image":
        var src = props.src,
            x = props.x,
            y = props.y,
            width = props.width,
            height = props.height;

        element = Utils.paper.image(src, x, y, width, height);
        break;
      case "path":
        var d = props.d;

        element = Utils.paper.path(d);
        break;
      case "rect":
        var x = props.x,
            y = props.y,
            width = props.width,
            height = props.height,
            r = props.r;

        element = Utils.paper.rect(x, y, width, height, r);
        break;
      case "text":
        var x = props.x,
            y = props.y,
            text = props.text;

        element = Utils.paper.text(x, y, text);
        break;
    }
    if (element) {
      for (var key in props) {
        switch (key) {
          case "attr":
            if (_typeof(props[key]) === "object") element.attr(props.attr);
            break;
          case "animate":
            if (_typeof(props[key]) === "object") element.animate(props.animate);
            break;
          case "animateWith":
            if (_typeof(props[key]) === "object") element.animateWith(props.animateWith);
            break;
          case "click":
            if (typeof props[key] === "function") element.click(props.click);
            break;
          case "dblclick":
            if (typeof props[key] === "function") element.dblclick(props.dblclick);
            break;
          case "drag":
            if (typeof props[key] === "function") element.drag(props.drag);
            break;
          case "glow":
            if (_typeof(props[key]) === "object") element.glow(props.glow);
            break;
          case "hover":
            if (typeof props[key] === "function") element.hover(props.hover);
            break;
          case "hide":
            if (typeof props[key] === "boolean") props.hide ? element.hide() : element.show();
            break;
          case "mousedown":
            if (typeof props[key] === "function") element.mousedown(props.mousedown);
            break;
          case "mousemove":
            if (typeof props[key] === "function") element.mousemove(props.mousemove);
            break;
          case "mouseout":
            if (typeof props[key] === "function") element.mouseout(props.mouseout);
            break;
          case "mouseover":
            if (typeof props[key] === "function") element.mouseover(props.mouseover);
            break;
          case "mouseup":
            if (typeof props[key] === "function") props.mouseup(element.mouseup);
            break;
          case "rotate":
            if (typeof props[key] === "rotate") element.rotate(props.attr);
            break;
          case "scale":
            if (typeof props[key] === "scale") element.scale(props.animate);
            break;
          case "touchcancel":
            if (typeof props[key] === "function") element.touchcancel(props.touchcancel);
            break;
          case "touchend":
            if (typeof props[key] === "function") element.touchend(props.touchend);
            break;
          case "touchmove":
            if (typeof props[key] === "function") props.touchmove(element.touchmove);
            break;
          case "touchstart":
            if (typeof props[key] === "function") props.touchstart(element.touchstart);
            break;
          case "transform":
            if (_typeof(props[key]) === "object" || typeof props[key] === "array") props.transform(element.transform);
            break;
          case "translate":
            if (_typeof(props[key]) === "object") props.translate(element.translate);
            break;
        }
      }
    }

    return element;
  },
  createElement: function createElement(type, props, callback) {
    var element = Utils.create(type, props);
    Utils.elements.push({
      type: type,
      props: props,
      callback: callback,
      element: element
    });
    if (callback) callback(element);
    return element;
  },
  createSet: function createSet(props, callback) {
    var set = Utils.create("set", props);
    Utils.elements.push({
      type: "set",
      element: set
    });
    if (callback) callback(set);
    return set;
  },
  removeSet: function removeSet(set) {
    var elements = Utils.elements.filter(function (ele) {
      return ele === set;
    });
    if (elements.length > 0) {
      elements[0].remove();
    }
  },
  removeElement: function removeElement(element) {
    var elements = Utils.elements.filter(function (ele) {
      return ele === element;
    });
    if (elements.length > 0) {
      elements[0].remove();
    }
  },
  paper: null,
  elements: []
};

module.exports = Utils;