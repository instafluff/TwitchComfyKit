function updateBlock(hex) {
    $('#color').css('background-color', hex);
}

function getRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

$(function() {
    $('#cycle').prop('disabled', false);

    $('#cycle').click(function() {
      updateBlock(getRandomColor());
    });
});

ComfyKit.onStart = ( channelInfo ) => {
  ComfyKit.Log( "Start:", channelInfo );
  ComfyKit.Log( "Settings:", ComfyKit.settings );
};
ComfyKit.onAuthToken = ( auth ) => {
  ComfyKit.Log( "Auth:", auth );
  // save our credentials
  token = auth.token;
  tuid = auth.userId;

  // enable the button
  $('#cycle').removeAttr('disabled');

  setAuth(token);
  $.ajax(requests.get);
};
ComfyKit.onError = ( error ) => {
  ComfyKit.Log( error );
};
ComfyKit.onFullscreen = ( isFullscreen ) => {
  ComfyKit.Log( isFullscreen );
};
ComfyKit.onMute = ( isMuted ) => {
  ComfyKit.Log( isMuted );
};
ComfyKit.onChannelConfig = ( config ) => {
  ComfyKit.Log( config );
};
