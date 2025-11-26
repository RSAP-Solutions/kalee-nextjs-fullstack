import type { NextApiRequest, NextApiResponse } from "next";
import { In } from "typeorm";
import { requireAdminApi } from "@/server/auth/adminSession";
import {
  getCategoryRepository,
  getOrderRepository,
  getProductRepository,
} from "@/server/db/client";
import { OrderStatus } from "@/server/db/entities/Order";

export type DashboardApiResponse = {
  totals: {
    products: number;
    categories: number;
    orders: number;
    revenue: number;
  };
  activeOrders: Array<{
    id: string;
    customerName: string;
    status: OrderStatus;
    totalAmount: number;
    updatedAt: string;
    headlineItem: string;
  }>;
  recentTransactions: Array<{
    id: string;
    customerName: string;
    totalAmount: number;
    date: string;
    method: string | null;
  }>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const session = requireAdminApi(req, res);
  if (!session) {
    return;
  }

  try {
    const [productRepo, categoryRepo, orderRepo] = await Promise.all([
      getProductRepository(),
      getCategoryRepository(),
      getOrderRepository(),
    ]);

    const [totalProducts, totalCategories, totalOrders, revenueRow, activeOrders, recentTransactions] = await Promise.all([
      productRepo.count(),
      categoryRepo.count(),
      orderRepo.count(),
      orderRepo
        .createQueryBuilder("order")
        .select("COALESCE(SUM(order.totalAmount), 0)", "sum")
        .where("order.status != :cancelled", { cancelled: OrderStatus.CANCELLED })
        .getRawOne<{ sum?: string }>(),
      orderRepo.find({
        where: {
          status: In([OrderStatus.PENDING, OrderStatus.PAID]),
        },
        relations: { orderItems: true },
        order: { updatedAt: "DESC" },
        take: 5,
      }),
      orderRepo.find({
        where: {
          status: In([OrderStatus.PAID, OrderStatus.FULFILLED]),
        },
        relations: { orderItems: true },
        order: { createdAt: "DESC" },
        take: 5,
      }),
    ]);

    const totals = {
      products: totalProducts,
      categories: totalCategories,
      orders: totalOrders,
      revenue: Number(revenueRow?.sum ?? 0),
    };

    const activeOrdersData = activeOrders.map((order) => ({
      id: order.id,
      customerName: order.shippingFullName,
      status: order.status,
      totalAmount: Number(order.totalAmount ?? 0),
      updatedAt: order.updatedAt?.toISOString?.() ?? new Date().toISOString(),
      headlineItem: order.orderItems?.[0]?.productTitle ?? "Pending assignment",
    }));

    const recentTransactionsData = recentTransactions.map((order) => ({
      id: order.id,
      customerName: order.shippingFullName,
      totalAmount: Number(order.totalAmount ?? 0),
      date: order.createdAt?.toISOString?.() ?? new Date().toISOString(),
      method: order.shippingMethod ?? null,
    }));

    const payload: DashboardApiResponse = {
      totals,
      activeOrders: activeOrdersData,
      recentTransactions: recentTransactionsData,
    };

    res.status(200).json(payload);
  } catch (error) {
    console.error("[admin.dashboard]", error);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
}
