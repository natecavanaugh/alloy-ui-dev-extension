# AlloyUI Firebug Extension

## Instructions
This all assumes you have the Firebug extension for Firefox (and Firefox, of course), which you can download at http://getfirebug.com. Download the alloyui.xpi, drag and drop it on any Firefox window, and click install. Restart, and the plugin should be installed.
To test it out, go to http://liferay.com, open Firebug, and in the console, type `AUI().one('#banner')`
You should see output something like this: `A.one(<header id="banner" class="doc-header" role="banner">)`

Hover over the element between the parenthesis, and you'll notice it highlights the element in the page. Click it, and it will inspect it.
If you want to inspect the properties of the AlloyUI Node instance (the object that wraps the element, and provides the methods like `.on()` `.show()`, `.hide()`, etc), click on the `A.one` part.

This also works with `AUI().all()`, so if you do `AUI().all('meta')`, you'll get something like: `A.all(meta, meta, meta)`. Same rules apply.

## About
This extension was originally created because I hate the way Firebug changed how they displayed node objects that were wrapped with objects from different libraries. In Firebug 1.2 (give or take), any object with a .length property would be treated as an array. This meant that jQuery objects (which I used at the time) would display as arrays of Node elements that could be clicked on to inspect them.

Now that I work all in AlloyUI and YUI, I wanted that same behavior.

However, I can envision it growing as we need more functionality. Illuminations is a good example, I just would prefer not to pay 25 bucks a year for that kind of functionality.

Also, as soon as the Chrome web inspector allows extension (as is coming soon), then I will happily create one for that as well.

## Support
Right now, since it's not complicated, it should support Firefox 3.5+