#!/bin/bash

# Create placeholder images for any missing files
for dir in src/assets/images/products src/assets/images/social src/assets/images/blog src/assets/images/about; do
  # Check if directory exists
  if [ -d "$dir" ]; then
    # Create a placeholder image in the directory if it's empty
    if [ -z "$(ls -A $dir)" ]; then
      echo "Creating placeholder in $dir"
      convert -size 800x600 canvas:wheat -pointsize 40 -fill chocolate -gravity center -annotate 0 "Sweet Delights Bakery\nPlaceholder Image" "$dir/placeholder.jpg"
    fi
  fi
done

# Create specific placeholders for important images
for img in src/assets/images/products/chocolate-croissant.jpg \
           src/assets/images/products/strawberry-cheesecake.jpg \
           src/assets/images/products/sourdough-bread.jpg \
           src/assets/images/products/blueberry-muffin.jpg \
           src/assets/images/products/cinnamon-roll.jpg \
           src/assets/images/products/baguette.jpg \
           src/assets/images/products/chocolate-cake.jpg \
           src/assets/images/products/apple-pie.jpg \
           src/assets/images/products/chocolate-chip-cookie.jpg \
           src/assets/images/social/instagram-1.jpg \
           src/assets/images/social/instagram-2.jpg \
           src/assets/images/social/instagram-3.jpg \
           src/assets/images/social/instagram-4.jpg \
           src/assets/images/social/instagram-5.jpg \
           src/assets/images/social/instagram-6.jpg \
           src/assets/images/hero-image.jpg; do
  # Check if file exists and is not empty
  if [ ! -s "$img" ]; then
    echo "Creating placeholder for $img"
    dir=$(dirname "$img")
    filename=$(basename "$img")
    name="${filename%.*}"
    
    # Create directory if it doesn't exist
    mkdir -p "$dir"
    
    # Create a placeholder image with the name
    convert -size 800x600 canvas:wheat -pointsize 40 -fill chocolate -gravity center -annotate 0 "Sweet Delights Bakery\n$name" "$img"
  fi
done

echo "All placeholder images created successfully!"
