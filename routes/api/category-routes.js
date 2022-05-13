const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    include: [Product],
  });

  if (!categories) {
    res.status(404).json({ message: "No categories found!" });
    return;
  }
  res.json(categories);
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });

  if (!category) {
    res.status(404).json({ message: "No category with that ID found!" });
    return;
  }
  res.json(category);
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create({
    category_name: req.body.name,
  }).catch((err) => console.log(err));

  res.json(newCategory);
});
router.put("/:id", async (req, res) => {
  const updatedCategory = await Category.update(
    {
      category_name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).catch((err) => console.log(err));
  if (!updatedCategory) {
    res.status(404).json({ message: "There is no category with this ID!" });
    return;
  }

  res.json({ message: "Category Updated!" });
});

router.delete("/:id", async (req, res) => {
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => console.log(err));

  if (!deleteCategory) {
    res.status(404).json({ message: "There is no category with this ID!" });
    return;
  }
  res.json({ message: "Category deleted!" });
});

module.exports = router;
