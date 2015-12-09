$(function(){
  
  var access_token;
  var code;

  $('#knapp').on('click', function(){
    var clientId = localStorage.getItem('clientid') || $('#client-id').val();
    if (clientId && clientId.length > 0){
      var authUrl = 'https://github.com/login/oauth/authorize?client_id=e6748fe32943652790db&redirect_uri=http://oauthis.azurewebsites.net/index.html';
      window.location.replace(authUrl);
      localStorage.setItem('clientid', clientId);
    }
    else {
      alert('Du måste ange client Id');
    }
  });

  $('#sendCode').on('click', function(){
    var clientId = localStorage.getItem('clientid') || $('#client-id').val();
    if (!clientId || clientId.length == 0) {
      alert('Client-Id saknas');
      return false;
    }
    var clientSecret = localStorage.getItem('clientsecret') || $('#client-secret').val();
    if (!clientSecret || clientSecret.length == 0) {
      alert('Client-secret saknas');
      return false;
    }
    else {
      localStorage.setItem('clientsecret', clientSecret);
    }
    $.post('https://github.com/login/oauth/access_token',{
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: 'http://oauthis.azurewebsites.net/index.html'
    }, function(){});
  });

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  code = getParameterByName('code');
  if (code) {
    $('#message').text("You've received a code: " + code);
  }
  
  access_token = getParameterByName('access_token');
  if (access_token) {
    $('#message').text("You've received a token: " + access_token)
  }

})
      