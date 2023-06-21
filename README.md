# ImmoScout24 Bot made with IFTTT & a Chrome Extension

## How does the Bot work?
The Bot analyses ImmoScout's search results in an open chrome browser.
It saves the current state of the search results and rechecks it every 60 seconds.
Each time, the bot detects a new item on the results page, it sends you an notification to your phone via an IFTTT Applet.
The notification includes the description and the preview image of the new item and a click on it redirects to directly to the ImmoScout app.

### Why did I choose to use a Chrome Extension for scraping?
ImmoScout has a very good Bot detection that makes it nearly impossible to scrape their website 100% programmatically. That's why I impelented this solution as a Chrome Extension which works quite well.

## How to setup the Bot?

### What do you need?
- an [IFTTT](https://ifttt.com/) account
- a Chrome Browser
- a smartphone with the IFTTT App installed

### How to configure IFTTT?
1. Go to [IFTTT](https://ifttt.com/) and login (or register)
2. Click on "[Create](https://ifttt.com/create)" to create a new Applet (this will be the application that forwards the notification from your Chrome Browser to your smartphone)
3. Configure the trigger ("If This")
	1. Choose a service -> Webhooks
	2. Choose a trigger "Receive a web request" (not the "JSON playload" one)
	3. Choose an event name and save it for later, e.g. "immo_check" (Use only letters, numbers, and underscores)

4. Configure the action ("Then That")
	1. Choose a service -> Notifications
	2. Choose an action -> "Send a rich notification from the IFTTT app"
	3. Edit action fields
		1. Type the following values into the text fields
			- Message: {{Value1}}
			- Title: Immo Check
			- Link URL: {{Value2}}
			- Image URL: {{Value3}}
		<img src="https://user-images.githubusercontent.com/9198250/190218652-f5f85db7-e34d-4a7e-8dd3-2b4fa2dc858c.png" height="400"></img>
		2. Create action
	4. Continue

5. Give your Applet a title (e.g. "Immo Check") and click on Finish
6. Find out your IFTTT Key to connect it to the chrome extension
	1. Visit https://ifttt.com/maker_webhooks and click on the "Documentetion" button.
	2. Copy the key and save it for later
7. Ensure you have downloaded the IFTTT app to your smartphone, are logged in and the created Applet is "Connected" (can be found under "My Applets")

### How to connect the extension to my IFTTT Applet?
1. Download the latest version of the immo-check Chrome extension: https://github.com/tbtz/immo-check/releases/latest
2. Unzip the downloaded file, open it and then open the `script.js` file with a text editor of your choice
3. In the first few lines of the file you will find the point where you can insert your event name and your IFTTT key

Example:

<img src="https://user-images.githubusercontent.com/9198250/190223072-482d1c77-500c-4031-ab90-3542d21e7616.png" height="150"></img>

4. Save the changes and close the file

### How to add the extension to my Chrome Browser?
1. Open your Google Chrome Browser
2. Click on the three dots on the top right corner of the browser and click on "More Tools" -> "Extensions"
3. On the extensions page, ensure "Developer mode" in the top right corner is enabled and click the button "Load unpacked" in the top left corner
4. Select the immo-check folder that includes the `script.js` and `manifest.json` and confirm your selection.

### How to use the Immo Check extension:
1. Open a search results page of Immoscout (e.g. from a [saved search](https://www.immobilienscout24.de/savedsearch/myscout/manage/) or a new search) (The link must start with https://www.immobilienscout24.de/Suche/...)
2. If everything went well, you will now get a notification with the content "Immo Check setup was successful! ✅"
3. Now the extension will analyse the website every minute (+/- 10s to avoid bot detection) and informs you when it found new items.
4. Ensure you leave browser and the website open, otherwise the Bot will not work.

### ImmoScout's Bot Protection
Sometimes Immoscout founds out that we are using a programm to analyse their page. In this case they are blocking the website and showing a Captcha ("I am not a robot" task). If this happens, the Bot will inform you with a notification about it.

To solve this Captcha, simply look at the browser and solve the task. After the Captcha was solved, you will see the search results again and get another notification from the bot, that the Captcha was solved. Sometimes the Captcha even disaapears on their own. If this happens, the Bot will also inform you about that with a notification.
