"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var ReactDOM = require("react-dom");
var Utils = require("./utils");

var Paper = function (_React$Component) {
    _inherits(Paper, _React$Component);

    function Paper(props) {
        _classCallCheck(this, Paper);

        var _this = _possibleConstructorReturn(this, (Paper.__proto__ || Object.getPrototypeOf(Paper)).call(this, props));

        _this.state = {
            loaded: false
        };
        return _this;
    }

    _createClass(Paper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var container = ReactDOM.findDOMNode(this.refs.container);
            var paper = Utils.createPaper(container, this.props);
            this.paper = paper;
            this.setState({
                loaded: true,
                id: paper.id
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            Utils.updatePaper(this.paper, this.props);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.paper.remove();
        }
    }, {
        key: "getPaper",
        value: function getPaper() {
            return this.paper;
        }
    }, {
        key: "genElementsContainer",
        value: function genElementsContainer() {
            if (this.state.loaded) {
                return React.createElement(
                    "div",
                    { className: "raphael-paper", "data-id": this.state.id },
                    this.props.children
                );
            } else {
                return React.createElement("div", { className: "raphael-paper" });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var eleContainer = this.genElementsContainer();

            var _props$container = this.props.container,
                style = _props$container.style,
                className = _props$container.className,
                others = _objectWithoutProperties(_props$container, ["style", "className"]);

            return React.createElement(
                "div",
                { className: "react-raphael" },
                eleContainer,
                React.createElement("div", _extends({ ref: "container", className: "paper-container " + className, style: style }, others))
            );
        }
    }]);

    return Paper;
}(React.Component);

Paper.propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    viewbox: React.PropTypes.string,
    container: React.PropTypes.object
};
Paper.defaultProps = { x: 0, y: 0, width: 100, height: 100, container: { style: {}, className: "" }, viewbox: "" };

var Set = function (_React$Component2) {
    _inherits(Set, _React$Component2);

    function Set(props) {
        _classCallCheck(this, Set);

        var _this2 = _possibleConstructorReturn(this, (Set.__proto__ || Object.getPrototypeOf(Set)).call(this, props));

        _this2.state = {
            loaded: false
        };
        return _this2;
    }

    _createClass(Set, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var root = ReactDOM.findDOMNode(this.refs.root);
            var parentId = root.parentElement.getAttribute("data-id");
            var set = Utils.createSet(parentId, this.props, this.handleLoad.bind(this));
            this.set = set;
            this.setState({
                loaded: true,
                id: set.id
            });
        }
    }, {
        key: "getSet",
        value: function getSet() {
            return this.set;
        }
    }, {
        key: "handleLoad",
        value: function handleLoad(set) {
            if (this.props.load) {
                this.props.load(set);
            }
        }
    }, {
        key: "componentWillUnmout",
        value: function componentWillUnmout() {
            Utils.removeSet(this.set);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.loaded) {
                return React.createElement(
                    "div",
                    { ref: "root", className: "raphael-set", "data-id": this.state.id },
                    this.props.children
                );
            } else {
                return React.createElement("div", { ref: "root", className: "raphael-set", "data-id": this.state.id });
            }
        }
    }]);

    return Set;
}(React.Component);

var Element = function (_React$Component3) {
    _inherits(Element, _React$Component3);

    function Element(props) {
        _classCallCheck(this, Element);

        var _this3 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, props));

        _this3.state = {
            loaded: false
        };
        return _this3;
    }

    _createClass(Element, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var root = ReactDOM.findDOMNode(this.refs.root);
            var parentId = root.parentElement.getAttribute("data-id");
            var element = Utils.createElement(parentId, this.props.type, this.props, this.handleLoad.bind(this));
            this.element = element;
            this.setState({
                loaded: true
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            Utils.updateElement(this.element, this.props.type, this.props, this.handleUpdate.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            Utils.removeElement(this.element);
        }
    }, {
        key: "getElement",
        value: function getElement() {
            return this.element;
        }
    }, {
        key: "handleLoad",
        value: function handleLoad(element) {
            if (this.props.load) {
                this.props.load(element);
            }
        }
    }, {
        key: "handleUpdate",
        value: function handleUpdate(element) {
            if (this.props.update) {
                this.props.update(element);
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.loaded) return null;
            return React.createElement("div", { ref: "root", className: "raphael-" + this.props.type });
        }
    }]);

    return Element;
}(React.Component);

var Circle = function (_React$Component4) {
    _inherits(Circle, _React$Component4);

    function Circle() {
        _classCallCheck(this, Circle);

        return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
    }

    _createClass(Circle, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "circle" }, this.props));
        }
    }]);

    return Circle;
}(React.Component);

Circle.propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    r: React.PropTypes.number
};
Circle.defaultProps = { x: 0, y: 0, r: 10 };

var Ellipse = function (_React$Component5) {
    _inherits(Ellipse, _React$Component5);

    function Ellipse() {
        _classCallCheck(this, Ellipse);

        return _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).apply(this, arguments));
    }

    _createClass(Ellipse, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "ellipse" }, this.props));
        }
    }]);

    return Ellipse;
}(React.Component);

Ellipse.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, rx: React.PropTypes.number, ry: React.PropTypes.number };
Ellipse.defaultProps = { x: 0, y: 0, rx: 10, ry: 20 };

var Image = function (_React$Component6) {
    _inherits(Image, _React$Component6);

    function Image() {
        _classCallCheck(this, Image);

        return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
    }

    _createClass(Image, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "image" }, this.props));
        }
    }]);

    return Image;
}(React.Component);

Image.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, src: React.PropTypes.string, width: React.PropTypes.number, height: React.PropTypes.number };
Image.defaultProps = { x: 0, y: 0, src: "", width: 0, height: 0 };

var Path = function (_React$Component7) {
    _inherits(Path, _React$Component7);

    function Path() {
        _classCallCheck(this, Path);

        return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
    }

    _createClass(Path, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "path" }, this.props));
        }
    }]);

    return Path;
}(React.Component);

Path.propTypes = { d: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]) };
Path.defaultProps = { d: "M0,0L0,0Z" };

var Rect = function (_React$Component8) {
    _inherits(Rect, _React$Component8);

    function Rect() {
        _classCallCheck(this, Rect);

        return _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).apply(this, arguments));
    }

    _createClass(Rect, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "rect" }, this.props));
        }
    }]);

    return Rect;
}(React.Component);

Rect.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, width: React.PropTypes.number, height: React.PropTypes.number, r: React.PropTypes.number };
Rect.defaultProps = { x: 0, y: 0, width: 0, height: 0, r: 0 };

var Print = function (_React$Component9) {
    _inherits(Print, _React$Component9);

    function Print() {
        _classCallCheck(this, Print);

        return _possibleConstructorReturn(this, (Print.__proto__ || Object.getPrototypeOf(Print)).apply(this, arguments));
    }

    _createClass(Print, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "print" }, this.props));
        }
    }]);

    return Print;
}(React.Component);

Print.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, text: React.PropTypes.string, fontFamily: React.PropTypes.string };
Print.defaultProps = { x: 0, y: 0, text: "", fontFamily: "Arial" };

var Text = function (_React$Component10) {
    _inherits(Text, _React$Component10);

    function Text() {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
    }

    _createClass(Text, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.element.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Element, _extends({ ref: "element", type: "text" }, this.props));
        }
    }]);

    return Text;
}(React.Component);

Text.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, text: React.PropTypes.string };
Text.defaultProps = { x: 0, y: 0, text: "" };

var Line = function (_React$Component11) {
    _inherits(Line, _React$Component11);

    function Line() {
        _classCallCheck(this, Line);

        return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
    }

    _createClass(Line, [{
        key: "getElement",
        value: function getElement() {
            return this.refs.path.getElement();
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                x1 = _props.x1,
                x2 = _props.x2,
                y1 = _props.y1,
                y2 = _props.y2,
                animate = _props.animate,
                attr = _props.attr,
                others = _objectWithoutProperties(_props, ["x1", "x2", "y1", "y2", "animate", "attr"]);

            if (animate) {
                if (animate.anim) {
                    for (var key in animate.anim) {
                        animate.anim[key].x1 = animate.anim[key].x1 || x1;
                        animate.anim[key].x2 = animate.anim[key].x2 || x2;
                        animate.anim[key].y1 = animate.anim[key].y1 || y1;
                        animate.anim[key].y2 = animate.anim[key].y2 || y2;
                        animate.anim[key].path = ["M", animate.anim[key].x1, animate.anim[key].y1, "L", animate.anim[key].x2, animate.anim[key].y2];
                    }
                } else {
                    animate.x1 = animate.x1 || x1;
                    animate.x2 = animate.x2 || x2;
                    animate.y1 = animate.y1 || y1;
                    animate.y2 = animate.y2 || y2;
                    animate.path = ["M", animate.x1, animate.y1, "L", animate.x2, animate.y2];
                }
            }
            if (attr) {
                attr.x1 = attr.x1 || x1;
                attr.x2 = attr.x2 || x2;
                attr.y1 = attr.y1 || y1;
                attr.y2 = attr.y2 || y2;
                attr.path = ["M", attr.x1, attr.y1, "L", attr.x2, attr.y2];
            }
            return React.createElement(Path, _extends({ ref: "path", d: ["M", x1, y1, "L", x2, y2], attr: attr, animate: animate }, others));
        }
    }]);

    return Line;
}(React.Component);

Line.propTypes = { x1: React.PropTypes.number, y1: React.PropTypes.number, x2: React.PropTypes.number, y2: React.PropTypes.number };
Line.defaultProps = { x1: 0, y1: 0, x2: 0, y2: 0 };

module.exports = {
    Paper: Paper,
    Set: Set,
    Element: Element,
    Circle: Circle,
    Ellipse: Ellipse,
    Image: Image,
    Path: Path,
    Print: Print,
    Rect: Rect,
    Text: Text,
    Line: Line
};