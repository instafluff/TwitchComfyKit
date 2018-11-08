# Sandbox: Hello World Sample

This sample code was downloaded from the Extensions Developer Sandbox(https://dev.twitch.tv/extensions/sandbox). You can use this sample code as the basis for testing an extension, or for personal use.

## Continuing sandbox development in the rig

This readme details how to use the [Developer Rig](https://github.com/twitchdev/developer-rig) to continue development on your extension. You can read about how to get started with the project [here](https://github.com/twitchdev/developer-rig#twitch-extensions-developer-rig).

Prerequisites:
- You have retrieved this sample code from the sandbox by selecting to download it within the UI.
- Developer Rig is installed locally and is running on your machine. Within the rig folder, run `yarn start`. The rig will be hosted on https://localhost.rig.twitch.tv:3000.

These steps will assume downloaded code is at `/Users/twitch/Downloads/sandbox-extension-hello-world` and that the rig is located at `/Users/twitch/developer-rig`. Your paths will differ per your username and folder structures.

1. In the rig running on your machine, create a new extension project.

- Extension Project Name: "Sandbox" (or whatever you like).
— Choose Extension: Create Local Extension
— Extension Types: Video Component, Panel
- Project Folder: /Users/twitch/Downloads/sandbox-extension-hello-world
- Add Code to Project: None (Just Create Project Folder)

2. Click the + button to add a new Panel view.

- Extension Type: Panel
- Viewer Type: Logged-Out Viewer

> Note: you can perform this same step for other extension views, such as components.

3. Navigate to Project Overview tab. Set Front-end Files Location to `.`. Click Host with Rig.

4. Navigate to Extension Views tab. You should see your extension!

## Differences between sandbox and rig

You may notice that the HTML and Javascript downloaded differs from what was being edited. A few things were added to help the extension runs in the rig:

- A script html element referencing `viewer.js` to load your javascript.
- A link html element referencing `style.css` to load styles.
- A script element `<script src="https://localhost.rig.twitch.tv:3000/twitch-ext.js"></script>`. This is required for local extensions.
- Two html files named `panel.html` and `video_component.html`. These are the naming conventions for these views for local extensions.
- Javascript code was updated to contain `twitch.onAuthorized` if it wasn't included. This function is required by extensions to load properly.

## Get extensions support from Twitch Developers and the community

We’re here to help! Start a thread in the [forums](https://discuss.dev.twitch.tv) or send us a [tweet](https://twitter.com/twitchdev).
