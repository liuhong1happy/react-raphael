"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Raphael = require('raphael');
var Utils = {
  createPaper: function createPaper(container, props) {
    var width = props.width,
        height = props.height;

    var paper = Raphael(container, width, height);
    paper.id = container.id || "paper-" + new Date().valueOf() + "-" + Math.random().toFixed(10);
    Utils.papers.push(paper);
    return paper;
  },
  findParentById: function findParentById(id) {
    var papers = Utils.papers.filter(function (ele, pos) {
      return ele.id == id;
    });
    if (papers.length > 0) {
      return {
        parent: papers[0],
        paper: papers[0]
      };
    } else {
      var sets = Utils.elements.filter(function (ele, pos) {
        return ele.element.id == id;
      });
      if (sets.length > 0) {
        if (!sets[0].element) return sets[0].element;
        return {
          parent: sets[0].element,
          paper: sets[0].element.paper
        };
      }
    }
    return {
      parent: null,
      paper: null
    };
  },
  create: function create(parentId, type, props) {
    var element = null;
    var findedParent = Utils.findParentById(parentId);
    if (!findedParent.paper) return findedParent.paper;
    switch (type) {
      case "set":
        element = findedParent.paper.set();
        element.id = "set-" + new Date().valueOf() + "-" + Math.random().toFixed(10);
        break;
      case "circle":
        var x = props.x,
            y = props.y,
            r = props.r;

        element = findedParent.paper.circle(x, y, r);
        break;
      case "ellipse":
        var x = props.x,
            y = props.y,
            rx = props.rx,
            ry = props.ry;

        element = findedParent.paper.ellipse(x, y, rx, ry);
        break;
      case "image":
        var src = props.src,
            x = props.x,
            y = props.y,
            width = props.width,
            height = props.height;

        element = findedParent.paper.image(src, x, y, width, height);
        break;
      case "path":
        var d = props.d;

        element = findedParent.paper.path(d);
        break;
      case "rect":
        var x = props.x,
            y = props.y,
            width = props.width,
            height = props.height,
            r = props.r;

        element = findedParent.paper.rect(x, y, width, height, r);
        break;
      case "text":
        var x = props.x,
            y = props.y,
            text = props.text;

        element = findedParent.paper.text(x, y, text);
        break;
    }

    if (element) {
      if (findedParent.parent.type == "set") findedParent.parent.push(element);
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
  createElement: function createElement(parentId, type, props, callback) {
    var element = Utils.create(parentId, type, props);
    Utils.elements.push({
      type: type,
      props: props,
      callback: callback,
      element: element
    });
    if (callback) callback(element);
    return element;
  },
  createSet: function createSet(parentId, props, callback) {
    var set = Utils.create(parentId, "set", props);
    Utils.elements.push({
      type: "set",
      element: set
    });
    if (callback) callback(set);
    return set;
  },
  updatePaper: function updatePaper(paper, props) {
    var width = props.width,
        height = props.height;

    paper.setSize({ width: width, height: height });
  },
  updateElement: function updateElement(element, type, props) {
    switch (type) {
      case "circle":
        var x = props.x,
            y = props.y,
            r = props.r;

        element.attr({ cx: x, cy: y, r: r });
        break;
      case "ellipse":
        var x = props.x,
            y = props.y,
            rx = props.rx,
            ry = props.ry;

        element.attr({ cx: x, cy: y, rx: rx, ry: ry });
        break;
      case "image":
        var src = props.src,
            x = props.x,
            y = props.y,
            width = props.width,
            height = props.height;

        element.attr({ src: src, x: x, y: y, width: width, height: height });
        break;
      case "path":
        var d = props.d;

        element.attr({ path: d });
        break;
      case "rect":
        var x = props.x,
            y = props.y,
            width = props.width,
            height = props.height,
            r = props.r;

        element.attr({ x: x, y: y, width: width, height: height, r: r });
        break;
      case "text":
        var x = props.x,
            y = props.y,
            text = props.text;

        element.attr({ x: x, y: y, text: text });
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
            if (typeof props[key] === "function") {
              element.unclick();element.click(props.click);
            }
            break;
          case "dblclick":
            if (typeof props[key] === "function") {
              element.undblclick();element.dblclick(props.dblclick);
            }
            break;
          case "drag":
            if (typeof props[key] === "function") {
              element.undrag();element.drag(_extends({}, props.drag));
            }
            break;
          case "glow":
            if (_typeof(props[key]) === "object") element.glow(props.glow);
            break;
          case "hover":
            if (typeof props[key] === "function") {
              element.unhover();element.hover(_extends({}, props.hover));
            }
            break;
          case "hide":
            if (typeof props[key] === "boolean") props.hide ? element.hide() : element.show();
            break;
          case "mousedown":
            if (typeof props[key] === "function") {
              element.unmousedown();element.mousedown(props.mousedown);
            }
            break;
          case "mousemove":
            if (typeof props[key] === "function") {
              element.unmousemove();element.mousemove(props.mousemove);
            }
            break;
          case "mouseout":
            if (typeof props[key] === "function") {
              element.unmouseout();element.mouseout(props.mouseout);
            }
            break;
          case "mouseover":
            if (typeof props[key] === "function") {
              element.unmouseover();element.mouseover(props.mouseover);
            }
            break;
          case "mouseup":
            if (typeof props[key] === "function") {
              element.unmouseup();element.mouseup(props.mouseup);
            }
            break;
          case "rotate":
            if (_typeof(props[key]) === "object") element.rotate(props.attr);
            break;
          case "scale":
            if (_typeof(props[key]) === "object") element.scale(props.animate);
            break;
          case "touchcancel":
            if (typeof props[key] === "function") {
              element.untouchcancel();element.touchcancel(props.touchcancel);
            }
            break;
          case "touchend":
            if (typeof props[key] === "function") {
              element.untouchend();element.touchend(props.touchend);
            }
            break;
          case "touchmove":
            if (typeof props[key] === "function") {
              element.untouchmove();element.touchmove(props.touchmove);
            }
            break;
          case "touchstart":
            if (typeof props[key] === "function") {
              element.untouchstart();element.touchstart(props.touchstart);
            }
            break;
          case "transform":
            if (_typeof(props[key]) === "object" || typeof props[key] === "array") element.transform(props.transform);
            break;
          case "translate":
            if (_typeof(props[key]) === "object") element.translate(props.translate);
            break;
        }
      }
    }
    return element;
  },
  removePaper: function removePaper(paper) {
    var papers = Utils.papers.filter(function (ele) {
      return ele === paper;
    });
    if (papers.length > 0) {
      papers[0].remove();
    }
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
  papers: [],
  elements: []
};

module.exports = Utils;