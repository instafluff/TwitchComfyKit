var twitch = window.Twitch.ext;

var comfyKit = {
  onStart: ( channelInfo ) => {},
  onAuthToken: ( auth ) => {},
  onError: ( error ) => {},
  onFullscreen: ( isFullscreen ) => {},
  onMute: ( isMuted ) => {},
  onPause: ( isPaused ) => {},
  onVolume: ( volume ) => {},
  onGameChanged: ( game ) => {},
  onPosition: ( position ) => {},
  onTheaterMode: ( isTheaterMode ) => {},
  onLightDarkMode: ( mode ) => {},
  onVideoResolution: ( resolution ) => {},
  onHost: ( channelId ) => {},
  onHover: ( isHovering ) => {},
  onVisibility: ( isVisible ) => {},
  onChannelConfig: ( config ) => {},
  onGlobalConfig: ( config ) => {},
  onDeveloperConfig: ( config ) => {},
  RequestViewerIdentity: () => {
    twitch.actions.requestIdShare();
  },
  Minimize: () => {
    twitch.actions.minimize();
  },
  // Bits
  GetBitsProducts: async ( callback ) => {
    try {
      var products = await twitch.bits.getProducts();
      callback( products );
    }
    catch( err ) {
      callback( [] );
    }
  },
  ShowBitsBalance: () => {
    twitch.bits.ShowBitsBalance();
  },
  UseBits: ( productId ) => {
    twitch.bits.useBits( productId );
  },
  TestBits: ( productId ) => {
    twitch.bits.setUseLoopback( true );
    comfyKit.isTestBits = true;
    twitch.bits.useBits( productId );
  },
  onBitsComplete: ( transaction ) => {},
  onBitsCancelled: () => {},
  // Channel Follow
  FollowChannel: ( channel ) => { // TODO!!!
    twitch.actions.followChannel( channel );
  },
  onFollowComplete: ( didFollow, channelName ) => {},
};

var userAuth = {
  channelId: "", // Channel ID of the page where the extension is iframe embedded
  clientId: "", // Client ID of the extension
  token: null, // JWT that should be passed to any EBS call for authentication.
  userId: "" // Opaque user ID (a globally unique ID that isn't the user's actual twitch ID)
             //    this will be called again with the actual Twitch ID after calling twitch.actions.requestIdShare()
};
var channelInfo = {};

twitch.onAuthorized(function(auth) {
  // This callback is fired each time the JWT is refreshed.
  userAuth = auth;
  console.log( "The JWT that will be passed to the EBS is", auth.token );
  console.log( "The channel ID is", auth.channelId );
  // WARNING: logging this object is not recommended in production
  // console.log( "UserAuth:", userAuth );

  // Retrieve info about the stream
  if( userAuth[ "clientId" ] ) {
    $.ajax({
      url: "https://api.twitch.tv/helix/users?id=" + userAuth[ "channelId" ],
      type: "GET",
      headers: {
        "Client-ID": userAuth[ "clientId" ]
      },
      success: function( result ) {
        if( result[ "data" ].length > 0 ) {
          channelInfo = result[ "data" ][ 0 ];
          console.log( "Channel:", channelInfo );
        }
      }
    });
  }

  // Calls to your custom server can use the JWT token like this:
  // var EBSPath = "/YourServerURL"; // URL Endpoint to your custom "Extension Backend Service" if you set up your own backend server
  // $.ajax({
  //   url: EBSPath,
  //   type: 'GET',
  //   headers: {
  //     'x-extension-jwt': auth.token,
  //   }
  // });
});

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
                  //    - viewer (viewer page, such as the Twitch channel page)
                  //    - dashboard (opened in Twitch dashboard page)
                  //    - config (opened in extension config page)
  playbackMode: "video", // video, audio, remote (e.g. Chromecast), chat-only
  theme: "light", // light / dark
  videoResolution: "", // Resolution of the broadcast.
  volume: 1, // Currently selected player volume between 0 and 1
};

twitch.onContext(function(context, props) {
  // "props" contains an array of strings naming the context properties that were changed.
  userContext = context;
  console.log( "Context:", userContext );
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

// --- Available Actions ---
// twitch.actions.requestIdShare(); // opens a prompt for users to share their identity
// twitch.actions.minimize(); // causes your video-component or video-overlay extension to be minimized
// twitch.actions.onFollow(function(didFollow, channelName) {
//
// }); // invoked whenever a user completes an interaction prompted by the followChannel action
// twitch.actions.followChannel("ChannelName"); // prompts users to follow the specified channel, with a dialog controlled by Twitch



const environment = twitch.environment;
const version = twitch.version;
console.log( "Environment:", environment );
console.log( "Version:", version );

// --- Twitch Ext Configurations ---
// Configurations in format: {version: string, content: string}|undefined
var configGlobal = twitch.configuration[ "global" ];
var configDev = twitch.configuration[ "developer" ];
var configChannel = twitch.configuration[ "broadcaster" ];
twitch.configuration.onChanged( function() {
  // Called when Ext Configuration is updated
  console.log( "Configuration Updated" );
  configGlobal = twitch.configuration[ "global" ];
  configDev = twitch.configuration[ "developer" ];
  configChannel = twitch.configuration[ "broadcaster" ];
});
console.log( "Global Config:", configGlobal );
console.log( "Developer Config:", configDev );
console.log( "Channel Config:", configChannel );

// "version" - 1.1.1 semantic string
// "content" - string-encoded configuration
function setChannelConfig( version, content ) {
  console.log( "Updating Configuration:", version, content );
  twitch.configuration.set(
    "broadcaster", // This is the only valid value
    version,
    content
  );
}



// --- Twitch Ext Feature Flags ---
const isChatEnabled = twitch.features.isChatEnabled;
twitch.features.onChanged( function( changed ) {
  // Called when Ext Features is changed
  // "changed" is a string-array of feature flags
});
console.log( "isChatEnabled:", isChatEnabled );


twitch.actions.onFollow( function() {
  comfyKit.onFollowComplete( didFollow, channelName );
});

// twitch.bits - Bits in Ext
twitch.bits.onTransactionComplete( function( transaction ) {
  if( comfyKit.isTestBits ) {
    twitch.bits.setUseLoopback( false );
    comfyKit.isTestBits = false;
  }
  // TODO: Verify JWT token
  comfyKit.onBitsComplete( transaction );
});

twitch.bits.onTransactionCancelled( function() {
  comfyKit.onBitsCancelled();
});

window.ComfyKit = comfyKit;
