# meteor-trace
Log client-side Meteor collection and template events

### Install package

```
$ cd app-dir
$ meteor add alanning:trace
```

### Turn on tracing

Open browser console:

    Chrome on OSX = Command + Option + J
    Firefox on OSX = Command + Option + K

In browser console, type:

```
Trace.collections()
Trace.templates()
```

### Example output

    [trace] tracing started for collections
    [trace] tracing collection 'meteor_autoupdate_clientVersions'
    [trace] tracing collection 'groups'
    [trace] tracing started for templates
    [trace] tracing Template['hello'] helper 'counter'
    [trace] tracing Template['groups'] created event
    [trace] tracing Template['groups'] destroyed event
    [trace] tracing Template['groups'] rendered event
    [trace] tracing Template['groups'] helper 'myGroups'
    [trace] Template['hello'] helper 'counter' called
    [trace] Template['groups'] created
    [trace] Template['groups'] helper 'myGroups' called
    [trace] Template['groups'] helper 'myGroups' called
    [trace] Template['groups'] rendered
    [trace] meteor_autoupdate_clientVersions added t3B53jZ6uPxX2Sg9b Object {current: true}
    [trace] meteor_autoupdate_clientVersions added version Object {version: "34c83570a9d310778690b1a6daa22ac188386964"}
    [trace] meteor_autoupdate_clientVersions added version-cordova Object {version: "none", refreshable: false}
    [trace] meteor_autoupdate_clientVersions added version-refreshable Object {version: "e6e9160d5667553616ec1369b4aa57d9bba82f13", assets: Object}
    [trace] groups added zAcK2gTC4uf33EwBi Object {name: "Group 1", size: 15}
    [trace] groups added LhdZvAsPaEkp2kwKW Object {name: "Group 2", size: 5}
    [trace] groups added jqqKieArZSqcNuRA5 Object {name: "Group 3", size: 20}
    [trace] groups added SBPanGpzHgoNjkC7k Object {name: "Group 4", size: 55}
