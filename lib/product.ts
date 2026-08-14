export const product = {
  name: "Handmade Potli", regularPrice: 1199, giftPrice: 1800,
  images: ["/products/potli-1.png", "/products/potli-2.png", "/products/potli-3.png", "/products/potli-4.png", "/products/potli-5.png"],
  benefits: ["Made from rescued fabric scraps", "Lovingly handmade, one by one", "No two potlis are ever alike", "A thoughtful, low-waste gift"],
};
export const money = (value: number) => `NPR ${value.toLocaleString("en-NP")}`;
