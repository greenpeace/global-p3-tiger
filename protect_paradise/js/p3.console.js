/**!
 * $.p3.console
 * Avoid `console` errors in browsers that lack a console. 
 *
 * @license			MIT License (opensource.org/licenses/MIT)
 */
// 
(function() {
  'use strict';
  var method,
  noop = function() {},
  methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'],
    l = methods.length,
    console = (window.console = window.console || {});

    while (l--) {
      method = methods[l];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
}());
