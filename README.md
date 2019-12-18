# TwitchComfyKit
We built this Twitch Extensions Starter Kit live on Twitch!

### Quickstart With Dev Rig ###
1. Download **comfykit.zip** from the `download_this` folder in this repository and extract into your project's folder
2. Add **comfykit.js** and replace the link to JQuery to the Twitch extension URL in your `panel.html` (or `video_component.html` or `video_overlay.html`) and `config.html` in the `public` folder like this:
```javascript
<script src="jquery.min.js"></script>
<script src="comfykit.js"></script>
```
3. Run `npm install archiver`
4. Edit **viewer.js** (and **config.js** for configuration) for your Extension-related functionality and see it work in the Dev Rig's **Extension Views** tab
5. When you're ready to publish, run `npm run package` to zip and upload to the Developer Dashboard
6. You made a Twitch Extension!

### Quickstart Without Dev Rig ###
1. Download this repository `git clone https://github.com/instafluff/TwitchComfyKit.git`
2. Run `npm install`
3. Edit **comfykit.js** for Extension-related functionality (**public** contains the starter Extension files)
4. Run `npm run package` to zip and upload to the Developer Dashboard
5. You made a Twitch Extension!


## Instafluff ##
> *Like these projects? The best way to support my open-source projects is by becoming a Comfy Sponsor on GitHub!*

> https://github.com/sponsors/instafluff

> *Come and hang out with us at the Comfiest Corner on Twitch!*

> https://twitch.tv/instafluff

## Credits ##
Thank you too all the participants of this project!

**Instafluff, Instafriend, katori15, RIKACHET, MacabreMan2, zivivi1, Patchshifter, That_MS_Gamer, Kyoslilmonster, Pixelgourmet, trufflette, mrkinix, villainthegreat, Deitypotato, MalForTheWin, momoske364, NinjaFalcon_2, nallaj, ElysiaGriffin, Abbyfabby, AntiViGames, al1sa074, UnconventionalBeing, lizardqueen, bloom_molly, rdmusser, Flippo13, bobthebuilderrrrr1, TotallyTerribleTaters, DEAD_P1XL, Chlapicek99, ravavyr, whistikk, thoastyk, HonestDanGames, MerlinLeWizard, VoiceOfGrog, Eragoth186, sciondragons, etisdew, Outfr0st, Chibigirl24, WhizardXL, Kr1999, mallesbixie, ultimation1, TheHungerService, Replemish, DevMerlin, pipskidoodle, Lord_of_Conquest, oto_9717, sheets2004, TheGeekGeneration, ConradReuter, MrRayKoma, Pearcington, LuckyPheathers, Betha, OhScee, koukris, BountyHunterLani, smellycats94, kingswerv, Teaky, Hugginator, SomaPills, PokemoHero, smilesandcode, DorkzillaI, MoltenSnowman, ERZ_TCat, valrossenOliver, Yosravi, Clarkio, clauzzzz, mrbinary001, chrishcode, Thedudeskee, DavidTheNewKid, malfunct, FuriousFur, DrArtemi, sparky_pugwash, anon_viewer, 土井津仁, UrbanNights, Riptidesan, zment, computernerd87, DoctorArgus, kpopsim, Nbmatt, codeheir, KevinTheUnicorn8, florants, quackman3, HeapSpray, thewrecker1080p, Kara_Kim, HunWalk, clubhouse13, JoeShimHae**

Thanks to everyone that helped add the Usernames to Twitch IDs functionality as a utility!

**Instafriend, Instafluff, ChatTranslator, Monkeyshoe10, Chibigirl24, BeadHappy, MacabreMan2, koralina_211, PaintHappy, stresstest, QeraiX, isaischannel, losthewar, zivivi1, MisakaGUN, DevMerlin, jellydance, OhScee, LuRiMer313, That_MS_Gamer, bloom_molly, knugensugen, trufflette, PokemoHero, sparky_pugwash, raleenakaos, brandan_f, igotinfected, ItsNaomiArt, Algoll, Rlchibi, EyeTeeGirl93, Kushimitama, malfunct, i4_insert_mode, blakeparsons12, smilesandcode, BungalowGlow, qerwtr546, fjaueiwgfbueawhnfa, FuriousFur, foxotic, DrJavaSaurus, kukji232, VoiceOfGrog, CrimsonKnightZero, cubbieblue4life, earnedplaces, mrkinix, MartyTheeMartian, kingswerv, Kyoslilmonster, GarethHubball, foobarius1, Zoraketh, CodeAndSystemSecurity, TheGrumpyGameDev, essenbee, Nordegraf, Keifleaf, gdphantom9867, Ayybiel, nallaj, NULLYUKI, KitAnnLIVE, DEAD_P1XL**

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
4. Extract the zip into the **public** folder (overwrite the existing files)
5. Add **comfykit.js** and replace the link to JQuery in your panel or video component to the Twitch extension URL like this:
```javascript
<script src="jquery.min.js"></script>
<script src="comfykit.js"></script>
```
6. Look at **comfykit.js** for how to get started with Twitch Extension functionality!

### Uploading to the Twitch Developer Dashboard ###
To package your Extension project, simply run `npm run package` from the Command Prompt/Terminal and it will zip all files in the **public** folder into a file called **uploadthis.zip**. Each time you update your extension, you can package your code using this command.
To upload to Twitch:
1. Create the Twitch Extension project in the Dashboard: [https://dev.twitch.tv/dashboard](https://dev.twitch.tv/dashboard)
2. Go to the Version tab and click Manage, then go to Version Assets
3. Choose File and select the **uploadthis.zip** file and click Upload Assets
4. Finally in Version Status, click Move to Hosted Test to make your Extension available in your Twitch Channel Dashboard (https://www.twitch.tv/[YOUR_USERNAME]/dashboard/extensions). You can install and add your uploaded Extension the same way you would add other extensions from this Dashboard page.

## Twitch Extension FAQ ##
How to Use Extensions Guide: [https://help.twitch.tv/customer/portal/articles/2861187-how-to-use-extensions](https://help.twitch.tv/customer/portal/articles/2861187-how-to-use-extensions)
