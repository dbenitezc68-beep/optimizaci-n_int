import { prisma } from "@/lib/prisma";

function monthlyFactor(interval: string) {
  switch (interval) {
    case "year":
      return 1 / 12;
    case "week":
      return 52 / 12;
    case "day":
      return 30;
    default:
      return 1;
  }
}

export async function getMRRCents() {
  const subscriptions = await prisma.subscription.findMany({
    where: { status: { in: ["ACTIVE", "TRIALING"] } },
    select: { amountCents: true, interval: true },
  });

  return Math.round(
    subscriptions.reduce(
      (sum, sub) => sum + sub.amountCents * monthlyFactor(sub.interval),
      0
    )
  );
}

export async function getMonthlyRevenue(monthsBack = 6) {
  const now = new Date();
  const results: { label: string; cents: number }[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    const payments = await prisma.payment.aggregate({
      where: { status: "PAID", paidAt: { gte: start, lt: end } },
      _sum: { amountCents: true },
    });

    results.push({
      label: start.toLocaleDateString("es-ES", {
        month: "short",
        year: "2-digit",
      }),
      cents: payments._sum.amountCents ?? 0,
    });
  }

  return results;
}

export async function getDashboardOverview() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    mrrCents,
    revenueThisMonth,
    activeClients,
    pendingTasks,
    openLeads,
    recentPayments,
    monthlyRevenue,
    leadsByStage,
    projectsByStatus,
  ] = await Promise.all([
    getMRRCents(),
    prisma.payment.aggregate({
      where: { status: "PAID", paidAt: { gte: monthStart } },
      _sum: { amountCents: true },
    }),
    prisma.client.count(),
    prisma.task.count({ where: { status: { not: "DONE" } } }),
    prisma.lead.count({ where: { stage: { notIn: ["WON", "LOST"] } } }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { client: { select: { name: true } } },
    }),
    getMonthlyRevenue(6),
    prisma.lead.groupBy({ by: ["stage"], _count: { _all: true } }),
    prisma.project.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  return {
    mrrCents,
    revenueThisMonthCents: revenueThisMonth._sum.amountCents ?? 0,
    activeClients,
    pendingTasks,
    openLeads,
    recentPayments,
    monthlyRevenue,
    leadsByStage,
    projectsByStatus,
  };
}
