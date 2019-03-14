module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        succesRedirect: '/profiles',
        failureRedirect: '/login',
        failureFlash: true
    }));
    
    /* CONEXION CON IBM
    app.post('/login', function(req, res, next) {
        passport.authenticate(WebAppStrategy.STRATEGY_NAME, function (err, user, info) {
         if (err) {
          return next(err);
         }
         if (!user) {
          req.flash(error.code, info.code);
          return res.redirect(ROP_LOGIN_PAGE_URL + languageQuery + emailInputQuery);
         }
         req.logIn(user, function (err) {
          if (err) {
           return next(err);
          }
          return res.redirect(LANDING_PAGE_URL + languageQuery);
         });
        })(req, res, next);
       });*/

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        succesRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}