// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: book;
// This script shows a random Scriptable API in a widget. The script is meant to be used with a widget configured on the Home Screen.
// You can run the script in the app to preview the widget or you can go to the Home Screen, add a new Scriptable widget and configure the widget to run this script.
// You can also try creating a shortcut that runs this script. Running the shortcut will show widget.
let poem = await loadPoem()
let widget = await createWidget(poem)
if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
} else {
  // The script runs inside the app, so we preview the widget.
  widget.presentMedium()
}
// Calling Script.complete() signals to Scriptable that the script have finished running.
// This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
Script.complete()

async function createWidget(poem) {
  let widget = new ListWidget()
  // Add background gradient
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("141414"),
    new Color("13233F")
  ]
  widget.backgroundGradient = gradient
  // Show Poem
  let descriptionElement = widget.addText(poem.content)
  descriptionElement.minimumScaleFactor = 0.5
  descriptionElement.textColor = Color.white()
  descriptionElement.font = Font.systemFont(20)
  // Show title and author
  widget.addSpacer(2)
  let stackElement = widget.addStack()
  let nameElement = stackElement.addText(poem.name)
  nameElement.textColor = Color.white()
  nameElement.font = Font.boldSystemFont(14)
  stackElement.addSpacer(null)
  let authorElement = stackElement.addText(poem.author)
  authorElement.textColor = Color.white()
  authorElement.font = Font.boldSystemFont(14)

  return widget
}

async function loadPoem() {
  let url = "https://v1.jinrishici.com/all.json"
  let req = new Request(url)
  let docs = await req.loadJSON()
  let poemName = docs["origin"]
  let poemContent = docs["content"]
  let poemAuthor = docs["author"]
  return {
    name: poemName,
    content: poemContent,
    author: poemAuthor
  }
}