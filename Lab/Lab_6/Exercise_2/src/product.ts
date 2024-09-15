// src/product.ts
let products: Product[] = [];

class Product {
    id: number;
    title: string;
    price: number;
    description: string;

    constructor(id: number, title: string, price: number, description: string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    // Save the product to the products array
    save() {
        products.push(this);
    }

    // Update an existing product
    update() {
        const index = products.findIndex(prod => prod.id === this.id);
        if (index !== -1) {
            products[index] = this;
        }
    }

    // Get all products
    static fetchAll() {
        return products;
    }

    // Find a product by ID
    static findById(productId: number) {
        return products.find(prod => prod.id === productId);
    }

    // Delete a product by ID
    static deleteById(productId: number) {
        products = products.filter(prod => prod.id !== productId);
    }
}

export default Product;
