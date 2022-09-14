### Configure the IFTTT Applet
1. Go to IFTTT
2. Create a new Applet
3. Configure the trigger
	1. Choose a service -> Webhooks
	2. Choose a trigger "Receive a web request" (not the "JSON playload" one)
	3. Choose an event name and save it for later, e.g. "immo_check"
4. Configure the action
	1. Choose a service -> Notifications
	2. Choose an action -> "Send a rich notification from the IFTTT app"
	3. Edit action fields
		1. Type in the following values into the text fields
			- Message: {{Value1}}
			- Title: Immo Check
			- Link URL: {{Value2}}
			- Image URL: 
		2. Create action
	4. Continue
5. Give your Applet a title and click on Finish
6. Find out your IFTTT Key to connect it to the chrome extension
	1. Visit https://ifttt.com/maker_webhooks and click on the "Documentetion" button.
	2. Copy the key and save it for later
7. Ensure you have downloaded the IFTTT app to your smartphone, are logged in and the created Applet is active

### Setup your Chrome Extension
1. Download the latest version of this Chrome extension
2. Open the script.js file with a text editor of your choice
3. In the first few lines of the file you will find the point where you can insert your event name and your IFTTT Key
4. Save the changes and close the file

### Add the extension to your Chrome Browser
5. Open your Google Chrome Browser
6. Click on the three dots on the top right and click on "Weitere Tools" -> "Erweiterungen"
7. On the extensions page, click the button "Entoackte Erweiterung laden" on the top left
8. Choose the folder that includes the flow files, script.js and manifest.json

### How to use the Immo Check extension:
1. Open the search results page of Immoscout (The link must start with https://www.immobilienscout24.de/Suche/...)
2. Now the extension will analyse the website every minute (+/- 10s to avoid bot detection) and inform you if it founds new items.
3. Ensure you leave browser and the website open, otherwise the bot will not work.
4. Sometimes Immoscout founds out that we are using a programm to analyse their page. In this case they are blocking the website and showing a Captcha ("I am not a robot" task). If this happens, the bot will inform you about it. To solve this Captcha, simply look at the browser window and solve the task. If the Captcha was solved, you will see the search results again and get another notification from the bot, that the Captcha was solved.