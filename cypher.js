
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
    var str=' WHERE ';
    if(util.isArray(predicate)){
	for(var i=0;i<predicate.length;i++){
	    str+=predicate[i].toString();	    
	    if(predicate[i+1]){
		str+=' AND ';
	    } 
	}
	this._query+=str;
    }
    else{
	this._query+=' WHERE '+predicate.toString();
    }
    return this;
}

Cypher.prototype.orderBy = function(args,order){
    var str=' ORDER BY ';
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
	if(order){
	    var o=order.toString().trim().toLowerCase();
	    console.log(o);
	    if(o==='desc' || o==='descending'){
		str+=' DESC';
	    }
	}
	this._query+=str;
    }
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
	this._query+=str;
    }
    return this;
}


Cypher.prototype.limit = function(limitValue){
    var str='  LIMIT ';
    if(limitValue && Number(limitValue)){ // TODO warning message when non number
	str+=' '+limitValue.toString()+' ';
	this._query+=str;
    }
    return this;
}

Cypher.prototype.skip = function(skipValue){
    var str='  SKIP ';
    if(skipValue && Number(skipValue)){ // // TODO warning message when non number
	str+=' '+skipValue.toString()+' ';
	this._query+=str;
    }
    return this;
}


Cypher.prototype.toString = function(){
    return this._query;
}

module.exports=Cypher;

