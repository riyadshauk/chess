// This file, as with most of front_end, is inspired by and mostly taken from TodoMVC/vanilla-es6
// respect: https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanilla-es6

/**
 * querySelector wrapper
 * 
 * @param {string} selector
 * @param {Element} [scope]
 */
export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 * 
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector
 * 
 * @param {Element} target Element which the event must bubble to
 */
// ....

/**
 * Encode less-than and ampersand characters with HTML-safe versions.
 * 
 * @param {string} s String to escape
 * 
 * @returns {string} String with unsafe characters escaped.
 */
export const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');