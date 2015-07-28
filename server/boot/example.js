module.exports = function(app) {
  var Member = app.models.Member;
  Member.create([
    {username: 'A', email: 'a@a.com', password: 'a'},
    {username: 'B', email: 'b@b.com', password: 'b'},
    {username: 'C', email: 'c@c.com', password: 'c'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

   
    users[0].messengers.create({
      msg: 'A typing',
      date: new Date()
    }, function(err, msg) {
      if (err) throw err;

      console.log('Created messenge:', msg);

    });
	
	users[1].messengers.create({
      msg: 'B typing',
      date: new Date()
    }, function(err, msg) {
      if (err) throw err;

      console.log('Created messenge:', msg);

    });
	
	users[2].messengers.create({
      msg: 'C typing',
      date: new Date()
    }, function(err, msg) {
      if (err) throw err;

      console.log('Created messenge:', msg);

    });

  });
};