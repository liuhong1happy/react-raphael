const Raphael = require('raphael');
const React,{Component} = require('react');
const ReactDOM = require('react-dom');

var Utils = {
    createPaper:function(container,props){
        var { width,height } = props;
        Utils.paper = Raphael(container,width,height);
        return paper;
    },
    create:function(type,props){
        var element = null;
        switch(type){
            case "set":
                element = Utils.paper.set();
            case "circle":
                var {x,y,r} = props;
                element = Utils.paper.circle(circle);
                break;
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
    createSet:function(){
        var set = Utils.createElement("set");
        Utils.elements.push({
            type: "set",
            element: set,
            callback: callback
        })
        return set;
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

class Paper extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount(){
        var container = ReactDOM.findDOMNode(this.refs.container);
        var paper = Utils.createPaper(container,this.props);
        this.paper = paper;
        this.setState({
            loading: true
        })
    }
    componentWillUnmount(){
         this.paper.remove();
    }
    genElementsContainer(){
        if(this.state.loading){
            return (<div className="elements-container">
                        {this.props.children}
                    </div>)
        }else{
            return (<div className="elements-container"></div>)
        }
    }
    render(){
        var eleContainer = this.genElementsContainer();
        return (<div className="react-raphael">
                    {eleContainer}
                    <div ref="container" className="paper-container"></div>
                </div>)
    }
}

class Set extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount(){
        var set = Utils.createSet();
        this.set = set;
        this.onCreatedElement = this.onCreatedElement.bind(this);
        this.setState({
            loading: true
        })
    }
    componentWillUnmout(){
        Utils.removeSet(this.set);
    }
    onCreatedElement(element){
        this.set.push(element);
    }
    render(){
        if(this.state.loading){
            var children = this.props.children || [];
            var isArray = children instanceof Array;
		    if(!isArray) children = [children];
            for(var i=0;i<children.length;i++){
                var element = children[i];
                element.props.onCreatedElement = this.onCreatedElement;
            }
            return (<div className="raphael-set">{children}</div>)
        }else{
            return (<div className="raphael-set"></div>)
        }
    }
}

class Circle extends Component {
    componentDidMount(){
        var element = Utils.createElement("circle",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
    render(){
        return (<div className="raphael-circle"></div>)
    }    
}

module.exports = {
    Paper: Paper,
    Set: Set,
    Circle: Circle,
    Utils: Utils
}