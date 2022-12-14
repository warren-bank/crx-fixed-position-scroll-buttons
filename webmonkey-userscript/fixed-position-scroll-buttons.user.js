// ==UserScript==
// @name         fixed position scroll buttons
// @description  Display a small fixed-position group of scroll buttons on all webpages.
// @version      1.0.0
// @include      /^.*$/
// @icon         https://github.com/google/material-design-icons/raw/4.0.0/png/hardware/mouse/materialiconstwotone/24dp/2x/twotone_mouse_black_24dp.png
// @run-at       document-end
// @grant        unsafeWindow
// @homepage     https://github.com/warren-bank/crx-fixed-position-scroll-buttons/tree/webmonkey-userscript/es5
// @supportURL   https://github.com/warren-bank/crx-fixed-position-scroll-buttons/issues
// @downloadURL  https://github.com/warren-bank/crx-fixed-position-scroll-buttons/raw/webmonkey-userscript/es5/webmonkey-userscript/fixed-position-scroll-buttons.user.js
// @updateURL    https://github.com/warren-bank/crx-fixed-position-scroll-buttons/raw/webmonkey-userscript/es5/webmonkey-userscript/fixed-position-scroll-buttons.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// ----------------------------------------------------------------------------- configuration

var user_options = {
  css: {
    "font-family": "monospace",
    "font-size":   "20px",
    "padding":     "5px 10px",
    "border":      "1px solid black"
  },
  scroll: {
    "increment-by-multiple-of-screen-height": 0.75
  }
}

// ----------------------------------------------------------------------------- constants

const constants = {
  css: {
    ids: {
      container: 'fixed_position_scroll_buttons_container'
    },
    classes: {
      drag_handle: 'drag_handle',
      button:      'button'
    }
  }
}

// ----------------------------------------------------------------------------- state

var state = {
  container: null,
  drag_handle: {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0
  }
}

// ----------------------------------------------------------------------------- helpers

var make_element = function(elementName, html) {
  var el = unsafeWindow.document.createElement(elementName)

  if (html)
    el.innerHTML = html

  return el
}

var cancel_event = function(event) {
  event.stopPropagation();event.stopImmediatePropagation();event.preventDefault();event.returnValue=false;
}

// ----------------------------------------------------------------------------- build DOM

var build_dom = function() {
  var head = unsafeWindow.document.getElementsByTagName('head')[0]
  var body = unsafeWindow.document.body
  var html

  html = []
  html.push(
      '#' + constants.css.ids.container + ' {',
      '  display:    block;',
      '  position:   fixed;',
      '  z-index:    99999;',
      '  top:        0px;',
      '  left:       0px;',
      '  background: #fff;'
  )
  for (var name in user_options.css) {
    html.push(
      '  ' + name + ': ' + user_options.css[name] + ';'
    )
  }
  html.push(
      '}',
      '#' + constants.css.ids.container + ' > div {',
      '  display: inline-block;',
      '}',
      '#' + constants.css.ids.container + ' > div.' + constants.css.classes.drag_handle + ' {',
      '  cursor: grab;',
      '}',
      '#' + constants.css.ids.container + ' > div.' + constants.css.classes.button + ' {',
      '  cursor: pointer;',
      '}'
  )

  head.appendChild(
    make_element('style', html.join("\n"))
  )

  var titles = {
    top:    "scroll to top",
    up:     "scroll up",
    down:   "scroll down",
    bottom: "scroll to bottom",
    drag:   "drag to move"
  }

  html = [
      '<div class="' + constants.css.classes.button + ' top"    role="img" alt="' + titles.top    + '" title="' + titles.top    + '">&#8607;</div>',
      '<div class="' + constants.css.classes.button + ' up"     role="img" alt="' + titles.up     + '" title="' + titles.up     + '">&#8593;</div>',

      '<div class="' + constants.css.classes.drag_handle + '"   role="img" alt="' + titles.drag   + '" title="' + titles.drag   + '">&#10021;</div>',

      '<div class="' + constants.css.classes.button + ' down"   role="img" alt="' + titles.down   + '" title="' + titles.down   + '">&#8595;</div>',
      '<div class="' + constants.css.classes.button + ' bottom" role="img" alt="' + titles.bottom + '" title="' + titles.bottom + '">&#8609;</div>'
  ]

  state.container = make_element('div', html.join("\n"))
  state.container.setAttribute('id', constants.css.ids.container)

  body.appendChild(
    state.container
  )
}

// ----------------------------------------------------------------------------- attach events

var attach_events = function() {
  if (!state.container) return

  attach_events_drag_handle()
  attach_events_buttons()
}

// ----------------------------------------------------------------------------- attach events: drag handle
// based on: https://www.w3schools.com/howto/howto_js_draggable.asp

var attach_events_drag_handle = function() {
  var drag_handle = state.container.querySelector(':scope > div.' + constants.css.classes.drag_handle)
  if (!drag_handle) return

  drag_handle.addEventListener('mousedown', onmousedown_drag_handle)
}

var onmousedown_drag_handle = function(event) {
  cancel_event(event)

  // save current position
  state.drag_handle.pos3 = event.clientX
  state.drag_handle.pos4 = event.clientY

  // attach temporary event listeners to document
  unsafeWindow.document.addEventListener('mousemove', onmousemove_document)
  unsafeWindow.document.addEventListener('mouseup',   onmouseup_document)
}

var onmousemove_document = function(event) {
  cancel_event(event)

  // calculate the distance moved
  state.drag_handle.pos1 = state.drag_handle.pos3 - event.clientX
  state.drag_handle.pos2 = state.drag_handle.pos4 - event.clientY

  // save current position
  state.drag_handle.pos3 = event.clientX
  state.drag_handle.pos4 = event.clientY

  // move container by relative distance
  state.container.style.top  = (state.container.offsetTop  - state.drag_handle.pos2) + "px"
  state.container.style.left = (state.container.offsetLeft - state.drag_handle.pos1) + "px"
}

var onmouseup_document = function(event) {
  // remove temporary event listeners from document
  unsafeWindow.document.removeEventListener('mousemove', onmousemove_document)
  unsafeWindow.document.removeEventListener('mouseup',   onmouseup_document)
}

// ----------------------------------------------------------------------------- attach events: buttons

var attach_events_buttons = function() {
  var buttons = {
    top:    state.container.querySelector(':scope > div.' + constants.css.classes.button + '.top'),
    up:     state.container.querySelector(':scope > div.' + constants.css.classes.button + '.up'),
    down:   state.container.querySelector(':scope > div.' + constants.css.classes.button + '.down'),
    bottom: state.container.querySelector(':scope > div.' + constants.css.classes.button + '.bottom')
  }

  if (buttons.top)
    buttons.top.addEventListener('click', onclick_button_top)
  if (buttons.up)
    buttons.up.addEventListener('click', onclick_button_up)
  if (buttons.down)
    buttons.down.addEventListener('click', onclick_button_down)
  if (buttons.bottom)
    buttons.bottom.addEventListener('click', onclick_button_bottom)
}

var onclick_button_top = function(event) {
  cancel_event(event)

  var scrollTop = 0

  unsafeWindow.scrollTo(0, scrollTop)
}

var onclick_button_up = function(event) {
  cancel_event(event)

  var scrollTop = get_vertical_scroll_current_position() - get_vertical_scroll_increment()

  if (scrollTop < 0)
    scrollTop = 0

  unsafeWindow.scrollTo(0, scrollTop)
}

var onclick_button_down = function(event) {
  cancel_event(event)

  var scrollTop = get_vertical_scroll_current_position() + get_vertical_scroll_increment()

  if (scrollTop > get_document_height())
    scrollTop = get_document_height()

  unsafeWindow.scrollTo(0, scrollTop)
}

var onclick_button_bottom = function(event) {
  cancel_event(event)

  var scrollTop = get_document_height()

  unsafeWindow.scrollTo(0, scrollTop)
}

var get_screen_height = function() {
  return unsafeWindow.document.documentElement.clientHeight
}

var get_document_height = function() {
  return unsafeWindow.document.documentElement.scrollHeight
}

var get_vertical_scroll_current_position = function() {
  return unsafeWindow.document.documentElement.scrollTop
}

var get_vertical_scroll_increment = function() {
  return get_screen_height() * user_options.scroll["increment-by-multiple-of-screen-height"]
}

// ----------------------------------------------------------------------------- bootstrap

var init = function() {
  build_dom()
  attach_events()
}

init()
