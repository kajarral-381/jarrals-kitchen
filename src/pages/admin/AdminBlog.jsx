import { useState } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { blogPosts } from '../../data/blogData';

const AdminBlog = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/add" element={<BlogForm />} />
      <Route path="/edit/:id" element={<BlogForm />} />
    </Routes>
  );
};

// Blog List Component
const BlogList = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(posts.map(post => post.category))];
  
  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="admin-blog">
      <div className="admin-toolbar">
        <h2>Blog Posts</h2>
        <Link to="/admin/blog/add" className="add-btn">
          <FaPlus /> Add Post
        </Link>
      </div>
      
      <div className="admin-filters">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td>
                  <div className="post-title-cell">
                    <div className="post-image">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="post-title">{post.title}</div>
                  </div>
                </td>
                <td>{post.author}</td>
                <td>{post.category}</td>
                <td>{formatDate(post.date)}</td>
                <td className="actions">
                  <Link to={`/admin/blog/edit/${post.id}`} className="edit-btn">
                    <FaEdit />
                  </Link>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="no-results">
          <p>No blog posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Blog Form Component
const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // Find post by ID if in edit mode
  const existingPost = isEditMode ? blogPosts.find(post => post.id === parseInt(id)) : null;
  
  const [formData, setFormData] = useState(
    existingPost ? {
      title: existingPost.title,
      slug: existingPost.slug,
      excerpt: existingPost.excerpt,
      content: existingPost.content,
      author: existingPost.author,
      category: existingPost.category,
      image: existingPost.image,
      tags: existingPost.tags.join(', ')
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      image: '',
      tags: ''
    }
  );
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      setFormData(prevData => ({
        ...prevData,
        slug
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (!formData.excerpt) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content) newErrors.content = 'Content is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would save the blog post to a database
      alert(`Blog post ${isEditMode ? 'updated' : 'created'} successfully!`);
      navigate('/admin/blog');
    }
  };
  
  return (
    <div className="admin-blog-form">
      <div className="admin-toolbar">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/blog')}
        >
          <FaArrowLeft /> Back to Blog Posts
        </button>
        <h2>{isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input 
            type="text" 
            id="slug" 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
          />
          {errors.slug && <div className="error">{errors.slug}</div>}
          <div className="field-hint">URL-friendly version of the title</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea 
            id="excerpt" 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            rows="2"
          ></textarea>
          {errors.excerpt && <div className="error">{errors.excerpt}</div>}
          <div className="field-hint">A brief summary of the post</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea 
            id="content" 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            rows="15"
          ></textarea>
          {errors.content && <div className="error">{errors.content}</div>}
          <div className="field-hint">HTML content is supported</div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              value={formData.author} 
              onChange={handleChange} 
            />
            {errors.author && <div className="error">{errors.author}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Baking Tips">Baking Tips</option>
              <option value="Recipes">Recipes</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Seasonal">Seasonal</option>
              <option value="News">News</option>
            </select>
            {errors.category && <div className="error">{errors.category}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Featured Image URL</label>
          <input 
            type="text" 
            id="image" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
          />
          {errors.image && <div className="error">{errors.image}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input 
            type="text" 
            id="tags" 
            name="tags" 
            value={formData.tags} 
            onChange={handleChange} 
          />
          <div className="field-hint">Comma-separated list of tags</div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-btn">
            {isEditMode ? 'Update Post' : 'Publish Post'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/admin/blog')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlog;
