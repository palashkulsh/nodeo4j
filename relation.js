

function Relation (opts){
    this._type=opts.type || [];
    this._identifier= opts.identifier || '';
    this._direction =opts.direction || '>';
}

module.exports=Relation;
