const ckTw = window.Twitch.ext;

var comfyKit = {
  onStart: ( channelInfo ) => {},
  onAuthToken: ( auth ) => {},
  onError: ( error ) => {
    ckTw.rig.log( error );
  },
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
    ckTw.actions.requestIdShare();
  },
  Minimize: () => {
    ckTw.actions.minimize();
  },
  // Bits
  GetBitsProducts: async ( callback ) => {
    try {
      var products = await ckTw.bits.getProducts();
      callback( products );
    }
    catch( err ) {
      callback( [] );
    }
  },
  ShowBitsBalance: () => {
    ckTw.bits.ShowBitsBalance();
  },
  UseBits: ( productId ) => {
    ckTw.bits.useBits( productId );
  },
  TestBits: ( productId ) => {
    ckTw.bits.setUseLoopback( true );
    comfyKit.isTestBits = true;
    ckTw.bits.useBits( productId );
  },
  onBitsComplete: ( transaction ) => {},
  onBitsCancelled: () => {},
  // Channel Follow
  FollowChannel: ( channel ) => {
    ckTw.actions.followChannel( channel );
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

var isFirstAuth = true;
ckTw.onAuthorized(function(auth) {
  // This callback is fired each time the JWT is refreshed.
  userAuth = auth;
  // WARNING: logging this object is not recommended in production
  // console.log( "The JWT that will be passed to the EBS is", auth.token );
  // console.log( "The channel ID is", auth.channelId );
  // console.log( "UserAuth:", userAuth );

  if( isFirstAuth ) {
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
          comfyKit.onStart( channelInfo );
        }
      });
    }
  }

  comfyKit.onAuthToken( userAuth );

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

ckTw.onContext( function( context, props ) {
  // "props" contains an array of strings naming the context properties that were changed.
  userContext = context;
  console.log( "Context:", userContext );
  if( props.contains( "isFullscreen" ) ) {
    comfyKit.onFullscreen( context[ "isFullscreen" ] );
  }
  if( props.contains( "isMuted" ) ) {
    comfyKit.onMute( context[ "isMuted" ] );
  }
  if( props.contains( "isPaused" ) ) {
    comfyKit.onPause( context[ "isPaused" ] );
  }
  if( props.contains( "volume" ) ) {
    comfyKit.onVolume( context[ "volume" ] );
  }
  if( props.contains( "game" ) ) {
    comfyKit.onGameChanged( context[ "game" ] );
  }
  if( props.contains( "isTheatreMode" ) ) {
    comfyKit.onTheaterMode( context[ "isTheatreMode" ] );
  }
  if( props.contains( "theme" ) ) {
    comfyKit.onLightDarkMode( context[ "theme" ] );
  }
  if( props.contains( "videoResolution" ) ) {
    comfyKit.onVideoResolution( context[ "videoResolution" ] );
  }
  if( props.contains( "hostingInfo" ) ) {
    comfyKit.onHost( context[ "hostingInfo" ].hostedChannelId );
  }
  if( props.contains( "videoResolution" ) ) {
    comfyKit.onVideoResolution( context[ "videoResolution" ] );
  }
});

ckTw.onError( function( error ) {
  console.error( "Extension Error:", error );
  comfyKit.onError( error );
});

ckTw.onHighlightChanged( function( isHighlighted ) {
  console.log( "Extension hover highlight:", isHighlighted );
  // TODO: Implement this!
  comfyKit.onHover( isHighlighted );
});

ckTw.onPositionChanged(function( position ) {
  console.log( "Extension position in % from the top-left:", position.x / 100.0, position.y  / 100.0 );
  comfyKit.onPosition( position );
});

// Required and only applies to for Mobile extensions
ckTw.onVisibilityChanged( function( isVisible, context ) {
  console.log( "Extension visibility:", isVisible );
  comfyKit.onVisibility( isVisible );
});

// --- Available Actions ---
// ckTw.actions.requestIdShare(); // opens a prompt for users to share their identity
// ckTw.actions.minimize(); // causes your video-component or video-overlay extension to be minimized
// ckTw.actions.onFollow(function(didFollow, channelName) {
//
// }); // invoked whenever a user completes an interaction prompted by the followChannel action
// ckTw.actions.followChannel("ChannelName"); // prompts users to follow the specified channel, with a dialog controlled by Twitch



const environment = ckTw.environment;
const version = ckTw.version;
console.log( "Environment:", environment );
console.log( "Version:", version );

// --- Twitch Ext Configurations ---
// Configurations in format: {version: string, content: string}|undefined
var configGlobal = ckTw.configuration[ "global" ];
var configDev = ckTw.configuration[ "developer" ];
var configChannel = ckTw.configuration[ "broadcaster" ];
ckTw.configuration.onChanged( function() {
  // Called when Ext Configuration is updated
  console.log( "Configuration Updated" );
  configGlobal = ckTw.configuration[ "global" ];
  configDev = ckTw.configuration[ "developer" ];
  configChannel = ckTw.configuration[ "broadcaster" ];
  comfyKit.onChannelConfig( configChannel );
  comfyKit.onGlobalConfig( configGlobal );
  comfyKit.onDeveloperConfig( configDev );
});
console.log( "Global Config:", configGlobal );
console.log( "Developer Config:", configDev );
console.log( "Channel Config:", configChannel );

// "version" - 1.1.1 semantic string
// "content" - string-encoded configuration
function setChannelConfig( version, content ) {
  console.log( "Updating Configuration:", version, content );
  ckTw.configuration.set(
    "broadcaster", // This is the only valid value
    version,
    content
  );
}



// --- Twitch Ext Feature Flags ---
const isChatEnabled = ckTw.features.isChatEnabled;
ckTw.features.onChanged( function( changed ) {
  // Called when Ext Features is changed
  // "changed" is a string-array of feature flags
});
console.log( "isChatEnabled:", isChatEnabled );


ckTw.actions.onFollow( function() {
  comfyKit.onFollowComplete( didFollow, channelName );
});

// ckTw.bits - Bits in Ext
ckTw.bits.onTransactionComplete( function( transaction ) {
  if( comfyKit.isTestBits ) {
    ckTw.bits.setUseLoopback( false );
    comfyKit.isTestBits = false;
  }
  // TODO: Verify JWT token
  comfyKit.onBitsComplete( transaction );
});

ckTw.bits.onTransactionCancelled( function() {
  if( comfyKit.isTestBits ) {
    ckTw.bits.setUseLoopback( false );
    comfyKit.isTestBits = false;
  }
  comfyKit.onBitsCancelled();
});

window.ComfyKit = comfyKit;
