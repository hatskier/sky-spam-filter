const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

// 'state' and 'type' fields will have the default values
// as it's defined in Item model
const DEFAULT_ITEMS = [
  { message: "Some message" },
  { message: "Another message" },
  { message: "Hehehe hehehe" }
];

module.exports = function(app) {
  app.get("/api/items", asyncHandler(async (req, res) => {
    const allItems = await Item.find();
    res.json(allItems);
  }));

  app.put("/api/items/:id", asyncHandler(async (req, res) => {
    const itemId = req.params.id;
    const updated = await Item.findByIdAndUpdate(itemId, req.body);

    if (!updated) {
      return res.status(400).json(`Item with id "${itemId}" was not found`);
    } else {
      return res.json('success');
    }
  }));

  app.post("/api/resetItems", asyncHandler(async (req, res) => {
    // Delete all items
    await Item.deleteMany({});
    
    // Bulk inserting default items
    await Item.collection.insert(DEFAULT_ITEMS);

    res.json('success');
  }));
};
