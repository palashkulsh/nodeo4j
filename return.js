

function ReturnObj(str){
    this._string=str || '';
}

ReturnObj.prototype.toString = function(){
    return this._string;
}

ReturnObj.prototype.distinct = function(){
    this._string= ' DISTINCT '+this._string; 
    return this;
}

ReturnObj.prototype.returnObj = function(){ 
    return this;
}

ReturnObj.prototype.count = function(){
    this._string= ' COUNT( '+this._string+' ) '; 
    return this;
}

ReturnObj.prototype.as = function(str){
    this._string= str?this._string +' AS '+str:this._string; 
    return this;
}

module.exports=ReturnObj;
