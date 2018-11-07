var twitch = window.Twitch.ext;

const EBSPath = "/YourEBSPath"; // Extension Backend Service

var userAuth = {
  channelId: "", // Channel ID of the page where the extension is iframe embedded
  clientId: "", // Client ID of the extension
  token: null, // JWT that should be passed to any EBS call for authentication.
  userId: "" // Opaque user ID.
};
var userContext = {
  arePlayerControlsVisible: false, // If true, player controls are visible (e.g., due to mouseover).
  bitrate: 0, // Bitrate of the broadcast.
  bufferSize: 0, // Buffer size of the broadcast.
  displayResolution: "", // Display size of the player.
  game: "", // Game being broadcast.
  hlsLatencyBroadcaster: 0, // Number of seconds of latency between the broadcaster and viewer.
  hostingInfo: { hostedChannelId: 0, hostingChannelId: 0 }, // Information about the current channel’s hosting status, or undefined if the channel is not currently hosting.
  isFullScreen: false, // If true, the viewer is watching in fullscreen mode.
  isMuted: false, // If true, the viewer has muted the stream.
  isPaused: false, // If true, the viewer has paused the stream.
  isTheatreMode: false, // If true, the viewer is watching in theater mode.
  language: "en", // Language of the broadcast (e.g., "en").
  mode: "viewer", // Valid Mode Values:
                  //    viewer (viewer page, such as the Twitch channel page)
                  //    dashboard (opened in Twitch dashboard page)
                  //    config (opened in extension config page)
  playbackMode: "video", // video, audio, remote (e.g. Chromecast), chat-only
  theme: "light", // light / dark
  videoResolution: "", // Resolution of the broadcast.
  volume: 1, // Currently selected player volume between 0 and 1
};

twitch.onAuthorized(function(auth) {
  // This callback is fired each time the JWT is refreshed.
  userAuth = auth;
  console.log( "The JWT that will be passed to the EBS is", auth.token );
  console.log( "The channel ID is", auth.channelId );
  $.ajax({
    url: EBSPath,
    type: 'GET',
    headers: {
      'x-extension-jwt': auth.token,
    }
  });
});

twitch.onContext(function(context, props) {
  // "props" contains an array of strings naming the context properties that were changed.
  userContext = context;
});

twitch.onError(function(error) {
  console.error( "Extension Error:", error );
});

twitch.onHighlightChanged(function(isHighlighted) {
  console.log( "Extension hover highlight:", isHighlighted );
  // TODO: Implement this!
});

twitch.onPositionChanged(function(position) {
  console.log( "Extension position in % from the top-left:", position.x / 100.0, position.y  / 100.0 );
});

// Required and only applies to for Mobile extensions
twitch.onVisibilityChanged(function(isVisible, context) {
  console.log( "Extension visibility:", isVisible );
});

// Available Actions
twitch.actions.requestIdShare();
// twitch.actions.minimize();
// twitch.actions.onFollow(function(didFollow, channelName) {
//
// });
// twitch.actions.followChannel("ChannelName");
