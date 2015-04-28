//////////////////////////////////////////////////////////////////////
// templates
//

"use strict"

var originalFuncs = {},
    tracingLifeCycle = false

function _startsWith (str, searchString) {
  return str.lastIndexOf(searchString, 0) === 0;
};

Trace.registerTrace("templates", {
  trace: function () {
    Meteor.startup(function () {
      "use strict"

      var template

      if (tracingLifeCycle) {
        return
      }

      console.log('[trace] tracing started for templates')

      for (var name in Template) {
        template = Template[name]
        if (Template.hasOwnProperty(name) && template &&
            !_startsWith(name, '__')) {
          traceLifeCycle(template, name)
          traceHelpers(template, name)
        }
      }

      tracingLifeCycle = true
    })
  },

  untrace: function () {
    "use strict"

    // clean up old rendered wrapped funcs
    for (var name in Template) {
      if (originalFuncs[name]) {
        Template[name].rendered = originalFuncs[name]
        delete originalFuncs[name]
      }
    }

    console.log('[trace] please refresh your browser to stop tracing Templates')
  }
})



//////////////////////////////////////////////////////////////////////
// lifeCycle
//

function traceLifeCycle (template, name) {
  "use strict"

  var _callbacks = template._callbacks

  if (!_callbacks) {
    return
  }
  name = name.trim()

  if (_callbacks.created && _callbacks.created.length > 0) {
    console.log("[trace] tracing Template['" + name + "'] created event")
    template.onCreated(function () {
      console.log("[trace] Template['" + name + "'] created")
    })
  }
  if (_callbacks.destroyed && _callbacks.destroyed.length > 0) {
    console.log("[trace] tracing Template['" + name + "'] destroyed event")
    template.onDestroyed(function () {
      console.log("[trace] Template['" + name + "'] destroyed")
    })
  }
  if (Blaze) {
    if (_callbacks.rendered && _callbacks.rendered.length > 0) {
      console.log("[trace] tracing Template['" + name + "'] rendered event")
      template.onRendered(function () {
        console.log("[trace] Template['" + name + "'] rendered")
      })
    }
  } else {
    traceOldRendered(template, name)
  }
}

function traceOldRendered(template, name) {
  "use strict"

  if (!template.rendered) {
    return
  }

  console.log('[trace] tracing template', name, 'rendered event')

  originalFuncs[name] = template.rendered
  template.rendered = _.wrap(template.rendered, function (func) {
    "use strict"

    var args = Array.prototype.splice.call(arguments, 0, 1)

    console.log('[trace] template', name, 'rendered')
    func.apply(this, args)
  })
}


//////////////////////////////////////////////////////////////////////
// helpers
//

function traceHelpers (template, templateName) {
  "use strict"
  
  var __helpers = template.__helpers,
      makeWrapper,
      helperName

  if (!__helpers) {
    return
  }

  for (helperName in __helpers) {
    if (helperName == 'get' ||
        helperName == 'set' ||
        helperName == 'has') {
      continue;
    }

    console.log("[trace] tracing Template['" + templateName + "'] helper '" +
                helperName.trim() + "'")

    makeWrapper = function (hName) {
      return function (func) {
        "use strict"

        var args = Array.prototype.splice.call(arguments, 1)

        console.log("[trace] Template['" + templateName + 
                    "'] helper '" + hName + "' called")
        return func.apply(this, args)
      }
    }

    __helpers[helperName] = _.wrap(__helpers[helperName], makeWrapper(helperName.trim()))
  }
}
