const Login = require('../models/LoginModel');
//const login = require('../models/LoginModel');


exports.index = (req, res) =>{
    // para saber se o usuario está logado    
    //console.log(req.session.user);
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
};

exports.register = async function(req, res){
    try{
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
            return res.redirect('back');
            });
            return;
        }
    // só para mostrar como faz por fora
    //if(login.errors.length> 0) sdasudasda
    req.flash('success', 'Seu usuário foi criado com sucesso');
    req.session.save(function() {
    return res.redirect('back');
    });
    } catch(e){
        console.log(e);
       return res.render('404');
    }
};

exports.login = async function(req, res){
    try{
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
            return res.redirect('back');
            });
            return;
        }

    // só para mostrar como faz por fora
    //if(login.errors.length> 0) sdasudasda
    req.flash('success', 'Voce entrou no sistema.');
    req.session.user = login.user;
    req.session.save(function() {
    return res.redirect('back');
    });
    } catch(e){
        console.log(e);
       return res.render('404');
    }
};

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/');
};