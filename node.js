
var util = require('util');
var Property = require('./property');
var Pattern = require('./pattern');
var utils = require('./utils');

function Node(options){
    this.property=[];
    this._label=[];
    this._identifier='';
    this._values={};
};

Node.prototype.define = function (config){
    if(!util.isArray(config.label)){
	config.label=[config.label];
    }
    if(config.label){
	this._label.push.apply(this._label,config.label);
    }
    if(!config.property || !util.isArray(config.property)){
	return this;
    }
    for(key in config.property){
	var prop=this.createProperty(config.property[key]);
	this.property[config.property[key]]=prop;
    }    
    return this;
}

Node.prototype.createProperty = function (prop){
    if(!(prop instanceof Property)){
	if(typeof(prop)==='string'){
	    prop = {name:prop};
	}
	prop.node=this;
	prop = new Property(prop);
    }
    return prop;
}

/**
   *expects filter object
 */
Node.prototype.withValues = function (filters){
    if(filters){
	var finalFilter={};
	for(key in filters){
	    if(this.property[key] ){
		finalFilter[key]=filters[key];
	    }
	    else{
		util.log(key +' not present in node '+this._label);
	    }
	}
	this._values=finalFilter;
    }
    return this;
}

Node.prototype.isValidProperty = function (propName){
    if(this.property[propName]){
	return true;
    }
}

// identifier
// Type
// extra things
// direction
Node.prototype.relatedTo = function (direction,opts){
    var pattern=new Pattern(this);
    pattern.addNode(this).addRelation(direction,opts);
    return pattern;
}

Node.prototype.identifier = function(identifier){
    this._identifier=identifier;
    return this;
}

module.exports=Node;
