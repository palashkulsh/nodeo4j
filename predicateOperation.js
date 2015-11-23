
var Predicate = require('./predicate');

//to convert every type
Number.prototype.toPredicate=function(){
    return new Predicate({left:this.toString()});
}

String.prototype.toPredicate=function(){
    return new Predicate({left:'"'+this.toString()+'"'});
}

//TODO how to create predicate for general object
//dont use general prototype for object as it breaks
// Object.prototype.toPredicate=function(){
//     return new Predicate({left:'"'+this.toString()+'"'});
// }

var predicateOperations={
    binaryMethod: function (operator){
	return function(val){
	    var opts={
		left:this.toPredicate(),
		operator:operator,
		right:val.toPredicate()
	    };
	    return new Predicate(opts);
	}
    },
    prefixUnaryMethod: function (operator){
	return function(){
	    var opts={
		operator:operator,
		right:this.toPredicate()
	    };
	    return new Predicate(opts);
	}
	
    },
    postfixUnaryMethod: function (operator){
	return function(){
	    var opts={
		left:this.toPredicate(),
		operator:operator
	    };
	    return new Predicate(opts);
	}
	
    },
    inMethod: function(){
	return function(val){
	    var opts={
		left:this.toPredicate(),
		operator:' IN ',
		 right:val.toPredicate()
	     };
	     return new Predicate(opts);
	 }
     },

 };

 module.exports=predicateOperations;

 predicateOperations.operators ={
	 isNull     : predicateOperations.postfixUnaryMethod('IS NULL'),
	 isNotNull  : predicateOperations.postfixUnaryMethod('IS NOT NULL'),
	 not : predicateOperations.prefixUnaryMethod('NOT'),
	 or         : predicateOperations.binaryMethod('OR'),
	 and        : predicateOperations.binaryMethod('AND'),
	 equals     : predicateOperations.binaryMethod('='),
	 equal      : predicateOperations.binaryMethod('='),
	 notEquals  : predicateOperations.binaryMethod('<>'),
	 notEqual   : predicateOperations.binaryMethod('<>'),
	 gt         : predicateOperations.binaryMethod('>'),
	 gte        : predicateOperations.binaryMethod('>='),
	 lt         : predicateOperations.binaryMethod('<'),
	 lte        : predicateOperations.binaryMethod('<='),
	 plus       : predicateOperations.binaryMethod('+'),
	 minus      : predicateOperations.binaryMethod('-'),
	 multiply   : predicateOperations.binaryMethod('*'),
	 divide     : predicateOperations.binaryMethod('/'),
	 modulo     : predicateOperations.binaryMethod('%'),
	 leftShift  : predicateOperations.binaryMethod('<<'),
	 rightShift : predicateOperations.binaryMethod('>>'),
	 bitwiseAnd : predicateOperations.binaryMethod('&'),
	 bitwiseNot : predicateOperations.binaryMethod('~'),
	 bitwiseOr  : predicateOperations.binaryMethod('|'),
	 bitwiseXor : predicateOperations.binaryMethod('#'),
	 regex      : predicateOperations.binaryMethod('=~'),
	 iregex     : predicateOperations.binaryMethod('~*'),
	 regexp     : predicateOperations.binaryMethod('REGEXP'),
	 notRegex   : predicateOperations.binaryMethod('!~'),
	 notIregex   : predicateOperations.binaryMethod('!~*'),
	 concat     : predicateOperations.binaryMethod('||'),
	 key        : predicateOperations.binaryMethod('->'),
	 keyText    : predicateOperations.binaryMethod('->>'),
	 path       : predicateOperations.binaryMethod('#>'),
	 pathText   : predicateOperations.binaryMethod('#>>'),
	 like       : predicateOperations.binaryMethod('LIKE'),
	 rlike      : predicateOperations.binaryMethod('RLIKE'),
	 notLike    : predicateOperations.binaryMethod('NOT LIKE'),
	 ilike       : predicateOperations.binaryMethod('ILIKE'),
	 notIlike    : predicateOperations.binaryMethod('NOT ILIKE'),
	 match      : predicateOperations.binaryMethod('@@'),
	 in         : predicateOperations.inMethod,
     notIn      : predicateOperations.notInMethod,
	// between    : predicateOperations.ternaryMethod('BETWEEN', 'AND'),
	// notBetween : predicateOperations.ternaryMethod('NOT BETWEEN', 'AND'),
	// at         : predicateOperations.atMethod,
	// contains   : predicateOperations.binaryMethod('@>'),
	// containedBy : predicateOperations.binaryMethod('<@'),
	// overlap    : predicateOperations.binaryMethod('&&'),
	// slice      : predicateOperations.sliceMethod,
	// cast       : predicateOperations.castMethod,
	// descending : predicateOperations.orderMethod('DESC'),
	// case       : predicateOperations.caseMethod
    };
