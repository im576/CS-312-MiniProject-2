



// express for server
const express = require("express");

// axios for cocktail data
const axios = require("axios");


// paths
const path = require("path");


// make app
const app = express();

// port
const PORT = 3000;

// EJS for view wngine
app.set("view engine", "ejs");


//app reads data
//serve static files
//show the index.ejs page when someone visits the home url
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index", { error: null });

});

// random clocktail
app.post("/random", async (req, res) => 
  
  {

  try 
  
  {
    //cocktail api for random
    const { data } = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const drink = data?.drinks?.[0];
    if (!drink) throw new Error("No drink found.");
    res.render("result", { drink, mode: "Random" });

  } 
  
  catch (err) 
  
  {
    // error
    res.render("index", { error: "Could not fetch a cocktail. Try again." });

  }

});

// use search
app.post("/search", async (req, res) => 
  
  {
  const { q = "" } = req.body;
  try 
  
  {
    // cocktail api for named drink
    const { data } = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php", 
      
      {
      params: { s: q }

    });
    const drink = data?.drinks?.[0];
    if (!drink) return res.render("index", { error: "No results. Try another name." });
    res.render("result", { drink, mode: `Search: ${q}` });
  } 
  
  catch 
  
  {
    //error
    res.render("index", { error: "Request failed. Please try again." });
  }
});

// start server
app.listen(PORT, () =>
  console.log(`🚀 Cocktails Search running at http://localhost:${PORT}`)
);