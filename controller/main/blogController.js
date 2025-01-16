import Blog from "../../model/main/BlogModel.js";

// Create a new blog
export const createBlog = async (req, res) => {
  const { title, detail, image } = req.body;
  try {
    const newBlog = await Blog.create({ title, detail, image });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blogs with pagination
export const getAllBlogs = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;

  try {
    const { rows: blogs, count } = await Blog.findAndCountAll({
      limit: parseInt(perPage),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']], // Sort by latest
    });

    res.status(200).json({
      blogs,
      totalItems: count,
      totalPages: Math.ceil(count / perPage),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, detail, image } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title;
    blog.detail = detail;
    blog.image = image;

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.destroy();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};