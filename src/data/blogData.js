import { sourdoughBlog, berryDesserts, alternativeFlours } from '../assets';

// Mock blog data
export const blogPosts = [
  {
    id: 1,
    title: 'The Art of Sourdough: Tips for Perfect Bread Every Time',
    slug: 'art-of-sourdough',
    excerpt: 'Learn the secrets to creating delicious sourdough bread with our step-by-step guide and expert tips.',
    content: `
      <p>Sourdough bread has experienced a renaissance in recent years, with home bakers everywhere trying their hand at this ancient craft. What makes sourdough special isn't just its distinctive tangy flavor, but the process itself—a dance of flour, water, salt, and time that creates something truly magical.</p>

      <h3>Starting Your Sourdough Journey</h3>

      <p>The heart of any sourdough bread is the starter—a fermented mixture of flour and water that contains wild yeast and beneficial bacteria. Creating your own starter is simple, though it requires patience:</p>

      <ol>
        <li>Mix equal parts flour and water in a jar (100g of each is a good start)</li>
        <li>Cover loosely and let sit at room temperature for 24 hours</li>
        <li>The next day, discard half and feed with equal parts flour and water</li>
        <li>Repeat this process daily until your starter is consistently doubling in size after feeding (usually 7-10 days)</li>
      </ol>

      <h3>The Perfect Dough</h3>

      <p>Once your starter is active and bubbly, you're ready to make bread. Here's a basic recipe to get you started:</p>

      <ul>
        <li>500g bread flour</li>
        <li>350g water</li>
        <li>100g active sourdough starter</li>
        <li>10g salt</li>
      </ul>

      <p>The key to great sourdough is not just the ingredients but the technique. Proper folding rather than kneading, a long, slow fermentation, and careful shaping all contribute to that perfect loaf with a crackling crust and open, airy crumb.</p>

      <h3>Baking for Success</h3>

      <p>For that professional-quality crust, steam is essential. Home bakers can replicate bakery conditions by using a Dutch oven or placing a tray of water in the bottom of the oven. Bake at a high temperature (450°F/230°C) for the first 20 minutes, then reduce the heat and continue baking until the loaf is golden brown and sounds hollow when tapped on the bottom.</p>

      <p>Remember, sourdough baking is as much art as science. Each loaf is unique, and even "mistakes" are usually delicious. The more you bake, the more intuitive the process becomes, and soon you'll be creating beautiful, flavorful loaves that would make any artisan baker proud.</p>
    `,
    author: 'Jane Thompson',
    date: '2023-04-15',
    category: 'Baking Tips',
    image: sourdoughBlog,
    tags: ['bread', 'sourdough', 'baking tips']
  },
  {
    id: 2,
    title: 'Seasonal Fruit Desserts: Summer Berry Edition',
    slug: 'seasonal-fruit-desserts-summer',
    excerpt: 'Discover delightful ways to incorporate fresh summer berries into your desserts with these easy recipes.',
    content: `
      <p>Summer brings an abundance of fresh, juicy berries that are perfect for creating spectacular desserts. From simple strawberry shortcakes to elegant blueberry galettes, there's no limit to what you can create with these seasonal gems.</p>

      <h3>Choosing the Best Berries</h3>

      <p>The key to amazing berry desserts starts at selection. Here's what to look for:</p>

      <ul>
        <li><strong>Strawberries:</strong> Bright red, fragrant, and firm with fresh green caps</li>
        <li><strong>Blueberries:</strong> Plump, firm, and deep blue with a silvery bloom</li>
        <li><strong>Raspberries:</strong> Bright, dry, and plump without mushiness</li>
        <li><strong>Blackberries:</strong> Shiny, deep black (not red), and firm</li>
      </ul>

      <h3>Classic Summer Berry Tart</h3>

      <p>One of our favorite ways to showcase summer berries is in a classic tart. The combination of buttery pastry, vanilla custard, and fresh berries is simply unbeatable.</p>

      <p><strong>For the pastry:</strong></p>
      <ul>
        <li>200g all-purpose flour</li>
        <li>100g cold butter, cubed</li>
        <li>30g powdered sugar</li>
        <li>1 egg yolk</li>
        <li>2-3 tbsp cold water</li>
      </ul>

      <p><strong>For the filling:</strong></p>
      <ul>
        <li>500ml milk</li>
        <li>1 vanilla pod, split and seeds scraped</li>
        <li>4 egg yolks</li>
        <li>100g sugar</li>
        <li>40g cornstarch</li>
        <li>500g mixed summer berries</li>
        <li>Apricot jam for glazing</li>
      </ul>

      <p>The contrast of the crisp pastry, creamy custard, and fresh berries makes this tart a showstopper at any summer gathering.</p>

      <h3>Quick Berry Desserts</h3>

      <p>Not every berry dessert needs to be elaborate. Some of the best summer treats are the simplest:</p>

      <ol>
        <li><strong>Macerated Berries:</strong> Toss sliced strawberries with a little sugar and a splash of balsamic vinegar. Let sit for 30 minutes and serve over vanilla ice cream.</li>
        <li><strong>Berry Fool:</strong> Fold lightly crushed berries into whipped cream for an elegant, no-bake dessert.</li>
        <li><strong>Grilled Peaches with Berries:</strong> Grill halved peaches until caramelized, then top with fresh berries and a drizzle of honey.</li>
      </ol>

      <p>However you choose to use them, summer berries bring color, flavor, and joy to the dessert table. Enjoy them while they're at their peak!</p>
    `,
    author: 'Michael Thompson',
    date: '2023-06-22',
    category: 'Recipes',
    image: berryDesserts,
    tags: ['desserts', 'berries', 'summer', 'recipes']
  },
  {
    id: 3,
    title: 'Baking with Alternative Flours: A Guide to Gluten-Free Options',
    slug: 'baking-with-alternative-flours',
    excerpt: 'Explore the world of gluten-free baking with our comprehensive guide to alternative flours and their unique properties.',
    content: `
      <p>As awareness of gluten sensitivities grows and more people seek diverse nutritional options, alternative flours have moved from specialty stores to mainstream baking. Whether you're avoiding gluten for health reasons or simply exploring new flavors and textures, the world of alternative flours offers exciting possibilities.</p>

      <h3>Understanding Alternative Flours</h3>

      <p>Unlike wheat flour, which contains gluten proteins that provide structure and elasticity to baked goods, alternative flours each have their own unique properties. Learning how they behave is key to successful gluten-free baking.</p>

      <h3>Popular Gluten-Free Flours</h3>

      <p><strong>Almond Flour:</strong> Made from blanched, ground almonds, this flour adds moisture and a subtle nutty flavor to baked goods. It's high in protein and healthy fats but low in carbohydrates, making it popular for keto and paleo diets. Works well in cookies, cakes, and quick breads.</p>

      <p><strong>Rice Flour:</strong> Available in both white and brown varieties, rice flour has a neutral flavor and fine texture. It's often used as a base in gluten-free flour blends. On its own, it can create a somewhat gritty texture, so it's usually combined with other flours and starches.</p>

      <p><strong>Oat Flour:</strong> With its mild, slightly sweet flavor, oat flour adds moisture and a tender crumb to baked goods. While naturally gluten-free, oats can be cross-contaminated during processing, so look for certified gluten-free oat flour if necessary.</p>

      <p><strong>Buckwheat Flour:</strong> Despite its name, buckwheat isn't related to wheat and is naturally gluten-free. It has a distinctive, earthy flavor that works well in pancakes, crepes, and certain breads. It's also nutritionally dense, offering protein, fiber, and minerals.</p>

      <h3>Blending for Success</h3>

      <p>Most successful gluten-free baking relies not on a single alternative flour but on thoughtful blends. A typical approach includes:</p>

      <ul>
        <li>60-70% base flours (rice, sorghum, millet)</li>
        <li>20-30% protein/fiber flours (almond, oat, buckwheat)</li>
        <li>10-20% starches (tapioca, potato, cornstarch)</li>
      </ul>

      <p>Additionally, ingredients like xanthan gum, psyllium husk, or ground flaxseed help provide the binding properties that gluten would normally contribute.</p>

      <h3>Recipe: Simple Gluten-Free Banana Bread</h3>

      <p>Here's a simple recipe to get you started with alternative flour baking:</p>

      <ul>
        <li>1 cup almond flour</li>
        <li>1/2 cup oat flour</li>
        <li>1/4 cup tapioca starch</li>
        <li>1 tsp baking soda</li>
        <li>1/2 tsp salt</li>
        <li>1/4 tsp xanthan gum</li>
        <li>3 ripe bananas, mashed</li>
        <li>2 eggs</li>
        <li>1/3 cup maple syrup</li>
        <li>1/4 cup melted coconut oil</li>
        <li>1 tsp vanilla extract</li>
        <li>1/2 cup chopped walnuts (optional)</li>
      </ul>

      <p>Bake at 350°F (175°C) for 50-55 minutes in a loaf pan lined with parchment paper.</p>

      <p>Remember, gluten-free baking often requires more moisture and benefits from longer rest times before baking. With practice and experimentation, you'll discover the wonderful world of flavors and textures that alternative flours can bring to your baking repertoire.</p>
    `,
    author: 'Emily Chen',
    date: '2023-05-10',
    category: 'Gluten-Free',
    image: alternativeFlours,
    tags: ['gluten-free', 'alternative flours', 'baking']
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
