import React, { useEffect } from 'react';

function FacebookLogin() {
  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1793215161406587', // Replace this!
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.log('Facebook SDK not loaded yet');
      return;
    }

    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Login success!');
        window.FB.api('/me', { fields: 'name,email' }, function (userInfo) {
          console.log('User Info:', userInfo);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
}

export default FacebookLogin;
