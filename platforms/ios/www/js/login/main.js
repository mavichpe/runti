/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var login = {
    root: function () {
        return jQuery('#login');
    },
    logo: function () {
        return jQuery('#login .logo');
    },
    builds: function () {
        return jQuery('#login .builds');
    },
    runti: function () {
        return jQuery('#login .runti-men');
    },
    rayoLogo: function () {
        return jQuery('#login .rayo-logo');
    },
    selectLoginMethod: function () {
        return jQuery('#login .select-login-method');
    },
    loginMethod: function () {
        return jQuery('#login .login-method');
    },
}

var loginApp = {
    loginTween: new TimelineMax({paused: true}),
    initialize: function () {
        loginApp.createTweens();
        loginApp.bindEvents();
        loginApp.showLogin();
//        jQuery('.slide').addClass('no-animate');
        notificationSetup();
    },
    destroy: function () {
        $('.select-login-method').remove();
        $('.login-method').remove();
    },
    initElementsPosition: function () {
        var parentWidth = login.logo().closest('.stage').width();
        var parentHeight = login.logo().closest('ion-view').height() * 1.35;
        TweenMax.to(login.builds(), 0, {left: loginApp.calculatePosition(parentWidth, 800), top: 9});
        TweenMax.to(login.logo(), 0, {opacity: 0, left: loginApp.calculatePosition(parentWidth, 218), top: loginApp.calculatePosition(parentHeight, 300)});
        TweenMax.to(login.runti(), 0, {left: -300, top: '20%'});
        TweenMax.to(login.rayoLogo(), 0, {left: loginApp.calculatePosition(parentWidth, 10), top: loginApp.calculatePosition(parentHeight, 130)});
        TweenMax.to(login.selectLoginMethod(), 0, {opacity: 0, left: loginApp.calculatePosition(parentWidth, 200), top: loginApp.calculatePosition(parentHeight, 50)});
        TweenMax.to(login.loginMethod(), 0, {zIndex: -1, opacity: 0, left: loginApp.calculatePosition(parentWidth, 150), top: loginApp.calculatePosition(parentHeight, 50)});
        TweenMax.to(login.loginMethod().find('> div'), 0, {opacity: 0, marginTop: 40});
    },
    calculatePosition: function (fullvalue, imgSize) {
        var value = fullvalue / 2;
        value = value - (imgSize / 2);
        return value;
    },
    createTweens: function () {
        var root = login.root();
        var rayoLogo = login.rayoLogo();
        var runti = login.runti();
        var logo = login.logo();
        var selectLoginMethod = login.selectLoginMethod();
        var loginMethod = login.loginMethod();

        //login tween
        loginApp.loginTween
                .to(root, 0, {zIndex: 1})
                .to(logo, 0, {opacity: 0})
                .to(logo, 1, {opacity: 1, delay: 0.5})
                .to([logo, rayoLogo], 1, {marginTop: -60, delay: 0.2})
                .to(runti, 1, {left: '30%'})
                .to(selectLoginMethod, 1, {opacity: 1});
        //email login
        var email = loginMethod.find('.email');
        loginApp.loginTween
                .to(selectLoginMethod, 0.5, {opacity: 0, height: 0})
                .to(loginMethod, 0, {zIndex: 2, opacity: 1})
                .to(email, 0.5, {opacity: 1, margin: 0});
        // loginOut tween
        loginApp.loginTween
                .to(root, 0.8, {opacity: 0, marginTop: -30})
                .to(root, 0, {zIndex: -100});
        loginApp.loginTween.addLabel("in", 0);
        loginApp.loginTween.addLabel("emailIn", 4.5);
        loginApp.loginTween.addLabel("emailOut", 5.7);
        loginApp.loginTween.addLabel("hideLogin", 5.7);
        loginApp.loginTween.addLabel("end", 6.5);
    },
    bindEvents: function () {
        Hammer($('.select-login-method .email')).on('tap', function () {
            loginApp.loginTween.tweenFromTo("emailIn", "emailOut");
        });
    },
    showLoginMethod: function (loginMethod) {
        loginApp.loginTween.tweenFromTo(loginMethod + "In", loginMethod + "Out");
    },
    onViewReady: function () {
        loginApp.showLogin();
    },
    showLogin: function () {
        loginApp.loginTween.tweenFromTo("in", "emailIn");
    },
    hideLogin: function () {
        loginApp.loginTween.tweenFromTo("hideLogin", "end");
        setTimeout(function () {
            login.root().hide();
        }, 650)
    },
    cancelLogin: function () {
        loginApp.loginTween.tweenFromTo("emailOut", "emailIn");
    },
    showHome: function () {
//        jQuery('.slide').removeClass('no-animate');
        app.hideLoading();
        loginApp.hideLogin();
        setTimeout(function () {
            app.showHome();
        }, 600);
    }
}

