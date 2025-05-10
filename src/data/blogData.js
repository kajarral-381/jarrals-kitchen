import { sourdoughBlog, berryDesserts, alternativeFlours } from '../assets';

// Blog data with bakery focus and links to top-ranking food websites
export const blogPosts = [
  {
    id: 1,
    title: 'The Art of Sourdough: Secrets from Master Bakers',
    slug: 'sourdough-bread-secrets',
    excerpt: 'Discover the authentic techniques behind our signature sourdough bread, with insights from top artisanal bakers.',
    content: `
      <p>Sourdough is more than just bread—it\'s a celebration of flavors, aromas, and baking heritage that has been perfected over centuries. At Sweet Delights Bakery, our sourdough has become one of our most requested items, combining traditional techniques with our own special touch.</p>

      <h3>The Heritage of Sourdough</h3>

      <p>Sourdough\'s journey through history has resulted in countless regional variations, each with its own distinct character. The San Francisco sourdough, French pain au levain, and Italian pane casareccio all have their devoted followers, but what makes a truly exceptional sourdough comes down to a few key principles.</p>

      <p>According to <a href="https://www.kingarthurbaking.com/blog/2018/10/30/maintaining-a-sourdough-starter-food-water-and-time" target="_blank" rel="noopener noreferrer">King Arthur Baking\'s experts</a>, the secret lies in the starter maintenance and fermentation technique. "The starter should be fed regularly and allowed to develop complex flavors," explains renowned baker Chad Robertson. "This allows it to create that perfect balance of tang and depth."</p>

      <h3>Our Signature Approach</h3>

      <p>At Sweet Delights Bakery, we prepare our sourdough using a starter that\'s been maintained for over five years, which gives it a distinct flavor profile and ensures a consistent rise. Our dough undergoes a long, cold fermentation process that includes:</p>

      <ul>
        <li>Freshly milled organic flour</li>
        <li>Filtered water at precise temperatures</li>
        <li>18-24 hour cold fermentation</li>
        <li>Hand-folding techniques for perfect structure</li>
        <li>Stone-hearth baking for the ideal crust</li>
      </ul>

      <p>Food writer Sarah Owens from <a href="https://www.bonappetit.com/story/sourdough-starter-tips" target="_blank" rel="noopener noreferrer">Bon Appétit</a> notes that "the best sourdough has a balance of acidity that should be complex yet harmonious, with no single flavor dominating."</p>

      <p>We invite you to experience our sourdough on your next visit—a bread that represents the heart of artisanal baking and our commitment to culinary excellence. Each 500g loaf is perfect for sharing and stays fresh for up to 5 days.</p>
    `,
    author: 'Chef Michael Thompson',
    date: '2023-11-15',
    category: 'Baking Tips',
    image: sourdoughBlog,
    tags: ['sourdough', 'artisan bread', 'fermentation', 'signature menu']
  },
  {
    id: 2,
    title: 'Seasonal Berry Delights: Summer\'s Sweetest Offerings',
    slug: 'seasonal-berry-desserts',
    excerpt: 'Dive into our collection of summer berry desserts and learn why our berry-focused pastries have become customer favorites.',
    content: `
      <p>Summer berries aren\'t just ingredients—they\'re nature\'s candy, bursting with flavor and nutrition. At Sweet Delights Bakery, we honor these seasonal treasures with our special berry-focused creations that have earned a dedicated following among our customers.</p>

      <h3>The Magic of Seasonal Berries</h3>

      <p>Using seasonal berries in baking isn\'t just about flavor—it\'s about sustainability and quality. According to <a href="https://www.seriouseats.com/how-to-select-store-and-use-fresh-berries" target="_blank" rel="noopener noreferrer">Serious Eats</a>, berries are at their nutritional peak and most flavorful when enjoyed in season.</p>

      <p>"Seasonal berries require minimal enhancement," explains pastry chef Claire Saffitz. "They\'re about celebrating the pure, intense flavors that only come from fruit picked at the perfect moment."</p>

      <h3>Our Signature Berry Creations</h3>

      <p>At Sweet Delights Bakery, we offer several berry-focused treats, each with its own character:</p>

      <ul>
        <li><strong>Mixed Berry Tart (150g):</strong> A buttery shortcrust filled with vanilla custard and topped with a medley of seasonal berries</li>
        <li><strong>Blueberry Crumb Muffins (120g):</strong> Moist muffins bursting with blueberries and topped with a cinnamon streusel</li>
        <li><strong>Strawberry Cheesecake (6" serves 6-8, 8" serves 10-12):</strong> Creamy cheesecake on a graham cracker base with fresh strawberry compote</li>
        <li><strong>Raspberry Almond Croissants (95g):</strong> Our classic almond croissants with a core of raspberry jam</li>
      </ul>

      <p>Food writer Stella Parks from <a href="https://www.seriouseats.com/fresh-blackberry-cake-recipe" target="_blank" rel="noopener noreferrer">Serious Eats</a> describes the perfect berry dessert as "one that frames the fruit rather than masks it, allowing its natural brightness to shine through."</p>

      <p>We invite you to experience our seasonal berry creations, available only during summer months when the fruit is at its peak quality and flavor.</p>
    `,
    author: 'Emma Richards',
    date: '2023-07-18',
    category: 'Seasonal',
    image: berryDesserts,
    tags: ['berries', 'summer desserts', 'seasonal baking', 'fruit']
  },
  {
    id: 3,
    title: 'Baking with Alternative Flours: A Guide to Gluten-Free Goodness',
    slug: 'alternative-flours-guide',
    excerpt: 'Explore our collection of gluten-free baked goods and learn about the alternative flours that make them possible.',
    content: `
      <p>Alternative flours represent a beautiful blend of tradition and innovation in the baking world. At Sweet Delights Bakery, we take pride in offering both classic and creative gluten-free options that never compromise on taste or texture.</p>

      <h3>Understanding Alternative Flours</h3>

      <p>Gluten-free baking has evolved dramatically in recent years, moving beyond simple substitutions to sophisticated blends that celebrate the unique properties of each flour. According to <a href="https://www.kingarthurbaking.com/blog/2019/10/07/guide-to-alternative-flours" target="_blank" rel="noopener noreferrer">King Arthur Baking</a>, successful gluten-free baking often relies on combining different flours to achieve the right structure and flavor.</p>

      <p>"What makes alternative flour baking exciting is the opportunity to discover new flavors and textures," explains pastry chef Alice Medrich. "These aren\'t just substitutes—they\'re ingredients with their own distinctive qualities to celebrate."</p>

      <h3>Our Gluten-Free Offerings</h3>

      <p>Our gluten-free menu features several customer favorites:</p>

      <ul>
        <li><strong>Almond Flour Chocolate Cake (6" serves 6-8):</strong> Rich, moist chocolate cake with a tender crumb, naturally gluten-free</li>
        <li><strong>Buckwheat Cherry Scones (85g):</strong> Nutty, flavorful scones studded with dried cherries</li>
        <li><strong>Coconut Flour Lemon Bars (70g):</strong> Tangy lemon filling on a coconut shortbread base</li>
        <li><strong>Brown Rice Flour Bread (400g loaf):</strong> A versatile sandwich bread with excellent structure and flavor</li>
        <li><strong>Oat and Teff Flour Cookies (50g each):</strong> Chewy cookies with complex flavor and wholesome nutrition</li>
      </ul>

      <p>Food scientist Kenji López-Alt from <a href="https://www.seriouseats.com/gluten-free-tuesday-pancakes" target="_blank" rel="noopener noreferrer">Serious Eats</a> notes that "the best gluten-free baking doesn't try to perfectly mimic wheat-based products but instead celebrates the unique characteristics of alternative ingredients."</p>

      <p>We invite you to explore our gluten-free options—each representing our commitment to inclusive baking that never sacrifices quality or flavor.</p>
    `,
    author: 'Dr. Sarah Chen',
    date: '2023-10-05',
    category: 'Gluten-Free',
    image: alternativeFlours,
    tags: ['gluten-free', 'alternative flours', 'specialty diets', 'inclusive baking']
  },
  {
    id: 4,
    title: 'Cake Decorating 101: Professional Techniques for Home Bakers',
    slug: 'cake-decorating-techniques',
    excerpt: 'Learn the essential cake decorating skills that can transform your homemade cakes into professional-looking masterpieces.',
    content: `
      <p>Cake decorating is where baking transforms from culinary craft to edible art. At Sweet Delights Bakery, we believe that beautiful decoration should enhance both the appearance and flavor of a cake, creating a complete sensory experience.</p>

      <h3>The Foundations of Great Cake Decorating</h3>

      <p>Professional-looking cake decoration begins with proper preparation. According to <a href="https://www.wilton.com/cake-decorating-basics/WLPROJ-7464.html" target="_blank" rel="noopener noreferrer">Wilton's decorating experts</a>, the key is starting with a well-structured cake and perfectly smooth frosting base.</p>

      <p>"The most common mistake home bakers make is rushing the crumb coat," explains cake artist Julia Usher. "Taking time with this foundation layer ensures a smooth canvas for your creative work and prevents crumbs from showing through."</p>

      <h3>Essential Techniques Anyone Can Master</h3>

      <p>Our cake decorating workshops focus on these fundamental techniques that yield impressive results:</p>

      <ul>
        <li><strong>Proper Leveling:</strong> Creating perfectly flat cake layers using a long serrated knife or cake leveler</li>
        <li><strong>Crumb Coating:</strong> Applying a thin base layer of frosting to seal in crumbs before the final coat</li>
        <li><strong>Smooth Buttercream:</strong> Achieving that flawless finish using a bench scraper and offset spatula</li>
        <li><strong>Basic Piping:</strong> Creating borders, rosettes, and simple flowers with just a few piping tips</li>
        <li><strong>Color Blending:</strong> Techniques for creating ombré effects and consistent food coloring usage</li>
      </ul>

      <p>Cake decorator Tessa Huff from <a href="https://www.stylesweetca.com/blog/2020/4/1/cake-decorating-tips-for-beginners" target="_blank" rel="noopener noreferrer">Style Sweet CA</a> emphasizes that "temperature control is crucial—working with room-temperature frosting for smooth application, then chilling between steps to set each layer."</p>

      <h3>Sizing and Serving</h3>

      <p>Understanding cake sizing helps ensure you create the right cake for your needs:</p>

      <ul>
        <li><strong>6" round cake:</strong> Serves 6-8 people (approximately 900g)</li>
        <li><strong>8" round cake:</strong> Serves 10-12 people (approximately 1.5kg)</li>
        <li><strong>10" round cake:</strong> Serves 16-20 people (approximately 2.5kg)</li>
      </ul>

      <p>We invite you to join one of our monthly cake decorating workshops or order a custom cake for your next special occasion. Each of our decorated cakes represents our commitment to both visual beauty and exceptional flavor.</p>
    `,
    author: 'Jessica Williams',
    date: '2023-12-10',
    category: 'Baking Tips',
    image: berryDesserts,
    tags: ['cake decorating', 'baking techniques', 'buttercream', 'home baking']
  },
  {
    id: 5,
    title: 'Holiday Baking: Festive Treats for the Winter Season',
    slug: 'holiday-baking-guide',
    excerpt: 'Discover our collection of holiday baking recipes and tips to make your seasonal celebrations extra special.',
    content: `
      <p>The holiday season brings with it the warm, comforting aromas of spices, butter, and sugar that create lasting memories. At Sweet Delights Bakery, our holiday offerings combine traditional favorites with innovative twists to make your celebrations both nostalgic and exciting.</p>

      <h3>The Magic of Holiday Baking</h3>

      <p>Holiday baking is about more than just delicious treats—it\'s about creating traditions and memories. According to <a href="https://www.kingarthurbaking.com/blog/2019/12/05/holiday-baking-traditions" target="_blank" rel="noopener noreferrer">King Arthur Baking</a>, many of our most cherished holiday recipes have been passed down through generations, each family adding their own special touch.</p>

      <p>"Holiday baking connects us to our cultural heritage and to each other," explains food historian Michael Krondl. "The recipes we make in December often tell the story of our family\'s journey through time and place."</p>

      <h3>Our Seasonal Favorites</h3>

      <p>Our holiday menu features these customer favorites, available from November through December:</p>

      <ul>
        <li><strong>Gingerbread Cookies (50g each):</strong> Perfectly spiced with a soft center and crisp edges, decorated with royal icing</li>
        <li><strong>Stollen (750g loaf):</strong> Traditional German fruit bread with marzipan center, dusted with powdered sugar</li>
        <li><strong>Bûche de Noël (serves 8-10, approximately 1kg):</strong> Classic yule log cake with chocolate buttercream, meringue mushrooms, and festive decorations</li>
        <li><strong>Cranberry Orange Scones (85g each):</strong> Tender scones studded with tart cranberries and orange zest</li>
        <li><strong>Peppermint Chocolate Cupcakes (90g each):</strong> Rich chocolate cupcakes topped with peppermint buttercream and crushed candy canes</li>
      </ul>

      <p>Pastry chef Claire Saffitz from <a href="https://www.bonappetit.com/story/holiday-cookies-freezer" target="_blank" rel="noopener noreferrer">Bon Appétit</a> recommends planning ahead: "Most holiday cookies freeze beautifully, so you can bake in advance and reduce stress during the busiest time of year."</p>

      <h3>Pre-Order for the Holidays</h3>

      <p>Our holiday items are available for pre-order starting November 1st each year. We recommend placing orders at least one week in advance for:</p>

      <ul>
        <li><strong>Holiday Cookie Boxes (assorted, 12 cookies, 600g):</strong> Perfect for gifting or sharing</li>
        <li><strong>Festive Cakes (6" serves 6-8, 8" serves 10-12):</strong> Custom decorated for your celebration</li>
        <li><strong>Dinner Rolls (dozen, 600g):</strong> Fresh-baked for your holiday table</li>
      </ul>

      <p>We invite you to make Sweet Delights Bakery part of your holiday tradition. Our seasonal offerings are crafted with premium ingredients and attention to detail that will make your celebrations truly special.</p>
    `,
    author: 'Chef Robert Johnson',
    date: '2023-11-28',
    category: 'Seasonal',
    image: sourdoughBlog,
    tags: ['holiday baking', 'christmas', 'seasonal treats', 'winter']
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
