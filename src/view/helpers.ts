// This file, as with most of front_end, is inspired by and mostly taken from TodoMVC/vanilla-es6
// respect: https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanilla-es6

/**
 * @description querySelector wrapper
 */
export function qs(selector: string, scope?: Element) {
    return (scope || document).querySelector(selector);
}

/**
 * @description addEventListener wrapper
 */
export function $on(target: Element | Window, type: string, callback: EventListenerOrEventListenerObject, capture?: boolean | AddEventListenerOptions): void { // @todo fix callback type
    target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector
 * 
 * @param {Element} target Element which the event must bubble to
 */
// ....

/**
 * @description Encode less-than and ampersand characters with HTML-safe versions.
 * @param {string} s String to escape
 * @returns {string} String with unsafe characters escaped.
 */
export const escapeForHTML = (s: string): string => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');