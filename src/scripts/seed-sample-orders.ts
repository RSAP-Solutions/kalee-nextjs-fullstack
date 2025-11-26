import "reflect-metadata";
import { randomUUID } from "crypto";
import { getCategoryRepository, getOrderRepository, getProductRepository } from "@/server/db/client";
import { OrderStatus } from "@/server/db/entities/Order";

async function seed() {
  const categoryRepo = await getCategoryRepository();
  const productRepo = await getProductRepository();
  const orderRepo = await getOrderRepository();

  const existingOrders = await orderRepo.count();
  if (existingOrders > 0) {
    console.log("Orders already exist; skipping seed.");
    return;
  }

  let category = await categoryRepo.findOne({ where: { slug: "sample-category" } });
  if (!category) {
    category = categoryRepo.create({
      name: "Sample Category",
      slug: "sample-category",
      description: "Auto-generated for admin dashboard seed.",
    });
    category = await categoryRepo.save(category);
  }

  const products = await productRepo.save([
    productRepo.create({
      title: "Solar Panel Starter Kit",
      slug: "solar-panel-starter-kit",
      price: 5499,
      description: "Complete starter kit for residential solar installation.",
      category,
      categorySlug: category.slug,
    }),
    productRepo.create({
      title: "Smart Thermostat Pro",
      slug: "smart-thermostat-pro",
      price: 249,
      description: "Energy-efficient smart thermostat with remote control.",
      category,
      categorySlug: category.slug,
    }),
  ]);

  const [solarKit, thermostat] = products;

  const orders = await orderRepo.save([
    orderRepo.create({
      status: OrderStatus.PAID,
      totalAmount: solarKit.price + 199,
      shippingCost: 199,
      shippingFullName: "Jordan Michaels",
      shippingEmail: "jordan@example.com",
      shippingPhone: "(555) 555-0199",
      shippingAddress: "742 Evergreen Terrace",
      shippingCity: "Springfield",
      shippingState: "IL",
      shippingPostalCode: "62704",
      shippingMethod: "Courier",
      stripePaymentIntentId: randomUUID(),
      orderItems: [
        {
          product: solarKit,
          productTitle: solarKit.title,
          unitPrice: solarKit.price,
          quantity: 1,
          totalPrice: solarKit.price,
        },
      ],
    }),
    orderRepo.create({
      status: OrderStatus.PENDING,
      totalAmount: thermostat.price * 2,
      shippingCost: 49,
      shippingFullName: "Aisha Khan",
      shippingEmail: "aisha@example.com",
      shippingPhone: "(555) 555-0112",
      shippingAddress: "88 Beacon Street",
      shippingCity: "Boston",
      shippingState: "MA",
      shippingPostalCode: "02108",
      shippingMethod: "Ground",
      stripePaymentIntentId: randomUUID(),
      notes: "Please confirm installation schedule.",
      orderItems: [
        {
          product: thermostat,
          productTitle: thermostat.title,
          unitPrice: thermostat.price,
          quantity: 2,
          totalPrice: thermostat.price * 2,
        },
      ],
    }),
    orderRepo.create({
      status: OrderStatus.FULFILLED,
      totalAmount: solarKit.price + thermostat.price,
      shippingCost: 149,
      shippingFullName: "Liam O'Connor",
      shippingEmail: "liam@example.com",
      shippingPhone: "(555) 555-0011",
      shippingAddress: "155 Market Street",
      shippingCity: "San Francisco",
      shippingState: "CA",
      shippingPostalCode: "94103",
      shippingMethod: "Express",
      stripePaymentIntentId: randomUUID(),
      orderItems: [
        {
          product: solarKit,
          productTitle: solarKit.title,
          unitPrice: solarKit.price,
          quantity: 1,
          totalPrice: solarKit.price,
        },
        {
          product: thermostat,
          productTitle: thermostat.title,
          unitPrice: thermostat.price,
          quantity: 1,
          totalPrice: thermostat.price,
        },
      ],
    }),
  ]);

  console.log(`Seeded ${orders.length} orders, ${products.length} products, and category '${category.name}'.`);
}

seed().then(() => {
  console.log("Seed complete.");
  process.exit(0);
});
