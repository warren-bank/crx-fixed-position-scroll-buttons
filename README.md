### [fixed position scroll buttons](https://github.com/warren-bank/crx-fixed-position-scroll-buttons/tree/webmonkey-userscript/es5)

[Userscript](https://github.com/warren-bank/crx-fixed-position-scroll-buttons/raw/webmonkey-userscript/es5/webmonkey-userscript/fixed-position-scroll-buttons.user.js) to run in both:
* the [WebMonkey](https://github.com/warren-bank/Android-WebMonkey) application for Android
* the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) web browser extension for Chrome/Chromium

Its purpose is to:
* provide a workaround for an issue that I've experienced on an Android TV box
  - whereby
    * the ability to use an air mouse to scroll a webpage in a WebView by "_flinging_" it up or down only works with versions of [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) &lt;= 57
    * newer versions of [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) treat a "_fling_" gesture as a "_click and drag_" gesture, which only highlights text on the webpage
  - which
    * effects all apps on the device that utilize WebViews, including [WebMonkey](https://github.com/warren-bank/Android-WebMonkey)
    * is almost certainly a firmware issue that could be fixed by flashing a new ROM,<br>but I'm lazy&hellip; and don't want to risk bricking the device
* display a small fixed-position group of scroll buttons on all webpages
  - a drag handle allows the group to be repositioned on the screen
  - CSS style options can be configured at the beginning of the userscript

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
