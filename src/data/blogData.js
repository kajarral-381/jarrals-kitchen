import { sourdoughBlog, berryDesserts, alternativeFlours } from '../assets';

// Blog data with menu item focus and links to top-ranking food websites
export const blogPosts = [
  {
    id: 1,
    title: 'The Art of Pakistani Biryani: Secrets from Master Chefs',
    slug: 'pakistani-biryani-secrets',
    excerpt: 'Discover the authentic techniques behind our signature biryani dish, with insights from Pakistan\'s top culinary experts.',
    content: `
      <p>Biryani is more than just a dish in Pakistan—it's a celebration of flavors, aromas, and culinary heritage that has been perfected over centuries. At Jarral's Kitchen, our biryani has become one of our most requested menu items, combining traditional techniques with our own special touch.</p>

      <h3>The Heritage of Biryani</h3>

      <p>Biryani's journey through the Indian subcontinent has resulted in countless regional variations, each with its own distinct character. The Sindhi biryani, Karachi-style biryani, and Bombay biryani all have their devoted followers, but what makes a truly exceptional biryani comes down to a few key principles.</p>

      <p>According to <a href="https://www.dawn.com/news/1464502" target="_blank" rel="noopener noreferrer">Dawn's culinary experts</a>, the secret lies in the layering technique and the quality of the rice. "The rice should be 70% cooked before layering with the meat," explains renowned chef Saadat Ali Khan. "This allows it to finish cooking by absorbing the aromatic steam from the meat below."</p>

      <h3>Our Signature Approach</h3>

      <p>At Jarral's Kitchen, we prepare our biryani using basmati rice that's been aged for at least two years, which gives it a distinct aroma and ensures each grain remains separate after cooking. Our meat is marinated for a minimum of six hours in a blend of yogurt and spices, including:</p>

      <ul>
        <li>Freshly ground garam masala</li>
        <li>Saffron threads soaked in warm milk</li>
        <li>Mint and coriander leaves</li>
        <li>Green chilies for a subtle heat</li>
        <li>Caramelized onions for sweetness and depth</li>
      </ul>

      <p>Food critic Anisa Shad from <a href="https://tribune.com.pk/story/2307856/the-ultimate-guide-to-pakistani-biryani" target="_blank" rel="noopener noreferrer">The Express Tribune</a> notes that "the balance of spices in a great biryani should be complex yet harmonious, with no single flavor dominating."</p>

      <p>We invite you to experience our biryani on your next visit—a dish that represents the heart of Pakistani cuisine and our commitment to culinary excellence.</p>
    `,
    author: 'Chef Asad Mahmood',
    date: '2023-11-15',
    category: 'Pakistani Cuisine',
    image: sourdoughBlog,
    tags: ['biryani', 'pakistani food', 'rice dishes', 'signature menu']
  },
  {
    id: 2,
    title: 'The Perfect Cup: Exploring Pakistani Tea Culture',
    slug: 'pakistani-tea-culture',
    excerpt: 'Dive into the rich tradition of Pakistani tea and learn why our special chai has become a customer favorite.',
    content: `
      <p>In Pakistan, chai isn't just a beverage—it's a social institution, a comfort ritual, and for many, an essential part of daily life. At Jarral's Kitchen, we honor this tradition with our special chai preparations that have earned a dedicated following among our customers.</p>

      <h3>The Cultural Significance of Chai</h3>

      <p>Tea was introduced to the subcontinent during British colonial times but has since been transformed into something uniquely Pakistani. According to <a href="https://www.pakistantoday.com.pk/2021/03/21/tea-culture-in-pakistan/" target="_blank" rel="noopener noreferrer">Pakistan Today</a>, Pakistanis consume over 220,000 tons of tea annually, making it one of the largest tea markets in the world.</p>

      <p>"Tea in Pakistan is not just about the drink itself," explains food historian Rafia Rahim. "It's about the conversation, the company, and the moment of pause in a busy day."</p>

      <h3>Our Signature Chai</h3>

      <p>At Jarral's Kitchen, we offer several varieties of chai, each with its own character:</p>

      <ul>
        <li><strong>Doodh Patti:</strong> A rich, creamy tea made with milk, no water, and simmered slowly to develop a deep flavor</li>
        <li><strong>Masala Chai:</strong> Infused with cardamom, cinnamon, cloves, and ginger for a warming, spiced experience</li>
        <li><strong>Kashmiri Chai (Pink Tea):</strong> A special treat made with Kashmiri tea leaves, milk, and a pinch of salt, topped with crushed pistachios</li>
        <li><strong>Adrak Chai:</strong> For those who appreciate the zingy warmth of fresh ginger in their tea</li>
      </ul>

      <p>Food writer Maryam Jillani from <a href="https://www.eater.com/2019/5/14/18618240/pakistani-chai-tea-culture-history" target="_blank" rel="noopener noreferrer">Eater</a> describes Pakistani chai as "a hug in a cup," noting that "the best chai is often found in the simplest establishments, where the focus is on technique rather than fancy ingredients."</p>

      <p>We invite you to experience our chai service, paired perfectly with our freshly baked pastries for an authentic taste of Pakistani hospitality.</p>
    `,
    author: 'Fatima Rizvi',
    date: '2023-09-18',
    category: 'Beverages',
    image: berryDesserts,
    tags: ['chai', 'tea', 'pakistani beverages', 'cafe culture']
  },
  {
    id: 3,
    title: 'The Sweet Art of Pakistani Desserts: Beyond Borders',
    slug: 'pakistani-desserts-guide',
    excerpt: 'Explore our collection of traditional and fusion Pakistani desserts that have become the perfect ending to any meal.',
    content: `
      <p>Pakistani desserts represent a beautiful blend of indigenous traditions and influences from Persia, Central Asia, and the Mughal era. At Jarral's Kitchen, we take pride in offering both authentic classics and innovative fusion creations that honor this rich heritage.</p>

      <h3>The Heritage of Sweetness</h3>

      <p>Pakistani desserts are characterized by their richness, aromatic spices, and often, their syrupy sweetness. According to <a href="https://www.cntraveller.com/gallery/best-pakistani-desserts" target="_blank" rel="noopener noreferrer">Condé Nast Traveller</a>, many traditional sweets can be traced back to royal kitchens where they were perfected to please the palates of emperors and nobles.</p>

      <p>"What makes Pakistani desserts unique is the use of ingredients like khoya (reduced milk solids), fragrant cardamom, saffron, and rose water," explains pastry chef Samiya Ahmed. "These create layers of flavor that are distinctly South Asian."</p>

      <h3>Our Signature Desserts</h3>

      <p>Our dessert menu features several customer favorites:</p>

      <ul>
        <li><strong>Gulab Jamun:</strong> Soft milk-solid dumplings soaked in rose-scented syrup, served warm with a sprinkle of pistachios</li>
        <li><strong>Ras Malai:</strong> Delicate cheese patties soaked in saffron-infused milk, garnished with almonds and cardamom</li>
        <li><strong>Shahi Tukra:</strong> A royal bread pudding made with ghee-fried bread, reduced milk, and aromatic spices</li>
        <li><strong>Kheer:</strong> Rice pudding slow-cooked with milk, cardamom, and nuts for a comforting finish to any meal</li>
        <li><strong>Fusion Carrot Halwa Cake:</strong> Our modern take that combines traditional gajar halwa with Western cake techniques</li>
      </ul>

      <p>Food critic Anam Iqbal from <a href="https://images.dawn.com/news/1185782" target="_blank" rel="noopener noreferrer">Images by Dawn</a> notes that "the best Pakistani desserts maintain a balance between sweetness and the subtle aromatics that make them special. It's never just about sugar—it's about depth of flavor."</p>

      <p>We invite you to end your meal at Jarral's Kitchen with one of our handcrafted desserts, each representing centuries of culinary tradition reimagined for today's palate.</p>
    `,
    author: 'Zainab Malik',
    date: '2023-10-05',
    category: 'Desserts',
    image: alternativeFlours,
    tags: ['pakistani desserts', 'sweets', 'traditional', 'fusion']
  }
];

// Get blog post by slug
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Get blog posts by category
export const getBlogPostsByCategory = (category) => {
  return blogPosts.filter(post => post.category === category);
};

// Get blog posts by tag
export const getBlogPostsByTag = (tag) => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

// Get all categories
export const getAllCategories = () => {
  const categories = blogPosts.map(post => post.category);
  return [...new Set(categories)]; // Remove duplicates
};

// Get all tags
export const getAllTags = () => {
  const tags = blogPosts.flatMap(post => post.tags);
  return [...new Set(tags)]; // Remove duplicates
};
