const Raphael = require("raphael");

const Utils = {
    createPaper:function(container,props){
        const { width,height } = props;
        const paper = Raphael(container,width,height);
        if(props.viewbox) {
            const v = props.viewbox.split(" ");
            paper.setViewBox(v[0] || 0, v[1] || 0, v[2] || 0, v[3] || 3, true);
        }
        paper.id = container.id || ("paper-" + new Date().valueOf() +"-"+ Math.random().toFixed(10));
        Utils.papers.push(paper);
        return paper;
    },
    findParentById: function(id){
        const papers = Utils.papers.filter(function(ele){
            return ele.id == id;
        });
        if(papers.length>0){
            return {
                parent: papers[0],
                paper: papers[0]
            };
        }else{
            const sets = Utils.elements.filter(function(ele){
                return ele.element.id == id;
            });
            if(sets.length>0){
                if(!sets[0].element) return sets[0].element;
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
    create:function(parentId,type,props){
        let element = null;
        const findedParent = Utils.findParentById(parentId);
        if(!findedParent.paper) return findedParent.paper;
        switch(type){
        case "set":{
            element = findedParent.paper.set();
            element.id = "set-" + new Date().valueOf() +"-"+ Math.random().toFixed(10);
            break;
        }
        case "circle":{
            const {x,y,r} = props;
            element = findedParent.paper.circle(x,y,r);
            break;
        }
        case "ellipse":{
            const {x, y, rx, ry} = props;
            element = findedParent.paper.ellipse(x, y, rx, ry);
            break;
        }
        case "image":{
            const {src, x, y, width, height} = props;
            element = findedParent.paper.image(src, x, y, width, height);
            break;
        }
        case "path":{
            let {d} = props;
            if(!d || d.length==0) d="M0,0L0,0Z";
            element = findedParent.paper.path(d);
            break;
        }
        case "print":{
            const {x, y, text, fontFamily,fontWeight,fontStyle,fontStretch,fontSize,letterSpacing} = props;
            const font = findedParent.paper.getFont(fontFamily,fontWeight,fontStyle,fontStretch);
            element = findedParent.paper.print(x, y, text,font,fontSize,letterSpacing);
            break;
        }
        case "rect":{
            let {x, y, width, height, r} = props;
            element = findedParent.paper.rect(x, y, width, height, r);
            break;
        }
        case "text":{
            const {x, y, text} = props;
            element = findedParent.paper.text(x, y, text);
            break;
        }
        default: break;
        }

        if(element){
            if(findedParent.parent.type=="set"){
                element.set = findedParent.parent;
                findedParent.parent.push(element);
            }
        }
        Utils.updateElementProps(element,props);
        return element;
    },
    createElement:function(parentId,type,props,callback){
        const element = Utils.create(parentId,type,props);
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
        const set = Utils.create(parentId,"set",props);
        Utils.elements.push({
            type: "set",
            element: set
        });
        if(callback) callback(set);
        return set;
    },
    updatePaper: function(paper,props){
        const {width,height} = props;
        paper.setSize(width, height);
    },
    updateElementProps: function(element,props){
        if(element){
        // fix matrix bug
            element.matrix = Raphael.matrix();
            element.attr("transform","");
            for(const key in props){
                switch(key){
                case "attr":{
                    if(typeof props[key] ==="object") element.attr(props.attr);
                    break;
                }
                case "animate":{
                    if(typeof props[key] ==="object") element.animate(props.animate);
                    break;
                }
                case "animateWith":{
                    if(typeof props[key] ==="object") element.animateWith(props.animateWith);
                    break;
                }
                case "click": {
                    if(typeof props[key] ==="function") {element.unclick();element.click(props.click);}
                    break;
                }
                case "data": {
                    if(typeof props[key] ==="object") {
                        for(const key in props.data)
                            element.data(key,props.data[key]);
                        element.items = props.data;
                    }
                    break;
                }
                case "dblclick": {
                    if(typeof props[key] ==="function") {element.undblclick();element.dblclick(props.dblclick);}
                    break;
                }
                case "drag": {
                    if(typeof props[key] ==="object") {
                        element.undrag();
                        element.drag(props.drag.move, props.drag.start, props.drag.end, props.drag.mcontext, props.drag.scontext, props.drag.econtext );
                    }
                    break;
                }
                case "glow": {
                    if(typeof props[key] ==="object") element.glow(props.glow);
                    break;
                }
                case "hover": {
                    if(typeof props[key] ==="object") {
                        element.unhover();
                        element.hover(props.hover.in, props.hover.out, props.hover.icontext, props.hover.ocontext);
                    }
                    break;
                }
                case "hide": {
                    if(typeof props[key] ==="boolean") props.hide?element.hide():element.show();
                    break;
                }
                case "mousedown": {
                    if(typeof props[key] ==="function") {element.unmousedown();element.mousedown(props.mousedown);}
                    break;
                }
                case "mousemove": {
                    if(typeof props[key] ==="function") {element.unmousemove();element.mousemove(props.mousemove);}
                    break;
                }
                case "mouseout": {
                    if(typeof props[key] ==="function") {element.unmouseout();element.mouseout(props.mouseout);}
                    break;
                }
                case "mouseover": {
                    if(typeof props[key] ==="function") {element.unmouseover();element.mouseover(props.mouseover);}
                    break;
                }
                case "mouseup":{
                    if(typeof props[key] ==="function") {element.unmouseup();element.mouseup(props.mouseup);}
                    break;
                }
                case "rotate":{
                    if(typeof props[key] ==="object") { const {deg, cx, cy} = props.rotate; element.rotate(deg, cx, cy); }
                    break;
                }
                case "scale":{
                    if(typeof props[key] ==="object") { const {sx,sy,cx,cy} = props.scale; element.scale(sx,sy,cx,cy); }
                    break;
                }
                case "stop":{
                    if(typeof props[key] ==="boolean" && props.stop) { element.stop(); }
                    break;
                }
                case "touchcancel":{
                    if(typeof props[key] ==="function") {element.untouchcancel();element.touchcancel(props.touchcancel);}
                    break;
                }
                case "touchend":{
                    if(typeof props[key] ==="function") {element.untouchend();element.touchend(props.touchend);}
                    break;
                }
                case "touchmove":{
                    if(typeof props[key] ==="function") {element.untouchmove();element.touchmove(props.touchmove);}
                    break;
                }
                case "touchstart":{
                    if(typeof props[key] ==="function") {element.untouchstart();element.touchstart(props.touchstart);}
                    break;
                }
                case "transform":{
                    if(typeof props[key] ==="object") element.transform(props.transform);
                    break;
                }
                case "translate":{
                    if(typeof props[key] ==="object") element.translate(props.translate.x,props.translate.y);
                    break;
                }
                }
            }
          // fix raphael #491
            if(Raphael.svg && element.node && element.node.nodeName=="text" && element.node.childNodes.length>0){
                setTimeout(function(){
                    if(element.node){
                        const nodeY = element.node.getAttribute("y");
                        const childDy = element.node.childNodes[0].getAttribute("dy");
                        if(nodeY == childDy){
                            element.node.childNodes[0].setAttribute("dy",0);
                        }
                    }
                });
            }
        }
    },
    updateElement:function(element,type,props,callback){
        switch(type){
        case "circle":{
            const {x,y,r} = props;
            element.attr({cx:x,cy:y,r:r});
            break;
        }
        case "ellipse":{
            const {x, y, rx, ry} = props;
            element.attr({cx:x,cy:y,rx:rx,ry:ry});
            break;
        }
        case "image":{
            const {src, x, y, width, height} = props;
            element.attr({src, x, y, width, height});
            break;
        }
        case "path":{
            let {d} = props;
            if(!d || d.length==0) d="M0,0L0,0Z";
            element.attr({path:d});
            break;
        }
        case "print":{
            const {x,y,text,fontFamily,fontWeight,fontStyle,fontStretch,fontSize,letterSpacing} = props;
            element.attr({x,y,text,"font-style":fontStyle, "font-family":fontFamily,"font-size":fontSize,"font-weight": fontWeight,"font-stretch": fontStretch, "letter-scpacing": letterSpacing});
            break;
        }
        case "rect":{
            const {x, y, width, height, r} = props;
            element.attr({x, y, width, height, r});
            break;
        }
        case "text":{
            const {x, y, text} = props;
            element.attr({x, y, text});
            break;
        }

        }
        Utils.updateElementProps(element,props);
        if(callback) callback(element);
        return element;
    },
    removePaper: function(paper){
        const papers = Utils.papers.filter(function(ele){
            return ele === paper;
        });
        if(papers.length>0){
            papers[0].remove();
        }
    },
    removeSet:function(set){
        Utils.removeElement(set);
    },
    removeElement:function(element){
        const elements = Utils.elements.filter(function(ele){
            return ele.element === element;
        });
        if(elements.length>0){
            elements[0].element.remove();
        }
    },
    papers: [],
    elements: []
};

module.exports = Utils;
