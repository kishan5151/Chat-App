const express=require("express");
const {registerUser, authUser, allUser} = require("../controllers/userControllers");
const upload=require("../middlewares/multer");
const protect = require("../middlewares/authMiddleware");

const router= express.Router();

router.route("/register").post(upload.single('pic') ,registerUser)
router.post("/login",authUser)
router.get("/",protect,allUser);

module.exports= router;