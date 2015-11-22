
var util = require('util');
var Node = require('./node');
var relation =require('./relation');
var cypher =require('./cypher');
var pOps=require('./predicate_operation');

var productSchema = {
    label:['product','Product'],
    property:['id','name']
};

var merchantSchema = {
    label:'merchant',
    property:['id']
};


var customerSchema = {
    label:'customer',
    property:['id']
};


var categorySchema = {
    label:'category',
    property:['id','name']
};



//neo=neo.match(neo.node().neo.related().neo.node())


(function(){
    
    var product=new Node().define(productSchema);
    var merchant=new Node().define(merchantSchema).identifier('m');
    var customer=new Node().define(customerSchema).identifier('cu');
    var category=new Node().define(categorySchema).identifier('ca');
    product.withValues({id:23,name:'test node'});
     var relopts={
	type:['BUYS'],
	identifier:'b',
	direction:'>'
    };
    var dealsInOpts={
	type:['DEALS_IN','deals_in'],
	identifier:'b',
	direction:'>'
    };
 
    var buysRelation = new relation(relopts);
    var dealsInRelation =new relation (dealsInOpts);
    util.log(product.identifier('p'),merchant,customer,category,product.relatedTo(buysRelation).toString());
    util.log(merchant.relatedTo(dealsInRelation,category).toString());

    
    var query=new cypher();
    query=query.match(product.relatedTo(buysRelation,customer)).where(product.id.equals(23)).return([product.distinct().count().as('hakooonamatata'),customer.id.as('customer_id'),buysRelation.count()]);
    console.log(query.toString());
})();
