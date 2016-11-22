const Raphael = require('raphael');
var Utils = {
    createPaper:function(container,props){
        var { width,height } = props;
        var paper = Raphael(container,width,height);
        paper.id = container.id || ("paper-" + new Date().valueOf() +"-"+ Math.random().toFixed(10))
        Utils.papers.push(paper);
        return paper;
    },
    findParentById: function(id){
        var papers = Utils.papers.filter(function(ele,pos){
            return ele.id == id;
        })
        if(papers.length>0){
            return {
                parent: papers[0],
                paper: papers[0]
            }
        }else{
            var sets = Utils.elements.filter(function(ele,pos){
                return ele.element.id == id;
            })
            if(sets.length>0){
                if(!sets[0].element) return sets[0].element;
                return {
                    parent: sets[0].element,
                    paper: sets[0].element.paper
                }
            }
        }
        return {
            parent: null,
            paper: null
        }
    },
    create:function(parentId,type,props){
        var element = null;
        var findedParent = Utils.findParentById(parentId);
        if(!findedParent.paper) return findedParent.paper;
        switch(type){
            case "set":
                element = findedParent.paper.set();
                element.id = "set-" + new Date().valueOf() +"-"+ Math.random().toFixed(10)
                break;
            case "circle":
                var {x,y,r} = props;
                element = findedParent.paper.circle(x,y,r);
                break;
            case "ellipse":
                var {x, y, rx, ry} = props;
                element = findedParent.paper.ellipse(x, y, rx, ry);
                break;
            case "image":
                var {src, x, y, width, height} = props;
                element = findedParent.paper.image(src, x, y, width, height);
                break;
            case "path":
                var {d} = props;
				if(!d || d.length==0) d="M0,0L0,0Z";
                element = findedParent.paper.path(d);
                break;
            case "print":
                var {x,y,text,fontFamily,fontWeight,fontStyle,fontStretch,fontSize,letterSpacing} = props;
                var font = findedParent.paper.getFont(fontFamily,fontWeight,fontStyle,fontStretch);
                element = findedParent.paper.print(x, y, text,font,fontSize,letterSpacing);
                break;
            case "rect":
                var {x, y, width, height, r} = props;
                element = findedParent.paper.rect(x, y, width, height, r);
                break;
            case "text":
                var {x, y, text} = props;
                element = findedParent.paper.text(x, y, text);
                break;
        }
       
		if(element){
            if(findedParent.parent.type=="set"){
				element.set = findedParent.parent;
				findedParent.parent.push(element);
			}
			for(var key in props){
				switch(key){
					case "attr": 
						if(typeof props[key] ==="object") {
							if(type=="text") setTimeout(function(){ element.attr(props.attr);  });
							else element.attr(props.attr);
						}
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
					case "data":
						if(typeof props[key] ==="object") {
							for(var key in props.data) 
								element.data(key,props.data[key]);
							element.items = props.data;
						}
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
						if(typeof props[key] ==="object") { var {deg, cx, cy} = props.rotate; element.rotate(deg, cx, cy); }
						break;
					case "scale":
						if(typeof props[key] ==="object") { var {sx,sy,cx,cy} = props.scale; element.scale(sx,sy,cx,cy); }
						break;
					case "toBack":
						if(typeof props[key] ==="boolean") if(props.toBack) element.toBack();
						break;
					case "toFront":
						if(typeof props[key] ==="boolean") if(props.toFront)  element.toFront();
						break;
					case "touchcancel": 
						if(typeof props[key] ==="function") element.touchcancel(props.touchcancel);
						break;
					case "touchend": 
						if(typeof props[key] ==="function") element.touchend(props.touchend);
						break;
					case "touchmove": 
						if(typeof props[key] ==="function") element.touchmove(element.touchmove);
						break;
					case "touchstart": 
						if(typeof props[key] ==="function") element.touchstart(element.touchstart);
						break;
					case "transform":
						if(typeof props[key] ==="object" || typeof props[key] ==="array") element.transform(element.transform);
						break;
					case "translate":
						if(typeof props[key] ==="object") element.translate(props.translate.x,props.translate.y);
						break;
				}
			}
			// fix raphael #491
			if(Raphael.svg && element.node && element.node.nodeName=="text" && element.node.childNodes.length>0){
				setTimeout(function(){
					var nodeY = element.node.getAttribute("y");
					var childDy = element.node.childNodes[0].getAttribute("dy");
					if(nodeY == childDy){
						element.node.childNodes[0].setAttribute("dy",0);
					}
				})
			}
		}
        return element;
    },
    createElement:function(parentId,type,props,callback){
        var element = Utils.create(parentId,type,props);
        Utils.elements.push({
            type: type,
            props: props,
            callback: callback,
            element: element
        });
        if(callback) callback(element);
        return element;
    },
    createSet:function(parentId,props,callback){
        var set = Utils.create(parentId,"set",props);
        Utils.elements.push({
            type: "set",
            element: set
        })
        if(callback) callback(set);
        return set;
    },
    updatePaper: function(paper,props){
        var {width,height} = props;
        paper.setSize({width,height});
    },
    updateElement:function(element,type,props,callback){
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
				if(!d || d.length==0) d="M0,0L0,0Z";
                element.attr({path:d});
                break;
            case "print":
                var {x,y,text,fontFamily,fontWeight,fontStyle,fontStretch,fontSize,letterSpacing} = props;
                element.attr({x,y,text,"font-family":fontFamily,"font-size":fontSize});
                break;
            case "rect":
                var {x, y, width, height, r} = props;
                element.attr({x, y, width, height, r});
                break;
            case "text":
                var {x, y, text} = props;
                element.attr({x, y, text});
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
						if(typeof props[key] ==="function") {element.unclick();element.click(props.click);}
						break;
					case "data":
						if(typeof props[key] ==="object") {
							for(var key in props.data) 
								element.data(key,props.data[key]);
							element.items = props.data;
						}
						break;
					case "dblclick": 
						if(typeof props[key] ==="function") {element.undblclick();element.dblclick(props.dblclick);}
						break;
					case "drag": 
						if(typeof props[key] ==="function") {element.undrag();element.drag({...props.drag});}
						break;
					case "glow": 
						if(typeof props[key] ==="object") element.glow(props.glow);
						break;
					case "hover": 
						if(typeof props[key] ==="function") {element.unhover();element.hover({...props.hover});}
						break;
					case "hide": 
						if(typeof props[key] ==="boolean") props.hide?element.hide():element.show();
						break;
					case "mousedown": 
						if(typeof props[key] ==="function") {element.unmousedown();element.mousedown(props.mousedown);}
						break;
					case "mousemove": 
						if(typeof props[key] ==="function") {element.unmousemove();element.mousemove(props.mousemove);}
						break;
					case "mouseout": 
						if(typeof props[key] ==="function") {element.unmouseout();element.mouseout(props.mouseout);}
						break;
					case "mouseover": 
						if(typeof props[key] ==="function") {element.unmouseover();element.mouseover(props.mouseover);}
						break;
					case "mouseup": 
						if(typeof props[key] ==="function") {element.unmouseup();element.mouseup(props.mouseup);}
						break;
					case "rotate": 
						if(typeof props[key] ==="object") { var {deg, cx, cy} = props.rotate; element.rotate(deg, cx, cy); }
						break;
					case "scale":
						if(typeof props[key] ==="object") { var {sx,sy,cx,cy} = props.scale; element.scale(sx,sy,cx,cy); }
						break;
					case "touchcancel": 
						if(typeof props[key] ==="function") {element.untouchcancel();element.touchcancel(props.touchcancel);}
						break;
					case "touchend": 
						if(typeof props[key] ==="function") {element.untouchend();element.touchend(props.touchend);}
						break;
					case "touchmove": 
						if(typeof props[key] ==="function") {element.untouchmove();element.touchmove(props.touchmove);}
						break;
					case "touchstart": 
						if(typeof props[key] ==="function") {element.untouchstart();element.touchstart(props.touchstart);}
						break;
					case "transform":
						if(typeof props[key] ==="object" || typeof props[key] ==="array") element.transform(props.transform);
						break;
					case "translate":
						if(typeof props[key] ==="object") element.translate(props.translate.x,props.translate.y);
						break;
				}
			}
			// fix raphael #491
			if(Raphael.svg && element.node && element.node.nodeName=="text" && element.node.childNodes.length>0){
				setTimeout(function(){
					var nodeY = element.node.getAttribute("y");
					var childDy = element.node.childNodes[0].getAttribute("dy");
					if(nodeY == childDy){
						element.node.childNodes[0].setAttribute("dy",0);
					}
				})
			}
		}
		if(callback) callback(element);
        return element;
    },
    removePaper: function(paper){
        var papers = Utils.papers.filter(function(ele){
            return ele === paper;
        })
        if(papers.length>0){
            papers[0].remove();
        }
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
    papers: [],
    elements: []
}

module.exports = Utils;