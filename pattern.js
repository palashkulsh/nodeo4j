
var util = require('util');

var Node = require('./node');

function Pattern(){
    this._string='';
}
/**
 *makes empty node string when no node provided
 */
Pattern.prototype.addNode = function(node){
    var str=' ( ';
    if(node && node._identifier){
	str+= node._identifier;
    }
    if(node && node._label){
	node._label.forEach(function (eachLabel){
	    str+= ': '+eachLabel;    
	});
    }
    if(node && node.property && Object.keys(node._values).length){
	str+=' { ';
	if(util.isArray(node.property)){
	    var propKeys=Object.keys(node.property);
	    for(var i=0;i<propKeys.length;i++){
		if(typeof node._values[propKeys[i]] !== 'string'){
		    str+= ' '+propKeys[i]+ ': '+node._values[propKeys[i]]+ '';
		}
		else{
		    str+= ' '+propKeys[i]+ ': "'+node._values[propKeys[i]]+ '"';
		}
		
		if(propKeys[i+1] !==undefined && propKeys[i+1] !==null ){
		    str+=' , ';
		}
	    }
	}
	else{
	    // what here?
	}	
	str+=' } '
    }
    str+=')';
    this._string+=str;
    return this;
}

Pattern.prototype.addRelation = function(relation){
    var direction=relation._direction;
    var str='-[ ';
    if(relation._identifier){
	str+=relation._identifier;
    }
    if(relation._type){
	str+=' : '
	if(!util.isArray(relation._type)){
	    relation._type=[relation._type];
	}
	for(var i=0;i<relation._type.length;i++){
	    str+=relation._type[i].toString();
	    if(relation._type[i+1]){
		str+=' | ';
	    }
	}	
    }
    str+=' ]-'
    if(direction){
	var dir=direction.toString();
	dir=dir.trim();
	if(direction===' < '){
	    str=dir+str;
	}
	else{
	    str+=' > ';
	}
    }
    this._string+=str;
    return this;
}

Pattern.prototype.toString = function(){
    return this._string;
}

module.exports = Pattern;
