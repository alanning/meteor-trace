//////////////////////////////////////////////////////////////////////
// collections
//

"use strict"

var handles = {}

Trace.registerTrace("collections", {
  trace: function () {
    "use strict"

    var conn = Meteor.connection,
        collections = conn._mongo_livedata_collections,
        collection

    console.log('[trace] tracing started for collections')
    for (var name in collections) {
      collection = collections[name]
      if (!handles[name]) {
        handles[name] = traceCollection(collection)
        console.log("[trace] tracing collection '" + name + "'")
      }
    }
  },

  untrace: function () {
    "use strict"

    var conn = Meteor.connection,
        collections = conn._mongo_livedata_collections,
        collection

    for (var name in handles) {
      handles[name].stop()
      delete handles[name]
      console.log('[trace] tracing stopped for collection', name)
    }
  }
})



/**
 * Log client-side collection activity
 *
 * @method traceCollection
 * @param {Object} collection
 * @return {String} handle observeChanges cursor
 */
function traceCollection (collection) {
  "use strict"

  var cursor = collection.find({}),
      collectionName = collection.name,
      handle

  handle = cursor.observeChanges({
    added: function (id, fields) {
      console.log('[trace]', collectionName, 'added', id, fields)
    },
 
    changed: function (id, fields) {
      console.log('[trace]', collectionName, 'changed', id, fields)
    },
 
    movedBefore: function (id, before) {
      console.log('[trace]', collectionName, 'movedBefore', id, before)
    },
 
    removed: function (id) {
      console.log('[trace]', collectionName, 'removed', id)
    }
  })
 
  return handle
}
