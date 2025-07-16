// models/Product.js

export class Product {
  constructor(id, name, description, price, imageUrl, unitsOnSale, discount = 0, unitsOnDiscount = 0, numberOfSold = 0, comments = [], isAvailable = true) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.unitsOnSale = unitsOnSale;
    this.discount = discount;
    this.unitsOnDiscount = unitsOnDiscount;
    this.numberOfSold = numberOfSold;
    this.comments = comments;
    this.isAvailable = isAvailable;
  }
}

export function buyProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || product.unitsOnSale <= 0) {
    throw new Error('Product not available');
  }

  product.unitsOnSale--;
  product.numberOfSold++;

  // Disable product if no more units are available
  if (product.unitsOnSale <= 0) {
    product.isAvailable = false;
  }
}


export const products = [
  new Product(1, 'Tracker X100', 'Reliable GPS tracker with waterproof case.', 59.99, '/images/tracker-x100.png', 25, 10, 5, 120, ['Works great!', 'Battery lasted longer than expected.']),
  new Product(2, 'Tracker Mini', 'Compact GPS tracker ideal for pets or children.', 39.99, '/images/tracker-mini.png', 15, 0, 0, 80, [])
];
