### [fixed position scroll buttons](https://github.com/warren-bank/crx-fixed-position-scroll-buttons/tree/webmonkey-userscript/es5)

[Userscript](https://github.com/warren-bank/crx-fixed-position-scroll-buttons/raw/webmonkey-userscript/es5/webmonkey-userscript/fixed-position-scroll-buttons.user.js) to run in both:
* the [WebMonkey](https://github.com/warren-bank/Android-WebMonkey) application for Android
* the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) web browser extension for Chrome/Chromium

Its purpose is to:
* provide a workaround in [WebMonkey](https://github.com/warren-bank/Android-WebMonkey) for a __feature__ of [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) version 58 and higher
  - [description](https://chromestatus.com/feature/5642080642662400) of __feature__
  - [white paper](https://docs.google.com/document/d/1mpBR7J7kgTXvp0QACVjhxtwNJ7bgGoTMmxfxN2dupGg/edit?usp=sharing) for __feature__
  - [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=468806) that tracked the implementation of __feature__
  - summary of __feature__:
    * before this change,
      - a low-level mouse event in Android reached Blink as a touch event
    * after this change,
      - a mouse on an Android M (or later) device:
        1. will no longer fire TouchEvents
        2. will fire a consistent sequence of MouseEvents
  - comments from issue tracker:
    * [&#35;18](https://bugs.chromium.org/p/chromium/issues/detail?id=468806#c18):
      > Today dragging the mouse in an Android native app (outside an editable text field) typically scrolls (like touch would). If we stop treating mice on Android like touch input, then we'll lose this property in Chrome (dragging the mouse will select text, never scroll). Is that the UX we want on Android for mouse input? Personally I think it should be, but there may be users used to scrolling this way.
    * [&#35;19](https://bugs.chromium.org/p/chromium/issues/detail?id=468806#c19):
      > Yes, I think we should simply switch over the UX to be fully desktop-like and not worry about hypothetical existing users. Mouse selection is much more convenient than touch-based selection and it's one of the main reasons why a user might choose to plug in a mouse in the first place. On the other hand, mouse drag scrolling feels awkward and slow. And the mousewheel will always be available to scroll regardless.
* display a small fixed-position group of scroll buttons on all webpages
  - a drag handle allows the group to be repositioned on the screen
  - configuration options at the beginning of the userscript allow the user to customize:
    * CSS style properties
      - ex: the font size of the text shown in the buttons
    * vertical scroll increment
      - as a percentage of the screen height
      - ex: `0.75` scrolls ` 75%` of the screen
      - ex: `2.00` scrolls `200%` of the screen
    * duration of delay (in _milliseconds_) to wait before writing to DOM
      - to allow other userscripts the opportunity to rewrite the DOM first

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
