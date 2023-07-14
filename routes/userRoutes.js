const router = require("express").Router();
const User = require("../models/User");

//inscription
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).send("L'adresse Email existe déjà");
    res.status(400).send(error.message);
  }
});

//connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//obtenir des utilisateurs;

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// obtenir les commandes des utilisateurs

router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//mettre à jour la notification des utilisateurs

router.post("/:id/updateNotifications", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.notifications.forEach((notif) => {
      notif.status = "read";
    });
    user.markModified("notifications");
    await user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
