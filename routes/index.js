const router = require('express').Router();
const {User} = require('../database/models/users.js');
const db = require('../database/index.js');

router.get('/', (req, res) => {
        return res.status(200).send("Hello");
    }
);

router.get('/users', (req, res) => 
  User.findAll()
    .then(users => res.send('users', {
        users
      }))
    .catch(err => res.status(500))
);

router.post('/create', (req, res) => {
    let { firstname, lastname, email } = req.body;
    let errors = [];
  
    if(!firstname) {
      errors.push({ text: 'Write your firstname' });
    }
    if(!lastname) {
      errors.push({ text: 'Write your lastname' });
    }
    if(!email) {
      errors.push({ text: 'Write your email' });
    }

    if(errors.length > 0) {
      res.send('Give your credentials');
    } else {
       
      User.create({
        id,
        firstname,
        lastname,
        email
      })
        .then(user => res.redirect('/users'))
        .catch(err => res.status(500));
    }
  });

  router.put('/users/:id', (req, res) => {
    const user = User.find( (user) => {
        return user.id === +req.params.id
    });

    res.send(user);
});

router.delete('/users/:id', (req, res) => {
    const user = User.deleteOne( (user) => {
      return user.id === +req.params.id
    });
    res.send(user);
});

module.exports = router;
