const { configure } = require("@storybook/react")
const { setDefaults } = require("@storybook/addon-info")
const { setOptions } = require("@storybook/addon-options")
const Events = require("../Utils/Events").default
const req = require.context("../", true, /\.story\.tsx$/)

setOptions({
  name: "Reaction",
  url: "http://artsy.github.io/reaction",
  showDownPanel: false,
  sortStoriesByKind: true,
})

function loadStories() {
  req.keys().forEach(filename => {
    console.log(filename)
    return req(filename)
  })
}

setDefaults({
  inline: true,
})

setTimeout(() => {
  configure(loadStories, module)
})

Events.onEvent(data => {
  console.log("Tracked event", data)
})
