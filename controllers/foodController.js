const Food = require('../models/Food');

// GET all food items
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new food item
exports.createFood = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const food = new Food({ name, description, price });
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
