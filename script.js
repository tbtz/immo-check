(async function () {    

    ///////// INSERT YOUR KEY & EVENT NAME BELOW /////////

    const iftttKey = "abcd1234efgh5678ijkl90"
    const iftttEventName = "immo_check"

    //////////////////////////////////////////////////////

    const recheckIntervalInMs = 60000 + ( Math.round( Math.random() * 20 - 10 ) * 1000 )
    const captchaWasVisibleBefore = (await chrome.storage.local.get("captchaIsVisible")).captchaIsVisible;  
    const captchaIsVisible =  !!document.querySelector('.main__captcha')

    if (captchaIsVisible && !captchaWasVisibleBefore) {
     
        await sendMessage("Solve the Captcha! ❌", null, null)
        await chrome.storage.local.set({ "captchaIsVisible": true });  
    
    }

    if (!captchaIsVisible) {

        if (captchaWasVisibleBefore ) {
            await sendMessage("Captcha solved! ✅", null, null)
        }

        const items = [...document.querySelectorAll("li.result-list__listing")]

        const previousIds = (await chrome.storage.local.get("immoIds")).immoIds
        const currentIds = items.map((item) => item.attributes["data-id"].value)
        const newIds = previousIds ? currentIds.filter(id => !previousIds.includes(id)) : []

        if (!previousIds) {
            console.log("Immo Check: Initial items were saved successfully")
            await sendMessage("Immo Check setup was successful! ✅", null, null)
        } else if (newIds.length == 0) {
            console.log("Immo Check: No new items were found on the page. Check again in " + (recheckIntervalInMs / 1000) + "s.")
        } else {
            console.log("Immo Check: Found " + newIds.length + " new items on the page")

            await triggerLazyLoading() // Lazy load images

            for (const id of newIds) {
                const element = document.querySelector(`li[data-id="${id}"]`)
                const text = element.querySelector("h5").innerText.replace("NEU", "")
                const link = element.querySelector("a").href
                const imgElem = element.querySelector('img[alt="Immobilienbild"]')
                let image = imgElem ? imgElem.src : null
                await sendMessage(text, link, image)
            }
        }

        await chrome.storage.local.set({
            "immoIds": currentIds, 
            "captchaIsVisible": false
        })
    }


    setTimeout(() => {
        location.reload()
    }, recheckIntervalInMs);


    function sendMessage(text, link, image) {
        const url = `https://maker.ifttt.com/trigger/${iftttEventName}/with/key/${iftttKey}?value1=${text}&value2=${link}&value3=${image}`
        return fetch(url, { mode: "no-cors" });
    }

    async function wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    async function triggerLazyLoading() {
        scrollDown()
        await wait(3000)
        scrollUp()
    }

    function scrollUp() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }


    function scrollDown() {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        window.scrollTo({
            top: height,
            behavior: 'smooth',
        })
    }

})()
