import { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich chocolate.',
    price: 3.99,
    category: 'pastries',
    image: '/src/assets/images/chocolate-croissant.jpg',
    stock: 25,
    featured: true
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh strawberry glaze.',
    price: 5.99,
    category: 'cakes',
    image: '/src/assets/images/strawberry-cheesecake.jpg',
    stock: 15,
    featured: true
  },
  {
    id: 3,
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread with a perfect crust.',
    price: 6.99,
    category: 'breads',
    image: '/src/assets/images/sourdough-bread.jpg',
    stock: 10,
    featured: true
  },
  {
    id: 4,
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with juicy blueberries.',
    price: 2.99,
    category: 'pastries',
    image: '/src/assets/images/blueberry-muffin.jpg',
    stock: 20,
    featured: false
  },
  {
    id: 5,
    name: 'Cinnamon Roll',
    description: 'Soft, gooey cinnamon roll with cream cheese frosting.',
    price: 3.49,
    category: 'pastries',
    image: '/src/assets/images/cinnamon-roll.jpg',
    stock: 18,
    featured: false
  }
];

const AdminProducts = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<ProductForm />} />
      <Route path="/edit/:id" element={<ProductForm />} />
    </Routes>
  );
};

// Product List Component
const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };
  
  return (
    <div className="admin-products">
      <div className="admin-toolbar">
        <h2>Products</h2>
        <Link to="/admin/products/add" className="add-btn">
          <FaPlus /> Add Product
        </Link>
      </div>
      
      <div className="admin-filters">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search products..." 
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`featured-badge ${product.featured ? 'yes' : 'no'}`}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="actions">
                  <Link to={`/admin/products/edit/${product.id}`} className="edit-btn">
                    <FaEdit />
                  </Link>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Product Form Component
const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    featured: false
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
    
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would save the product to a database
      alert('Product saved successfully!');
      navigate('/admin/products');
    }
  };
  
  return (
    <div className="admin-product-form">
      <div className="admin-toolbar">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/products')}
        >
          <FaArrowLeft /> Back to Products
        </button>
        <h2>Add New Product</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4"
          ></textarea>
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              step="0.01" 
              min="0" 
            />
            {errors.price && <div className="error">{errors.price}</div>}
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
              <option value="breads">Breads</option>
              <option value="pastries">Pastries</option>
              <option value="cakes">Cakes</option>
              <option value="cookies">Cookies</option>
              <option value="pies">Pies</option>
            </select>
            {errors.category && <div className="error">{errors.category}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
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
            <label htmlFor="stock">Stock Quantity</label>
            <input 
              type="number" 
              id="stock" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              min="0" 
            />
            {errors.stock && <div className="error">{errors.stock}</div>}
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="featured" 
            name="featured" 
            checked={formData.featured} 
            onChange={handleChange} 
          />
          <label htmlFor="featured">Featured Product</label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-btn">Save Product</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProducts;
