export {}

// chrome.browserAction.setBadgeText({ text: "new" })
// chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] })

chrome.runtime.onInstalled.addListener(function () {
  // storage set
  // chrome.storage.sync.set({ a: 88, b: 22 }, function () {
  //   console.log("storage init number")
  // })

  // chrome.browserAction.setTitle({ title: "New ckb 钱包开发" })

  // chrome.storage.sync.get("color", function (data) {
  //   console.log(data)
  // })

  // 为特定的网址显示图标
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "baidu.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })
})

console.log("Hello from background script!")
