
var ReturnObj=require('./return')

function Relation (opts){
    this._type=opts.type || [];
    this._identifier= opts.identifier || '';
    this._direction =opts.direction || '>';
}

Relation.prototype.returnObj = function (){
    var r  = new ReturnObj(this._identifier);
    return r; 
}

Relation.prototype.distinct = function(){
    var r=new ReturnObj(this._identifier);
    r=r.distinct();
    return r;
}

Relation.prototype.count = function(){
    var r=new ReturnObj(this._identifier);
    r=r.count();
    return r;
}

Relation.prototype.as = function(str){
    var r=new ReturnObj(this._identifier);
    r=r.as(str);
    return r;
}

module.exports=Relation;
