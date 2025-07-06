const product1: {
  title: string;
  price: number;
} = { title: "Amr buker Jala", price: 2000 };

const product2: {
  title: string;
  price: number;
} = { title: "Amr Moner Jala", price: 2001 };

const products: {
  title: string;
  price?: number;
}[] = [product1, product2];

console.log(products);
