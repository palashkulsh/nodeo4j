
var util = require('util');
var Node = require('./node');
var relation =require('./relation');
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
    type:['BUYS','buys'],
    identifier:'b',
    direction:'>'
};
var buysRelation = new relation(relopts);
util.log(product.identifier('p'),merchant,customer,category,product.relatedTo(buysRelation).addNode(customer).toString());



})();
