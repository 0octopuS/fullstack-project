const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "`password` is shorter than the minimum allowed length (3)",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

router.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

router.get("/:userId", async (request, response) => {
  const { userId } = request.params;

  try {
    const user = await User.findById(userId).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
