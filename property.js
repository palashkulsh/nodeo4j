
var Predicate = require('./predicate');
var pOps=require('./predicate_operation');
var ReturnObj=require('./return')

function Property(config){
    if(config){
	if(typeof config === 'string'){
	    this._name=config.toString();
	}
	else{
	    this._name=config.name.toString();
	    if(config.value){
		this._value=config.value
	    }
	    if(config.node){
		this._node=config.node;
	    }
	}
    }
    else{
	this._name='';
    }
    
    return this;
}

Property.prototype=pOps.operators; // TODO how to add all operators to property in a better way 

Property.prototype.toPredicate = function(){
    return new Predicate({left:this.toString()});
}


Property.prototype.returnObj = function(){
    var r=new ReturnObj(this.toString());
    return r;
}

Property.prototype.toString = function(){
    return this._node._identifier+'.'+this._name;
}


Property.prototype.distinct = function(){
    var r=new ReturnObj(this.toString());
    r=r.distinct();
    return r;
}

Property.prototype.count = function(){
    var r=new ReturnObj(this.toString());
    r=r.count();
    return r;
}

Property.prototype.as = function(str){
    var r=new ReturnObj(this.toString());
    r=r.as(str);
    return r;
}



module.exports =Property;
