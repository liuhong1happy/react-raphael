const Raphael = require('raphael');
var Utils = {
    createPaper:function(container,props){
        var { width,height } = props;
        var paper = Raphael(container,width,height);
        Utils.paper = paper;
        return paper;
    },
    create:function(type,props){
        var element = null;
        switch(type){
            case "set":
                element = Utils.paper.set();
                break;
            case "circle":
                var {x,y,r} = props;
                element = Utils.paper.circle(x,y,r);
                break;
            case "ellipse":
                var {x, y, rx, ry} = props;
                element = Utils.paper.ellipse(x, y, rx, ry);
                break;
            case "image":
                var {src, x, y, width, height} = props;
                element = Utils.paper.image(src, x, y, width, height);
                break;
            case "path":
                var {d} = props;
                element = Utils.paper.path(d);
                break;
            case "rect":
                var {x, y, width, height, r} = props;
                element = Utils.paper.rect(x, y, width, height, r);
                break;
            case "text":
                var {x, y, text} = props;
                element = Utils.paper.text(x, y, text);
                break;
        }
		if(element){
			for(var key in props){
				switch(key){
					case "attr": 
						if(typeof props[key] ==="object") element.attr(props.attr);
						break;
					case "animate": 
						if(typeof props[key] ==="object") element.animate(props.animate);
						break;
					case "animateWith": 
						if(typeof props[key] ==="object") element.animateWith(props.animateWith);
						break;
					case "click": 
						if(typeof props[key] ==="function") element.click(props.click);
						break;
					case "dblclick": 
						if(typeof props[key] ==="function") element.dblclick(props.dblclick);
						break;
					case "drag": 
						if(typeof props[key] ==="function") element.drag(props.drag);
						break;
					case "glow": 
						if(typeof props[key] ==="object") element.glow(props.glow);
						break;
					case "hover": 
						if(typeof props[key] ==="function") element.hover(props.hover);
						break;
					case "hide": 
						if(typeof props[key] ==="boolean") props.hide?element.hide():element.show();
						break;
					case "mousedown": 
						if(typeof props[key] ==="function") element.mousedown(props.mousedown);
						break;
					case "mousemove": 
						if(typeof props[key] ==="function") element.mousemove(props.mousemove);
						break;
					case "mouseout": 
						if(typeof props[key] ==="function") element.mouseout(props.mouseout);
						break;
					case "mouseover": 
						if(typeof props[key] ==="function") element.mouseover(props.mouseover);
						break;
					case "mouseup": 
						if(typeof props[key] ==="function") props.mouseup(element.mouseup);
						break;
					case "rotate": 
						if(typeof props[key] ==="rotate") element.rotate(props.attr);
						break;
					case "scale": 
						if(typeof props[key] ==="scale") element.scale(props.animate);
						break;
					case "touchcancel": 
						if(typeof props[key] ==="function") element.touchcancel(props.touchcancel);
						break;
					case "touchend": 
						if(typeof props[key] ==="function") element.touchend(props.touchend);
						break;
					case "touchmove": 
						if(typeof props[key] ==="function") props.touchmove(element.touchmove);
						break;
					case "touchstart": 
						if(typeof props[key] ==="function") props.touchstart(element.touchstart);
						break;
					case "transform":
						if(typeof props[key] ==="object" || typeof props[key] ==="array") props.transform(element.transform);
						break;
					case "translate":
						if(typeof props[key] ==="object") props.translate(element.translate);
						break;
				}
			}
		}
        return element;
    },
    createElement:function(type,props,callback){
        var element = Utils.create(type,props);
        Utils.elements.push({
            type: type,
            props: props,
            callback: callback,
            element: element
        });
        if(callback) callback(element);
        return element;
    },
    createSet:function(props,callback){
        var set = Utils.create("set",props);
        Utils.elements.push({
            type: "set",
            element: set
        })
        if(callback) callback(set);
        return set;
    },
    updateElement:function(element,type,props){
        switch(type){
            case "circle":
                var {x,y,r} = props;
                element.attr({cx:x,cy:y,r:r});
                break;
            case "ellipse":
                var {x, y, rx, ry} = props;
                element.attr({cx:x,cy:y,rx:rx,ry:ry});
                break;
            case "image":
                var {src, x, y, width, height} = props;
                element.attr({src, x, y, width, height});
                break;
            case "path":
                var {d} = props;
                element.attr({path:d});
                break;
            case "rect":
                var {x, y, width, height, r} = props;
                element.attr(x, y, width, height, r);
                break;
            case "text":
                var {x, y, text} = props;
                element.attr(x, y, text);
                break;
        }
		if(element){
			for(var key in props){
				switch(key){
					case "attr": 
						if(typeof props[key] ==="object") element.attr(props.attr);
						break;
					case "animate": 
						if(typeof props[key] ==="object") element.animate(props.animate);
						break;
					case "animateWith": 
						if(typeof props[key] ==="object") element.animateWith(props.animateWith);
						break;
					case "click": 
						if(typeof props[key] ==="function") element.click(props.click);
						break;
					case "dblclick": 
						if(typeof props[key] ==="function") element.dblclick(props.dblclick);
						break;
					case "drag": 
						if(typeof props[key] ==="function") element.drag(props.drag);
						break;
					case "glow": 
						if(typeof props[key] ==="object") element.glow(props.glow);
						break;
					case "hover": 
						if(typeof props[key] ==="function") element.hover(props.hover);
						break;
					case "hide": 
						if(typeof props[key] ==="boolean") props.hide?element.hide():element.show();
						break;
					case "mousedown": 
						if(typeof props[key] ==="function") element.mousedown(props.mousedown);
						break;
					case "mousemove": 
						if(typeof props[key] ==="function") element.mousemove(props.mousemove);
						break;
					case "mouseout": 
						if(typeof props[key] ==="function") element.mouseout(props.mouseout);
						break;
					case "mouseover": 
						if(typeof props[key] ==="function") element.mouseover(props.mouseover);
						break;
					case "mouseup": 
						if(typeof props[key] ==="function") element.mouseup(props.mouseup);
						break;
					case "rotate": 
						if(typeof props[key] ==="rotate") element.rotate(props.attr);
						break;
					case "scale": 
						if(typeof props[key] ==="scale") element.scale(props.animate);
						break;
					case "touchcancel": 
						if(typeof props[key] ==="function") element.touchcancel(props.touchcancel);
						break;
					case "touchend": 
						if(typeof props[key] ==="function") element.touchend(props.touchend);
						break;
					case "touchmove": 
						if(typeof props[key] ==="function") element.touchmove(props.touchmove);
						break;
					case "touchstart": 
						if(typeof props[key] ==="function") element.touchstart(props.touchstart);
						break;
					case "transform":
						if(typeof props[key] ==="object" || typeof props[key] ==="array") element.transform(props.transform);
						break;
					case "translate":
						if(typeof props[key] ==="object") element.translate(props.translate);
						break;
				}
			}
		}
        return element;
    },
    removeSet:function(set){
        var elements = Utils.elements.filter(function(ele){
            return ele === set;
        })
        if(elements.length>0){
            elements[0].remove();
        }
    },
    removeElement:function(element){
        var elements = Utils.elements.filter(function(ele){
            return ele === element;
        })
        if(elements.length>0){
            elements[0].remove();
        }
    },
    paper: null,
    elements: []
}

module.exports = Utils;