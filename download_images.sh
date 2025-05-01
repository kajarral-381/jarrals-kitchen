#!/bin/bash

# Create directories if they don't exist
mkdir -p src/assets/images/products
mkdir -p src/assets/images/social
mkdir -p src/assets/images/blog
mkdir -p src/assets/images/about

# Download product images
curl -o src/assets/images/products/chocolate-croissant.jpg https://images.unsplash.com/photo-1555507036-ab1f4038808a
curl -o src/assets/images/products/strawberry-cheesecake.jpg https://images.unsplash.com/photo-1565958011703-44f9829ba187
curl -o src/assets/images/products/sourdough-bread.jpg https://images.unsplash.com/photo-1586444248902-2f64eddc13df
curl -o src/assets/images/products/blueberry-muffin.jpg https://images.unsplash.com/photo-1607478900766-efe13248b125
curl -o src/assets/images/products/cinnamon-roll.jpg https://images.unsplash.com/photo-1609873539821-3b46e0f6f50a
curl -o src/assets/images/products/baguette.jpg https://images.unsplash.com/photo-1549931319-a545dcf3bc7b
curl -o src/assets/images/products/chocolate-cake.jpg https://images.unsplash.com/photo-1578985545062-69928b1d9587
curl -o src/assets/images/products/apple-pie.jpg https://images.unsplash.com/photo-1621743478914-cc8a68d76208
curl -o src/assets/images/products/chocolate-chip-cookie.jpg https://images.unsplash.com/photo-1499636136210-6f4ee915583e

# Download additional product images for detail views
curl -o src/assets/images/products/chocolate-croissant-2.jpg https://images.unsplash.com/photo-1623334044303-241021148842
curl -o src/assets/images/products/chocolate-croissant-3.jpg https://images.unsplash.com/photo-1608198093002-ad4e005484ec
curl -o src/assets/images/products/strawberry-cheesecake-2.jpg https://images.unsplash.com/photo-1533134242443-d4fd215305ad
curl -o src/assets/images/products/strawberry-cheesecake-3.jpg https://images.unsplash.com/photo-1611293388250-580b08c4a145
curl -o src/assets/images/products/sourdough-bread-2.jpg https://images.unsplash.com/photo-1585478259715-1c093a7b70d3
curl -o src/assets/images/products/sourdough-bread-3.jpg https://images.unsplash.com/photo-1549931319-311dec695a59

# Download social media images
curl -o src/assets/images/social/instagram-1.jpg https://images.unsplash.com/photo-1517433367423-c7e5b0f35086
curl -o src/assets/images/social/instagram-2.jpg https://images.unsplash.com/photo-1563729784474-d77dbb933a9e
curl -o src/assets/images/social/instagram-3.jpg https://images.unsplash.com/photo-1602351447937-745cb720612f
curl -o src/assets/images/social/instagram-4.jpg https://images.unsplash.com/photo-1517686469429-8bdb88b9f907
curl -o src/assets/images/social/instagram-5.jpg https://images.unsplash.com/photo-1606188074044-fcd750f6996a
curl -o src/assets/images/social/instagram-6.jpg https://images.unsplash.com/photo-1509440159596-0249088772ff

# Download blog images
curl -o src/assets/images/blog/alternative-flours.jpg https://images.unsplash.com/photo-1586444248902-2f64eddc13df
curl -o src/assets/images/blog/berry-desserts.jpg https://images.unsplash.com/photo-1488477181946-6428a0291777
curl -o src/assets/images/blog/sourdough-blog.jpg https://images.unsplash.com/photo-1509440159596-0249088772ff

# Download about page images
curl -o src/assets/images/about/about-image.jpg https://images.unsplash.com/photo-1556711905-b3f402e1f74d
curl -o src/assets/images/about/team-1.jpg https://images.unsplash.com/photo-1556911220-bda9f7f7597b
curl -o src/assets/images/about/team-2.jpg https://images.unsplash.com/photo-1604251405903-b8c702c6fc3d
curl -o src/assets/images/about/team-3.jpg https://images.unsplash.com/photo-1559523161-0fc0d8b38a77

# Download hero image
curl -o src/assets/images/hero-image.jpg https://images.unsplash.com/photo-1517433670267-08bbd4be890f

echo "All images downloaded successfully!"
