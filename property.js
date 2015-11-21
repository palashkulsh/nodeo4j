

function Property(config){
    if(config){
	if(typeof config === 'string'){
	    this._name=config.toString();
	}
	else{
	    this._name=config.name.toString();
	    if(config.value){
		this._value=config.value
	    }
	}
    }
    else{
	this._name='';
    }
    return this;
}

module.exports =Property;
