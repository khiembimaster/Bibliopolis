import { createOrder } from "@/app/action";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products, userId, cartId, shippingAddress, totalBill } = await request.json();
  const data = products;
  console.log(data)
  console.log("111", totalBill)
  const newOrder = await createOrder(userId, cartId, shippingAddress, totalBill, data); 
  let activeProducts = await getActiveProducts();

  try {
    for (const product of data) {
        const stripeProduct = activeProducts?.find(
            (stripeProduct: any) =>
                stripeProduct?.name?.toLowerCase() == product.book.name.toLowerCase()
        );
        
    
        if (stripeProduct == undefined) {
            const prod = await stripe.products.create({
                name: product.book.name,
                default_price_data: {
                    unit_amount: product.book.price * 100,
                    currency: "usd",
                },
            });
        }
    }
  } catch (error) {
    console.error("Error in creating a new product", error);
    throw error;
  }

  activeProducts = await getActiveProducts();
  let stripeItems: any = [];
  console.log("2222 ", activeProducts)
  for (const product of data) {
    const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
            stripeProduct?.name?.toLowerCase() == product.book.name.toLowerCase()
    );
    
   
    if (stripeProduct) {
        stripeItems.push({
            price: stripeProduct?.default_price,
            quantity: product.book.quantity,
        });
    }
}

  console.log("2222 ", stripeItems)
  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems, // This is where stripeItems should be assigned
    mode: "payment",
    success_url: `http://localhost:3000/order/${newOrder.id}`,
    cancel_url: "http://localhost:3000/cancel",
});

  return NextResponse.json({ url: session.url });
};