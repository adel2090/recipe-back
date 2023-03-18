const express = require("express");
const router = express.Router();
 const animal = ["cat", "dog", "fish"];

router.get("/", (req, res) => {
  res.json({ animal, status: "ok" });
});

router.post("/",(req,res)=>{
    console.log(req.body);
    res.status(201).json({msg:"ok"})
})



router.get("/qparams",(req,res)=>{
    console.log({msg:animal[req.query.index]});
})

router.get("/:id",(req,res)=>{
    console.log("params",req.params);
    res.json({msg:animal[req.params.id]})
})
module.exports = router;
