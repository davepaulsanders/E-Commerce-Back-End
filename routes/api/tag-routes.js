const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tags = await Tag.findAll({
    include: [Product],
  });
  if (!tags) {
    res.status(404).send({ message: "No tags found!" });
    return;
  }
  res.json(tags);
});

router.get("/:id", async (req, res) => {
  const tag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });

  if (!tag) {
    res.status(404).json({ message: "No tag with that ID found!" });
    return;
  }
  res.json(tag);
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create({
    category_name: req.body.name,
  }).catch((err) => console.log(err));

  res.json(newCategory);
});
router.put("/:id", async (req, res) => {
  const updatedTag = await Tag.update(
    {
      tag_name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).catch((err) => console.log(err));

  if (!updatedTag) {
    res.status(404).json({ message: "There is no tag with this ID" });
    return;
  }
  res.json({ message: "Tag Updated!" });
});

router.delete("/:id", (req, res) => {
  const deleteTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => console.log(err));

  if (!deleteTage) {
    res.status(404).json({ message: "There is no tag with this ID!" });
    return;
  }
  res.json({ message: "Tag deleted!" });
});

module.exports = router;
