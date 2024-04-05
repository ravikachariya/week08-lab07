const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const inventoryAPI = require("./controllers/inventoryAPIController");
const inventorySSR = require("./controllers/inventorySSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with inventorys using EJS
app.get("/", inventorySSR.renderInventorys);
// Define a route to render the addinventory.ejs view
app.get("/addinventory", inventorySSR.renderForm);
// Route to add  inventory using EJ
app.post("/addinventory", inventorySSR.addInventory);
// Define a route to render the singleinventory.ejs view
app.get("/single-inventory/:id", inventorySSR.renderInventory);
// Define a route to delete singleinventory
app.delete("/single-inventory/:id", inventorySSR.deleteInventory);
// Define a route to update single inventory.ejs
app.put("/single-inventory/:id", inventorySSR.updateInventory);
// Define inventory to update
app.get("/single-inventory/update/:id", inventorySSR.renderUpdateInventory);

// API
// GET all Inventorys
app.get("/api/inventorys", inventoryAPI.getInventorys);
// POST a new Inventory
app.post("/api/inventorys", inventoryAPI.addInventory);
// GET a single Inventory
app.get("/api/inventorys/:id", inventoryAPI.getInventory);
// Update Inventory using PUT
app.put("/api/inventorys/:id", inventoryAPI.updateInventory);
// DELETE a Inventory
app.delete("/api/inventorys/:id", inventoryAPI.deleteInventory);
// DELETE all Inventory
app.delete("/api/inventorys", inventoryAPI.deleteAllInventorys);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});