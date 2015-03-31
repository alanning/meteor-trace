Groups = new Mongo.Collection("groups")

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0)

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter')
    }
  })
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1)
    }
  })

  Template.groups.onCreated(function () {
  })
  Template.groups.onRendered(function () {
  })
  Template.groups.onDestroyed(function () {
  })
  Template.groups.events({
    'click button': function () {
      Meteor.subscribe('groups')
    }
  })
  Template.groups.helpers({
    myGroups: function () {
      return Groups.find({})
    }
  })
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Groups.find({}).count() == 0) {
      console.log("Populating database...")
      Groups.insert({name: "Group 1", size: 15})
      Groups.insert({name: "Group 2", size: 5})
      Groups.insert({name: "Group 3", size: 20})
      Groups.insert({name: "Group 4", size: 55})
    }
  })

  Meteor.publish("groups", function () {
    return Groups.find({})
  })
}
