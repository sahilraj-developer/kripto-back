// @ts-ignore
// @ts-nocheck
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// const sampleProducts = Array.from({ length: 50 }, (_, i) => ({
//   id: i + 1,
//   title: `Product ${i + 1}`,
//   price: (Math.random() * 200).toFixed(2),
//   category: ["electronics", "jewelery", "men's clothing", "women's clothing"][i % 4],
//   discount: Math.floor(Math.random() * 30),
//   dateAdded: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
//   rating: (Math.random() * 5).toFixed(1),
//   stock: Math.floor(Math.random() * 100),
//   image: "https://baccabucci.com/cdn/shop/products/15_45a10698-3148-4359-ab89-a8fdd3b0633e_800x.jpg?v=1640074238"
// }));

const ProductPage = () => {
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);



  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://kripto-backend.onrender.com/api/products/user/getproducts");
        const data = await res.json();
        // setProducts(data.products || []);
        // setFilteredProducts(data.products.slice(0, 10))



        let filtered:any = data.products.filter(
              (product:any) =>
                product.title.toLowerCase().includes(search.toLowerCase()) &&
                (category ? product.category === category : true)
            );
        
            if (sortOption === "name") {
              filtered.sort((a:any, b:any) => a.title.localeCompare(b.title));
            } else if (sortOption === "price") {
              filtered.sort((a:any, b:any) => a.price - b.price);
            } else if (sortOption === "newest") {
              filtered.sort((a:any, b:any) => new Date(b.dateAdded) - new Date(a.dateAdded));
            } else if (sortOption === "discount") {
              filtered.sort((a:any, b:any) => b.discount - a.discount);
            } else if (sortOption === "rating") {
              filtered.sort((a:any, b:any) => b.rating - a.rating);
            } else if (sortOption === "stock") {
              filtered.sort((a:any, b:any) => b.stock - a.stock);
            }
        
            setProducts(data.products)
            setFilteredProducts(filtered.slice(0, page * 10));

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [search, category, sortOption, page]);



  // useEffect(() => {
  //   let filtered:any = products.filter(
  //     (product) =>
  //       product.title.toLowerCase().includes(search.toLowerCase()) &&
  //       (category ? product.category === category : true)
  //   );

  //   if (sortOption === "name") {
  //     filtered.sort((a:any, b:any) => a.title.localeCompare(b.title));
  //   } else if (sortOption === "price") {
  //     filtered.sort((a:any, b:any) => a.price - b.price);
  //   } else if (sortOption === "newest") {
  //     filtered.sort((a:any, b:any) => new Date(b.dateAdded) - new Date(a.dateAdded));
  //   } else if (sortOption === "discount") {
  //     filtered.sort((a:any, b:any) => b.discount - a.discount);
  //   } else if (sortOption === "rating") {
  //     filtered.sort((a:any, b:any) => b.rating - a.rating);
  //   } else if (sortOption === "stock") {
  //     filtered.sort((a:any, b:any) => b.stock - a.stock);
  //   }

  //   setFilteredProducts(filtered.slice(0, page * 10));
  // }, [search, category, sortOption, page, products]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const addToCart = (product:any) => {
    setCart((prevCart):any => [...prevCart, product]);
  };


const buyNow = async (product: any) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.stripeProductId, // assuming product._id is available from MongoDB
      }),
    });

    const { sessionId } = await response.json();

    // Load Stripe.js dynamically if not already loaded
    const stripe:any = await (await import('@stripe/stripe-js')).loadStripe("pk_test_51NKcn8SEZ6anUjvWka5CwlY9Eb2QHFe9vpMmZwkE3JuRHRaKKyowJ9MRfQA8PUGUysM9Asyjv1i6crd3YJqnwVkf003pGhJVHr"); // Replace with your Stripe publishable key

    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error("Buy now error:", error);
    alert("An error occurred. Please try again.");
  }
};


  console.log(cart)

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <Input placeholder="Search Products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <select className="border p-2" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="newest">Newest</option>
          <option value="discount">Discount</option>
          <option value="rating">Rating</option>
          {/* <option value="stock">Stock</option> */}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product:any) => (
          <Card key={product.id} className="p-4 shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-4" />
            <CardTitle>{product.title}</CardTitle>
            <CardContent>
              <p className="text-gray-500">₹{product.price} ({product.discount}% off)</p>
              <p className="text-gray-500">Rating: {product.rating} ⭐</p>
              {/* <p className="text-gray-500">Stock: {product.stock}</p> */}
              {/* <Button className="mt-2 w-full" onClick={() => addToCart(product)}>Add to Cart</Button> */}
               <Button className="mt-2 w-full" onClick={() => buyNow(product)}>Buy Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredProducts?.length < products?.length && (
        <div className="text-center mt-6">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
