# TwitchComfyKit
We built this Twitch Extensions Starter Kit live on Twitch!

### Quickstart ###
1. Download this repository `git clone https://github.com/instafluff/TwitchComfyKit.git`
2. **your_files** contains the starter Extension files
3. Edit **comfykit.js** for Extension-related functionality
4. Run `npm run package` to zip and upload to the Developer Dashboard
5. You made a Twitch Extension!


## Instafluff ##
> *Come and hang out with us at the Comfiest Corner on Twitch!*

> https://twitch.tv/instafluff

> https://twitter.com/instafluffTV

## Credits ##
Thank you too all the participants of this project!

**Instafluff, Instafriend, katori15, RIKACHET, MacabreMan2, zivivi1, Patchshifter, That_MS_Gamer, Kyoslilmonster, Pixelgourmet, trufflette, mrkinix, villainthegreat, Deitypotato, MalForTheWin, momoske364, NinjaFalcon_2, nallaj, ElysiaGriffin, Abbyfabby, AntiViGames, al1sa074, UnconventionalBeing, lizardqueen, bloom_molly, rdmusser, Flippo13, bobthebuilderrrrr1, TotallyTerribleTaters, DEAD_P1XL, Chlapicek99, ravavyr, whistikk, thoastyk, HonestDanGames, MerlinLeWizard, VoiceOfGrog, Eragoth186, sciondragons, etisdew, Outfr0st, Chibigirl24, WhizardXL, Kr1999, mallesbixie, ultimation1, TheHungerService, Replemish, DevMerlin, pipskidoodle, Lord_of_Conquest, oto_9717, sheets2004, TheGeekGeneration, ConradReuter, MrRayKoma, Pearcington, LuckyPheathers, Betha, OhScee, koukris, BountyHunterLani, smellycats94, kingswerv, Teaky, Hugginator, SomaPills, PokemoHero, smilesandcode, DorkzillaI, MoltenSnowman, ERZ_TCat, valrossenOliver, Yosravi, Clarkio, clauzzzz, mrbinary001, chrishcode, Thedudeskee, DavidTheNewKid, malfunct, FuriousFur, DrArtemi, sparky_pugwash, anon_viewer, 土井津仁, UrbanNights, Riptidesan, zment, computernerd87, DoctorArgus, kpopsim, Nbmatt, codeheir, KevinTheUnicorn8, florants, quackman3, HeapSpray, thewrecker1080p, Kara_Kim, HunWalk, clubhouse13, JoeShimHae**

## Instructions ##

### Getting Started ###
1. Install NodeJS - [https://nodejs.org/en/](https://nodejs.org/en/)
2. Open the directory in a Command Prompt/Terminal
3. Install Dependencies: `npm install`
4. Create a file named `.env` that looks like this:
```javascript
PORT=8000 # You can change this to any port you wish
```
5. Run Server: `npm start`
6. View the extension from your web browser! [Panel: http://localhost:8000/panel.html](http://localhost:8000) [Video Component: http://localhost:8000/video_component.html](http://localhost:8000/video_component.html)
7. Look at **comfykit.js** for how to get started with Twitch Extension functionality!

### Extension Prototyping ###
The easiest way to setup the elements and layout of your extension is via Twitch's Sandbox and then Download the code.
1. Visually setup your extension via Sandbox: [https://glass.twitch.tv/extensions/sandbox](https://glass.twitch.tv/extensions/sandbox)
2. Remove all starter code inside **viewer.js**
3. Download the code
4. Extract the zip into the **your_files** folder (overwrite the existing files)
5. Add **comfykit.js** and replace the link to JQuery in your panel or video component to the Twitch extension URL like this:
```javascript
<script src="https://extension-files.twitch.tv/live-extensions/jquery.min.js"></script>
<script src="comfykit.js"></script>
```
6. Look at **comfykit.js** for how to get started with Twitch Extension functionality!

### Uploading to the Twitch Developer Dashboard ###
To package your Extension project, simply run `npm run package` from the Command Prompt/Terminal and it will zip all files in the **your_files** folder into a file called **uploadthis.zip**. Each time you update your extension, you can package your code using this command.
To upload to Twitch:
1. Create the Twitch Extension project in the Dashboard: [https://dev.twitch.tv/dashboard](https://dev.twitch.tv/dashboard)
2. Go to the Version tab and click Manage, then go to Version Assets
3. Choose File and select the **uploadthis.zip** file and click Upload Assets
4. Finally in Version Status, click Move to Hosted Test to make your Extension available in your Twitch Channel Dashboard (https://www.twitch.tv/[YOUR_USERNAME]/dashboard/extensions). You can install and add your uploaded Extension the same way you would add other extensions from this Dashboard page.

## Twitch Extension FAQ ##
How to Use Extensions Guide: [https://help.twitch.tv/customer/portal/articles/2861187-how-to-use-extensions](https://help.twitch.tv/customer/portal/articles/2861187-how-to-use-extensions)
