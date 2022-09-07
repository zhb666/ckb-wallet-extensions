import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["http://*/*", "https://*/*"]
}

declare const window: any
window.addEventListener("click", () => {
  console.log("content script loaded")
  chrome.storage.sync.get("a", function (data) {
    console.log(data)
  })
  window.abc = () => {
    alert(1)
  }
  // document.body.style.background = "red"
})

// window.abc = 123
