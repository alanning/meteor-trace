//////////////////////////////////////////////////////////////////////
// Toggle logging of collection and template activity.
// Remembers state in localStorage if supported.
//
// Toggle via browser console:
//   Trace.collections()  => on
//   Trace.collections()  => off
//   Trace.templates()  => on
//   Trace.templates()  => off
//
//////////////////////////////////////////////////////////////////////

if ("undefined" === typeof Trace) {
  Trace = {}
}

"use strict"

var state = {},
    actions = {}

_.extend(Trace, {

  /**
   * Set the state of a trace.  If no state is passed, toggles existing state.
   *
   * @method setState
   * @param {String} name Trace name
   * @param {Boolean} [newState] True if trace should be started.
   *                             Default: toggle current state.
   */
  setState: function (name, newState) {
    "use strict"

    if ('boolean' !== typeof newState) {
      // toggle current state
      newState = !state[name]
    }
    
    if (true === newState) {

      // turn on
      
      actions[name].trace()
      state[name] = true

      if (supports_html5_storage()) {
        //console.log("[trace] setting Trace." + name, "= true")
        window.localStorage.setItem("Trace." + name, "true")
      }

    } else {

      // turn off

      actions[name].untrace()
      state[name] = false

      if (supports_html5_storage()) {
        //console.log("[trace] removing Trace." + name)
        window.localStorage.removeItem("Trace." + name)
      }

    }
  },

  /**
   * Register a new trace.  Also makes trace toggleable on the
   * root Trace object.
   *
   * ex. Trace.registerTrace("collections", {...})
   *     Trace.collections()  ==  Trace.setState("collections")
   *
   * @method registerTrace
   * @param {String} name Name of trace. Also name of created function on
   *                      root Trace object that will toggle tracing.
   * @param {Object} funcs Expects 'trace' and 'untrace' functions that do
   *                       the actual logging.
   */
  registerTrace: function (name, funcs) {
    "use strict"

    if ('string' !== typeof name ||
        !name) {
      throw new Error ("Missing required 'name' parameter")
    }

    if (!funcs ||
        'function' !== typeof funcs.trace ||
        'function' !== typeof funcs.untrace) {
      throw new Error ("Missing required 'trace' and 'untrace' functions")
    }

    if (Trace[name]) {
      throw new Error ("'Trace." + name + "' already exists.")
    }

    state[name] = false
    actions[name] = funcs

    Trace[name] = function () {
      Trace.setState(name)
    }

    if (supports_html5_storage()) {
      state[name] = !!window.localStorage.getItem('Trace.' + name);
    }
  }
})


//////////////////////////////////////////////////////////////////////
// Check localStorage flags to see if we should start any traces
//

if (supports_html5_storage()) {
  Meteor.startup(function () {
    "use strict"

    for (var trace in state) {
      state[trace] = !!window.localStorage.getItem('Trace.' + trace);
      //console.log("[trace] localStorage('Trace." + trace + "') =", state[trace])
      if (state[trace]) {
        Trace.setState(trace, state[trace])
      }
    }
  })
}


/**
 * Tests whether localstorage is supported in the user's client
 * source: http://diveintohtml5.info/storage.html
 *
 * @method supports_html5_storage
 * @returns {Boolean} true if localstorage is supported
 */
function supports_html5_storage () {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
