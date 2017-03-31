// Needed globally
var doc;
var page;
var artboard;
var plugin;
var selection;
var selectionCount;

// Initialise
function initPlugin(context) {
  doc = context.document;
  page = doc.currentPage();
  artboard = page.currentArtboard();
  plugin = context.plugin;
  selection = context.selection;
  selectionCount = [selection count]
}

// Utilities
var utils = {
  "createLabel": function(frame, text) {
    var label = NSTextField.alloc().initWithFrame(frame);
    label.setStringValue(text);
    label.setSelectable(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setDrawsBackground(false);
    return label
  },
  "getLayerProps": function() {
    var layer = selection.firstObject();

    if (layer) {
      var x = layer.frame().x();
      var y = layer.frame().y();
      return [x, y];
    } else {
      return [0, 0];
    }
  }
};

function createGroupItWindow() {

  // Setup the window
  var alert = COSAlertWindow.new();
  alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed("groupIt.png").path()));
  alert.setMessageText("Create a new group.")
  alert.addButtonWithTitle("Create Group");
  alert.addButtonWithTitle("Cancel");

  // Create the main view
  var viewWidth = 300;
  var viewHeight = 72;
  var viewSpacer = 10;

  // Entry Field Size
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);

  // Create labels
  var groupNameLabel = utils.createLabel(NSMakeRect(0, viewHeight - 20, (viewWidth / 2) - viewSpacer, 20), "New Group Name:");
  view.addSubview(groupNameLabel);

  // Create inputs (X,Y,Width, Height)
  groupNameTextfield = NSTextField.alloc().initWithFrame(NSMakeRect( 0, viewHeight - 50, viewWidth, 20));
  view.addSubview(groupNameTextfield);

  alert.alert().window().setInitialFirstResponder(groupNameTextfield)

  return [alert];
}

