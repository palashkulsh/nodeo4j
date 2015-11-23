
//var operators = require('./predicate_operation').operators;

/**
   {
   left:this.toPredicateNode(),
   operator:operator,
   right:val
   }
 */
function Predicate(obj){
    this._string='';
    this._left=obj.left?obj.left.toString() || '':undefined;
    this._operator=obj.operator?obj.operator.toString() || '':undefined;
    this._right=obj.right?obj.right.toString() || '':undefined;
    this._string=this.toString();
}

Predicate.prototype.toString = function(){
    var str='';
    if(this._left){
	str+= ' '+this._left.toString();
    }
    if(this._operator){
	str+= ' '+this._operator.toString();
    }
    if(this._right){
	str+= ' '+this._right.toString();
    }
    this._string=str;
    return this._string;
}

Predicate.prototype.toPredicate = function (){
    return this;
}

//Predicate.prototype.and = operators.and;

module.exports=Predicate;
