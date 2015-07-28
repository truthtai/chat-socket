module.exports = function(Messenger) {
	Messenger.afterSave = function(next){
		Messenger.app.io.emit('msg:Add', this);
		console.log(this);
		next();
	};
	Messenger.observe('after delete', function(ctx, next) {
	  console.log('Deleted '+ 
	    ctx.Model.pluralModelName+'-'+
	    ctx.where.id);
		Messenger.app.io.emit('msg:Delete', ctx.where.id);	
	  next();
	});
	
};
