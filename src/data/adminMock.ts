export const dashboardStats = {
  totalUsers: 164,
  activeSubscriptions: 139,
  expiredUsers: 19,
  totalRevenue: 824500,
  totalBookings: 312,
  totalQuotations: 487,
};

export const users = [
  {
    id: "u1",
    businessName: "Royal Caterers",
    ownerName: "Ravi Shah",
    phone: "9876543210",
    email: "royal@example.com",
    planType: "12M",
    expiryDate: "2027-02-12",
    status: "Active",
  },
  {
    id: "u2",
    businessName: "Spice Events",
    ownerName: "Meera Patel",
    phone: "9988776655",
    email: "spice@example.com",
    planType: "1M",
    expiryDate: "2026-03-01",
    status: "Expired",
  },
];

export const accessCodes = [
  { code: "483920", planType: "1M", status: "unused", assignedUser: "-", createdAt: "2026-03-20" },
  { code: "913574", planType: "6M", status: "used", assignedUser: "Royal Caterers", createdAt: "2026-03-05" },
];
