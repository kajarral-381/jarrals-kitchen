import { useState, useMemo } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import Pagination from '../../components/Pagination';

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky croissant filled with rich chocolate. 85g per piece.',
    price: 3.99,
    category: 'pastries',
    image: '/src/assets/images/chocolate-croissant.jpg',
    stock: 25,
    featured: true
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh strawberry glaze. Available in 6" (serves 6-8) and 8" (serves 10-12).',
    price: 5.99,
    category: 'cakes',
    image: '/src/assets/images/strawberry-cheesecake.jpg',
    stock: 15,
    featured: true
  },
  {
    id: 3,
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread with a perfect crust. 500g loaf.',
    price: 6.99,
    category: 'breads',
    image: '/src/assets/images/sourdough-bread.jpg',
    stock: 10,
    featured: true
  },
  {
    id: 4,
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with juicy blueberries. 120g per piece.',
    price: 2.99,
    category: 'pastries',
    image: '/src/assets/images/blueberry-muffin.jpg',
    stock: 20,
    featured: false
  },
  {
    id: 5,
    name: 'Cinnamon Roll',
    description: 'Soft, gooey cinnamon roll with cream cheese frosting. 150g per piece.',
    price: 3.49,
    category: 'pastries',
    image: '/src/assets/images/cinnamon-roll.jpg',
    stock: 18,
    featured: false
  },
  {
    id: 6,
    name: 'Baguette',
    description: 'Traditional French baguette with crispy crust and soft interior. 250g per loaf.',
    price: 2.99,
    category: 'breads',
    image: '/src/assets/images/baguette.jpg',
    stock: 15,
    featured: false
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate ganache. Available in 6" (serves 6-8) and 8" (serves 10-12).',
    price: 28.99,
    category: 'cakes',
    image: '/src/assets/images/chocolate-cake.jpg',
    stock: 8,
    featured: true
  },
  {
    id: 8,
    name: 'Apple Pie',
    description: 'Classic apple pie with cinnamon and flaky crust. 9" pie serves 8.',
    price: 18.99,
    category: 'pies',
    image: '/src/assets/images/apple-pie.jpg',
    stock: 12,
    featured: true
  },
  {
    id: 9,
    name: 'Chocolate Chip Cookie',
    description: 'Soft and chewy chocolate chip cookie. 80g per piece.',
    price: 1.99,
    category: 'cookies',
    image: '/src/assets/images/chocolate-chip-cookie.jpg',
    stock: 40,
    featured: false
  },
  {
    id: 10,
    name: 'Almond Croissant',
    description: 'Buttery croissant filled with almond cream and topped with sliced almonds. 95g per piece.',
    price: 4.49,
    category: 'pastries',
    image: '/src/assets/images/almond-croissant.jpg',
    stock: 15,
    featured: false
  },
  {
    id: 11,
    name: 'Whole Wheat Bread',
    description: 'Nutritious whole wheat bread. 450g loaf.',
    price: 5.49,
    category: 'breads',
    image: '/src/assets/images/whole-wheat-bread.jpg',
    stock: 20,
    featured: false
  },
  {
    id: 12,
    name: 'Red Velvet Cupcake',
    description: 'Moist red velvet cupcake with cream cheese frosting. 90g per piece.',
    price: 3.49,
    category: 'pastries',
    image: '/src/assets/images/red-velvet-cupcake.jpg',
    stock: 24,
    featured: true
  },
  {
    id: 13,
    name: 'Oatmeal Raisin Cookie',
    description: 'Chewy oatmeal cookie with plump raisins. 75g per piece.',
    price: 1.79,
    category: 'cookies',
    image: '/src/assets/images/oatmeal-raisin-cookie.jpg',
    stock: 30,
    featured: false
  },
  {
    id: 14,
    name: 'Lemon Tart',
    description: 'Tangy lemon tart with buttery crust. 4" individual tart.',
    price: 4.99,
    category: 'pastries',
    image: '/src/assets/images/lemon-tart.jpg',
    stock: 15,
    featured: false
  },
  {
    id: 15,
    name: 'Carrot Cake',
    description: 'Spiced carrot cake with cream cheese frosting. Available in 6" (serves 6-8) and 8" (serves 10-12).',
    price: 24.99,
    category: 'cakes',
    image: '/src/assets/images/carrot-cake.jpg',
    stock: 10,
    featured: true
  },
  {
    id: 16,
    name: 'Focaccia',
    description: 'Italian focaccia with olive oil and herbs. 300g per piece.',
    price: 5.99,
    category: 'breads',
    image: '/src/assets/images/focaccia.jpg',
    stock: 12,
    featured: false
  },
  {
    id: 17,
    name: 'Blueberry Cheesecake',
    description: 'Creamy cheesecake topped with blueberry compote. Available in 6" (serves 6-8) and 8" (serves 10-12).',
    price: 26.99,
    category: 'cakes',
    image: '/src/assets/images/blueberry-cheesecake.jpg',
    stock: 8,
    featured: false
  },
  {
    id: 18,
    name: 'Chocolate Eclair',
    description: 'Classic éclair filled with vanilla custard and topped with chocolate glaze. 120g per piece.',
    price: 3.99,
    category: 'pastries',
    image: '/src/assets/images/chocolate-eclair.jpg',
    stock: 18,
    featured: false
  },
  {
    id: 19,
    name: 'Pecan Pie',
    description: 'Sweet pecan pie with caramelized filling. 9" pie serves 8.',
    price: 19.99,
    category: 'pies',
    image: '/src/assets/images/pecan-pie.jpg',
    stock: 10,
    featured: false
  },
  {
    id: 20,
    name: 'Macaron Box',
    description: 'Assorted French macarons in various flavors. Box of 6 (15g each).',
    price: 12.99,
    category: 'cookies',
    image: '/src/assets/images/macaron-box.jpg',
    stock: 15,
    featured: true
  },
  {
    id: 21,
    name: 'Rye Bread',
    description: 'Traditional rye bread with caraway seeds. 400g loaf.',
    price: 5.49,
    category: 'breads',
    image: '/src/assets/images/rye-bread.jpg',
    stock: 10,
    featured: false
  },
  {
    id: 22,
    name: 'Tiramisu',
    description: 'Italian tiramisu with coffee-soaked ladyfingers and mascarpone cream. Individual portion (150g).',
    price: 5.99,
    category: 'pastries',
    image: '/src/assets/images/tiramisu.jpg',
    stock: 12,
    featured: true
  },
  {
    id: 23,
    name: 'Pumpkin Pie',
    description: 'Seasonal pumpkin pie with warm spices. 9" pie serves 8.',
    price: 17.99,
    category: 'pies',
    image: '/src/assets/images/pumpkin-pie.jpg',
    stock: 15,
    featured: false
  },
  {
    id: 24,
    name: 'Shortbread Cookies',
    description: 'Buttery Scottish shortbread cookies. Pack of 6 (20g each).',
    price: 4.99,
    category: 'cookies',
    image: '/src/assets/images/shortbread-cookies.jpg',
    stock: 20,
    featured: false
  },
  {
    id: 25,
    name: 'Banana Bread',
    description: 'Moist banana bread with walnuts. 350g loaf.',
    price: 7.99,
    category: 'breads',
    image: '/src/assets/images/banana-bread.jpg',
    stock: 10,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory]);

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

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <>
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
                {currentItems.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₨ {product.price.toFixed(2)}</td>
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

          {filteredProducts.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredProducts.length}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          ) : (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Product Form Component
const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Find product if in edit mode
  const productToEdit = isEditMode
    ? initialProducts.find(product => product.id === parseInt(id))
    : null;

  const [formData, setFormData] = useState(
    productToEdit
      ? { ...productToEdit }
      : {
          name: '',
          description: '',
          price: '',
          category: '',
          image: '',
          stock: '',
          featured: false
        }
  );
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
      if (isEditMode) {
        alert(`Product "${formData.name}" updated successfully!`);
      } else {
        alert(`Product "${formData.name}" added successfully!`);
      }
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
        <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
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
