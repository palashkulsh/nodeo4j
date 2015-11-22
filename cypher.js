
var util = require('util');

function Cypher(){
    this._query='';
}

Cypher.prototype.merge = function(pattern){
    this._query+=' MERGE '+pattern.toString();
    return  this;
}

Cypher.prototype.match = function(pattern){
    this._query+=' MATCH '+pattern.toString();
    return this;
}

Cypher.prototype.where = function(predicate){
    this._query+=' WHERE '+predicate.toString();
    return this;
}

Cypher.prototype.return = function(args){
    var str=' RETURN ';
    if(args){
	if(!util.isArray(args)){
	    args=[args];
	}
	for(var i=0;i<args.length;i++){
	    console.log('*********',args[i].returnObj());
	    if(args[i]){
		str+=' '+args[i].returnObj().toString();
		if(args[i+1]){
		    str+=' , ';
		}
	    }
	}
    }
    this._query+=str;
    return this;
}

Cypher.prototype.toString = function(){
    return this._query;
}

module.exports=Cypher;

