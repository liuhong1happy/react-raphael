"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Raphael = require("raphael");

var Utils = {
    createPaper: function createPaper(container, props) {
        var width = props.width,
            height = props.height;

        var paper = Raphael(container, width, height);
        if (props.viewbox) {
            var v = props.viewbox.split(" ");
            paper.setViewBox(v[0] || 0, v[1] || 0, v[2] || 0, v[3] || 3, true);
        }
        paper.id = container.id || "paper-" + new Date().valueOf() + "-" + Math.random().toFixed(10);
        Utils.papers.push(paper);
        return paper;
    },
    findParentById: function findParentById(id) {
        var papers = Utils.papers.filter(function (ele) {
            return ele.id == id;
        });
        if (papers.length > 0) {
            return {
                parent: papers[0],
                paper: papers[0]
            };
        } else {
            var sets = Utils.elements.filter(function (ele) {
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
                {
                    element = findedParent.paper.set();
                    element.id = "set-" + new Date().valueOf() + "-" + Math.random().toFixed(10);
                    break;
                }
            case "circle":
                {
                    var x = props.x,
                        y = props.y,
                        r = props.r;

                    element = findedParent.paper.circle(x, y, r);
                    break;
                }
            case "ellipse":
                {
                    var _x = props.x,
                        _y = props.y,
                        rx = props.rx,
                        ry = props.ry;

                    element = findedParent.paper.ellipse(_x, _y, rx, ry);
                    break;
                }
            case "image":
                {
                    var src = props.src,
                        _x2 = props.x,
                        _y2 = props.y,
                        width = props.width,
                        height = props.height;

                    element = findedParent.paper.image(src, _x2, _y2, width, height);
                    break;
                }
            case "path":
                {
                    var d = props.d;

                    if (!d || d.length == 0) d = "M0,0L0,0Z";
                    element = findedParent.paper.path(d);
                    break;
                }
            case "print":
                {
                    var _x3 = props.x,
                        _y3 = props.y,
                        text = props.text,
                        fontFamily = props.fontFamily,
                        fontWeight = props.fontWeight,
                        fontStyle = props.fontStyle,
                        fontStretch = props.fontStretch,
                        fontSize = props.fontSize,
                        letterSpacing = props.letterSpacing;

                    var font = findedParent.paper.getFont(fontFamily, fontWeight, fontStyle, fontStretch);
                    element = findedParent.paper.print(_x3, _y3, text, font, fontSize, letterSpacing);
                    break;
                }
            case "rect":
                {
                    var _x4 = props.x,
                        _y4 = props.y,
                        _width = props.width,
                        _height = props.height,
                        _r = props.r;

                    element = findedParent.paper.rect(_x4, _y4, _width, _height, _r);
                    break;
                }
            case "text":
                {
                    var _x5 = props.x,
                        _y5 = props.y,
                        _text = props.text;

                    element = findedParent.paper.text(_x5, _y5, _text);
                    break;
                }
            default:
                break;
        }

        if (element) {
            if (findedParent.parent.type == "set") {
                element.set = findedParent.parent;
                findedParent.parent.push(element);
            }
        }
        Utils.updateElementProps(element, props);
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

        paper.setSize(width, height);
    },
    updateElementProps: function updateElementProps(element, props) {
        if (element) {
            // fix matrix bug
            element.matrix = Raphael.matrix();
            element.attr("transform", "");
            for (var key in props) {
                switch (key) {
                    case "attr":
                        {
                            if (_typeof(props[key]) === "object") element.attr(props.attr);
                            break;
                        }
                    case "animate":
                        {
                            if (_typeof(props[key]) === "object") element.animate(props.animate);
                            break;
                        }
                    case "animateWith":
                        {
                            if (_typeof(props[key]) === "object") element.animateWith(props.animateWith);
                            break;
                        }
                    case "click":
                        {
                            if (typeof props[key] === "function") {
                                element.unclick();element.click(props.click);
                            }
                            break;
                        }
                    case "data":
                        {
                            if (_typeof(props[key]) === "object") {
                                for (var _key in props.data) {
                                    element.data(_key, props.data[_key]);
                                }element.items = props.data;
                            }
                            break;
                        }
                    case "dblclick":
                        {
                            if (typeof props[key] === "function") {
                                element.undblclick();element.dblclick(props.dblclick);
                            }
                            break;
                        }
                    case "drag":
                        {
                            if (_typeof(props[key]) === "object") {
                                element.undrag();
                                element.drag(props.drag.move, props.drag.start, props.drag.end, props.drag.mcontext, props.drag.scontext, props.drag.econtext);
                            }
                            break;
                        }
                    case "glow":
                        {
                            if (_typeof(props[key]) === "object") element.glow(props.glow);
                            break;
                        }
                    case "hover":
                        {
                            if (_typeof(props[key]) === "object") {
                                element.unhover();
                                element.hover(props.hover.in, props.hover.out, props.hover.icontext, props.hover.ocontext);
                            }
                            break;
                        }
                    case "hide":
                        {
                            if (typeof props[key] === "boolean") props.hide ? element.hide() : element.show();
                            break;
                        }
                    case "mousedown":
                        {
                            if (typeof props[key] === "function") {
                                element.unmousedown();element.mousedown(props.mousedown);
                            }
                            break;
                        }
                    case "mousemove":
                        {
                            if (typeof props[key] === "function") {
                                element.unmousemove();element.mousemove(props.mousemove);
                            }
                            break;
                        }
                    case "mouseout":
                        {
                            if (typeof props[key] === "function") {
                                element.unmouseout();element.mouseout(props.mouseout);
                            }
                            break;
                        }
                    case "mouseover":
                        {
                            if (typeof props[key] === "function") {
                                element.unmouseover();element.mouseover(props.mouseover);
                            }
                            break;
                        }
                    case "mouseup":
                        {
                            if (typeof props[key] === "function") {
                                element.unmouseup();element.mouseup(props.mouseup);
                            }
                            break;
                        }
                    case "rotate":
                        {
                            if (_typeof(props[key]) === "object") {
                                var _props$rotate = props.rotate,
                                    deg = _props$rotate.deg,
                                    cx = _props$rotate.cx,
                                    cy = _props$rotate.cy;
                                element.rotate(deg, cx, cy);
                            }
                            break;
                        }
                    case "scale":
                        {
                            if (_typeof(props[key]) === "object") {
                                var _props$scale = props.scale,
                                    sx = _props$scale.sx,
                                    sy = _props$scale.sy,
                                    _cx = _props$scale.cx,
                                    _cy = _props$scale.cy;
                                element.scale(sx, sy, _cx, _cy);
                            }
                            break;
                        }
                    case "touchcancel":
                        {
                            if (typeof props[key] === "function") {
                                element.untouchcancel();element.touchcancel(props.touchcancel);
                            }
                            break;
                        }
                    case "touchend":
                        {
                            if (typeof props[key] === "function") {
                                element.untouchend();element.touchend(props.touchend);
                            }
                            break;
                        }
                    case "touchmove":
                        {
                            if (typeof props[key] === "function") {
                                element.untouchmove();element.touchmove(props.touchmove);
                            }
                            break;
                        }
                    case "touchstart":
                        {
                            if (typeof props[key] === "function") {
                                element.untouchstart();element.touchstart(props.touchstart);
                            }
                            break;
                        }
                    case "transform":
                        {
                            if (_typeof(props[key]) === "object") element.transform(props.transform);
                            break;
                        }
                    case "translate":
                        {
                            if (_typeof(props[key]) === "object") element.translate(props.translate.x, props.translate.y);
                            break;
                        }
                }
            }
            // fix raphael #491
            if (Raphael.svg && element.node && element.node.nodeName == "text" && element.node.childNodes.length > 0) {
                setTimeout(function () {
                    if (element.node) {
                        var nodeY = element.node.getAttribute("y");
                        var childDy = element.node.childNodes[0].getAttribute("dy");
                        if (nodeY == childDy) {
                            element.node.childNodes[0].setAttribute("dy", 0);
                        }
                    }
                });
            }
        }
    },
    updateElement: function updateElement(element, type, props, callback) {
        switch (type) {
            case "circle":
                {
                    var x = props.x,
                        y = props.y,
                        r = props.r;

                    element.attr({ cx: x, cy: y, r: r });
                    break;
                }
            case "ellipse":
                {
                    var _x6 = props.x,
                        _y6 = props.y,
                        rx = props.rx,
                        ry = props.ry;

                    element.attr({ cx: _x6, cy: _y6, rx: rx, ry: ry });
                    break;
                }
            case "image":
                {
                    var src = props.src,
                        _x7 = props.x,
                        _y7 = props.y,
                        width = props.width,
                        height = props.height;

                    element.attr({ src: src, x: _x7, y: _y7, width: width, height: height });
                    break;
                }
            case "path":
                {
                    var d = props.d;

                    if (!d || d.length == 0) d = "M0,0L0,0Z";
                    element.attr({ path: d });
                    break;
                }
            case "print":
                {
                    var _x8 = props.x,
                        _y8 = props.y,
                        text = props.text,
                        fontFamily = props.fontFamily,
                        fontWeight = props.fontWeight,
                        fontStyle = props.fontStyle,
                        fontStretch = props.fontStretch,
                        fontSize = props.fontSize,
                        letterSpacing = props.letterSpacing;

                    element.attr({ x: _x8, y: _y8, text: text, "font-style": fontStyle, "font-family": fontFamily, "font-size": fontSize, "font-weight": fontWeight, "font-stretch": fontStretch, "letter-scpacing": letterSpacing });
                    break;
                }
            case "rect":
                {
                    var _x9 = props.x,
                        _y9 = props.y,
                        _width2 = props.width,
                        _height2 = props.height,
                        _r2 = props.r;

                    element.attr({ x: _x9, y: _y9, width: _width2, height: _height2, r: _r2 });
                    break;
                }
            case "text":
                {
                    var _x10 = props.x,
                        _y10 = props.y,
                        _text2 = props.text;

                    element.attr({ x: _x10, y: _y10, text: _text2 });
                    break;
                }

        }
        Utils.updateElementProps(element, props);
        if (callback) callback(element);
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
        Utils.removeElement(set);
    },
    removeElement: function removeElement(element) {
        var elements = Utils.elements.filter(function (ele) {
            return ele.element === element;
        });
        if (elements.length > 0) {
            elements[0].element.remove();
        }
    },
    papers: [],
    elements: []
};

module.exports = Utils;