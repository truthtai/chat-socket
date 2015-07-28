module.exports = function(Messenger) {
	Messenger.upvote = function(id, cb) {
	  Color.findById(id, function(err, msg) {
	    if(err) return cb(err);
	    msg.votes += 1;
	    msg.save(cb);
	  });
	};
	
	Messenger.remoteMethod('upvote', {
	  isStatic: true,
	  accepts: {arg: 'id', type: 'number'}
	});
};
