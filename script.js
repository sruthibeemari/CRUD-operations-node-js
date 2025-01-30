const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

let items = [{ id: 1, name: "Item 1" },{ id: 2, name: "Item 2" }];

// 🟢 READ: Get all items
app.get("/items", (req, res) => {
    res.json(items);
});

// 🟢 READ: Get a single item
app.get("/items/:id", (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ message: "Item not found" });
});

// 🟢 CREATE: Add a new item
app.post("/items", (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// 🟢 UPDATE: Modify an existing item
app.put("/items/:id", (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// 🟢 DELETE: Remove an item
app.delete("/items/:id", (req, res) => {
    items = items.filter(i => i.id != req.params.id);
    res.json({ message: "Item deleted" });
});

// Start the server
app.listen(4000, () => console.log("🚀 Server running on port 4000"));
