import { adminFetch, getApiBaseUrl, AdminApiError } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

export type DashboardStats = {
  total_users: number;
  active_subscriptions: number;
  expired_users: number;
  total_revenue: number;
  total_bookings: number;
  total_quotations: number;
  open_support_messages: number;
};

export type MenuCategoryRow = {
  id: string;
  name: string;
  name_i18n: Record<string, string>;
  slug: string;
  sort_order: number;
  is_active: boolean;
  menu_items_count: number;
};

export type LocalizedNameInput = {
  en: string;
  hi: string;
  gu: string;
};

export const fetchDashboardStats = () =>
  adminFetch<DashboardStats>("/admin/v1/dashboard");

export type AdminUserRow = {
  id: string;
  business_id: string | null;
  business_name: string;
  owner_name: string;
  phone: string;
  email: string;
  plan_type: string;
  expiry_date: string | null;
  status: "active" | "suspended";
  subscription_status: string | null;
  subscription_plan: string | null;
  created_at: string;
};

export type AdminUserDetail = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    is_verified: boolean;
    status: "active" | "suspended";
    created_at: string;
    last_login_at: string | null;
  };
  business: {
    id: string;
    business_name: string | null;
    business_owner_name: string | null;
    contact_number: string | null;
    business_email: string;
    business_address: string | null;
    gst_number: string | null;
    years_of_experience: number | null;
    subscription: {
      status: string;
      plan: string;
      start: string | null;
      end: string | null;
    };
    razorpay_customer_id?: string;
  } | null;
  plan_type: string;
  subscriptions: Array<{
    id: string;
    plan_code: string | null;
    status: string;
    period_start: string | null;
    period_end: string | null;
    razorpay_subscription_id: string;
    created_at: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    razorpay_payment_id: string | null;
    created_at: string;
  }>;
};

export const fetchAdminUsers = (filters: {
  q?: string;
  plan?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.plan && filters.plan !== "all") params.set("plan", filters.plan);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    users: AdminUserRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/users${qs ? `?${qs}` : ""}`);
};

export const fetchAdminUser = (id: string) =>
  adminFetch<AdminUserDetail>(`/admin/v1/users/${id}`);

export const setUserSuspended = (id: string, suspend: boolean) =>
  adminFetch<{ id: string; status: string }>(`/admin/v1/users/${id}/suspend`, {
    method: "PATCH",
    body: JSON.stringify({ suspend }),
  });

export const updateUserSubscription = (
  id: string,
  body: { plan?: string; months?: number; end_date?: string; status?: string },
) =>
  adminFetch(`/admin/v1/users/${id}/subscription`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const recordOfflinePayment = (
  id: string,
  body: { amount: number; method?: string; transaction_id?: string; notes?: string },
) =>
  adminFetch(`/admin/v1/users/${id}/offline-payment`, {
    method: "POST",
    body: JSON.stringify(body),
  });

export type SubscriptionRow = {
  id: string;
  business_id: string;
  business_name: string;
  owner_name: string;
  owner_user_id: string | null;
  owner_email: string | null;
  plan_code: string | null;
  status: string;
  period_start: string | null;
  period_end: string | null;
  razorpay_subscription_id: string;
  razorpay_plan_id: string;
  cancel_at_period_end: boolean;
  created_at: string;
  business_status: string | null;
};

export const fetchSubscriptions = (filters: {
  q?: string;
  plan?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.plan && filters.plan !== "all") params.set("plan", filters.plan);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    subscriptions: SubscriptionRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/subscriptions${qs ? `?${qs}` : ""}`);
};

export const updateBillingSubscription = (
  id: string,
  body: {
    status?: string;
    plan_code?: string;
    months?: number;
    period_end?: string;
    cancel_at_period_end?: boolean;
  },
) =>
  adminFetch<SubscriptionRow>(`/admin/v1/subscriptions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export type PaymentRow = {
  id: string;
  business_id: string;
  business_name: string;
  amount: number;
  method: string;
  transaction_id: string | null;
  razorpay_invoice_id: string | null;
  status: string;
  notes: string | null;
  subscription_id: string | null;
  created_at: string;
};

export const fetchPayments = (filters: {
  q?: string;
  status?: string;
  method?: string;
  from_date?: string;
  to_date?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.method && filters.method !== "all") params.set("method", filters.method);
  if (filters.from_date) params.set("from_date", filters.from_date);
  if (filters.to_date) params.set("to_date", filters.to_date);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    payments: PaymentRow[];
    revenue_this_month: number;
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/payments${qs ? `?${qs}` : ""}`);
};

export const updatePaymentStatus = (id: string, status: string) =>
  adminFetch<PaymentRow>(`/admin/v1/payments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export type AccessCodeRow = {
  id: string;
  code: string;
  plan_type: string;
  status: string;
  assigned_user_id: string | null;
  assigned_user_name: string | null;
  assigned_business_name: string | null;
  used_at: string | null;
  created_at: string;
  updated_at: string;
};

export const fetchAccessCodes = (filters: {
  q?: string;
  status?: string;
  plan?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.plan && filters.plan !== "all") params.set("plan", filters.plan);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    access_codes: AccessCodeRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/access-codes${qs ? `?${qs}` : ""}`);
};

export const createAccessCodes = (body: { plan_type: string; count?: number }) =>
  adminFetch<{ access_codes: AccessCodeRow[] }>("/admin/v1/access-codes", {
    method: "POST",
    body: JSON.stringify({
      plan_type: body.plan_type,
      count: body.count ?? 1,
    }),
  }).then((d) => d.access_codes);

export const updateAccessCodeStatus = (id: string, status: string) =>
  adminFetch<AccessCodeRow>(`/admin/v1/access-codes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export type BookingListRow = {
  id: string;
  booking_code: string | null;
  business_id: string;
  business_name: string;
  customer_name: string;
  customer_phone: string | null;
  event_at: string | null;
  event_location: string | null;
  function_type: string | null;
  guest_count: number | null;
  status: string;
  payment_status: string;
  total_due: number;
  amount_paid: number;
  created_at: string;
  completed_at: string | null;
};

export const fetchAdminBookings = (filters: {
  q?: string;
  status?: string;
  business_id?: string;
  event_date?: string;
  from_date?: string;
  to_date?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.business_id) params.set("business_id", filters.business_id);
  if (filters.event_date) params.set("event_date", filters.event_date);
  if (filters.from_date) params.set("from_date", filters.from_date);
  if (filters.to_date) params.set("to_date", filters.to_date);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    bookings: BookingListRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/bookings${qs ? `?${qs}` : ""}`);
};

export const fetchAdminBooking = (id: string) =>
  adminFetch<{ booking: Record<string, unknown> }>(`/admin/v1/bookings/${id}`).then(
    (d) => d.booking,
  );

export type QuotationListRow = {
  id: string;
  business_id: string;
  business_name: string;
  client_name: string;
  client_phone: string | null;
  function_type: string | null;
  event_date: string | null;
  guest_count: number;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
};

export const fetchAdminQuotations = (filters: {
  q?: string;
  status?: string;
  business_id?: string;
  event_date?: string;
  from_date?: string;
  to_date?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.business_id) params.set("business_id", filters.business_id);
  if (filters.event_date) params.set("event_date", filters.event_date);
  if (filters.from_date) params.set("from_date", filters.from_date);
  if (filters.to_date) params.set("to_date", filters.to_date);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    quotations: QuotationListRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/quotations${qs ? `?${qs}` : ""}`);
};

export const fetchAdminQuotation = (id: string) =>
  adminFetch<{ quotation: Record<string, unknown> }>(`/admin/v1/quotations/${id}`).then(
    (d) => d.quotation,
  );

export type NotificationLogRow = {
  id: string;
  title: string;
  message: string;
  sent_to: string;
  sent_count: number;
  tokens_count: number;
  created_by_user_id: string | null;
  created_by_name: string | null;
  created_at: string;
};

export const fetchAdminNotifications = (filters?: { page?: number; limit?: number }) => {
  const params = new URLSearchParams();
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    notifications: NotificationLogRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/notifications${qs ? `?${qs}` : ""}`);
};

export const sendAdminNotification = (body: { title: string; message: string }) =>
  adminFetch<{
    notification: NotificationLogRow;
    delivery_note?: string;
  }>("/admin/v1/notifications", {
    method: "POST",
    body: JSON.stringify(body),
  });

export type SupportMessageRow = {
  id: string;
  email: string;
  customer_name: string;
  phone: string | null;
  description: string;
  status: string;
  user_id: string | null;
  user_name: string | null;
  business_id: string | null;
  business_name: string | null;
  created_at: string;
  updated_at: string;
};

export const fetchAdminSupportMessages = (filters?: {
  q?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters?.q) params.set("q", filters.q);
  if (filters?.status && filters.status !== "all") params.set("status", filters.status);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    support_messages: SupportMessageRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/support${qs ? `?${qs}` : ""}`);
};

export const updateSupportMessageStatus = (id: string, status: "open" | "resolved") =>
  adminFetch<{ support_message: SupportMessageRow }>(`/admin/v1/support/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }).then((d) => d.support_message);

export type AppVersionPlatformConfig = {
  platform: string;
  latest_version: string;
  minimum_version: string;
  update_message: string;
  updated_at: string;
};

export type AppVersionConfigResponse = {
  ios: AppVersionPlatformConfig;
  android: AppVersionPlatformConfig;
};

export const fetchAppVersionConfig = () =>
  adminFetch<AppVersionConfigResponse>("/admin/v1/app-version");

export const updateAppVersionConfig = (body: {
  ios?: {
    latest_version: string;
    minimum_version: string;
    update_message: string;
  };
  android?: {
    latest_version: string;
    minimum_version: string;
    update_message: string;
  };
}) =>
  adminFetch<AppVersionConfigResponse>("/admin/v1/app-version", {
    method: "PUT",
    body: JSON.stringify(body),
  });

export type AppSettingsRow = {
  app_name: string;
  support_email: string;
  payment_upi: string;
  payment_bank: string;
  updated_at: string;
};

export const fetchAdminSettings = () =>
  adminFetch<{ settings: AppSettingsRow }>("/admin/v1/settings").then((d) => d.settings);

export const updateAdminSettings = (body: {
  app_name?: string;
  support_email?: string;
  payment_upi?: string;
  payment_bank?: string;
}) =>
  adminFetch<{ settings: AppSettingsRow }>("/admin/v1/settings", {
    method: "PUT",
    body: JSON.stringify(body),
  }).then((d) => d.settings);

export type AdminLogRow = {
  id: string;
  type: string;
  message: string;
  created_at: string;
  meta: Record<string, unknown> | null;
};

export const fetchAdminLogs = (filters?: {
  type?: string;
  q?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters?.type && filters.type !== "all") params.set("type", filters.type);
  if (filters?.q) params.set("q", filters.q);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));
  const qs = params.toString();
  return adminFetch<{
    logs: AdminLogRow[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }>(`/admin/v1/logs${qs ? `?${qs}` : ""}`);
};

export const fetchMenuCategories = (status: "all" | "active" | "inactive" = "all") =>
  adminFetch<{ categories: MenuCategoryRow[] }>(
    `/admin/v1/menu-categories?status=${status}`,
  ).then((d) => d.categories);

export const createMenuCategory = (body: {
  name: LocalizedNameInput;
  slug?: string;
  sort_order?: number;
  is_active?: boolean;
}) =>
  adminFetch<MenuCategoryRow>("/admin/v1/menu-categories", {
    method: "POST",
    body: JSON.stringify({
      name: body.name,
      slug: body.slug,
      sort_order: body.sort_order,
      is_active: body.is_active,
    }),
  });

export const updateMenuCategory = (
  id: string,
  body: {
    name?: LocalizedNameInput;
    slug?: string;
    sort_order?: number;
    is_active?: boolean;
  },
) =>
  adminFetch<MenuCategoryRow>(`/admin/v1/menu-categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteMenuCategory = (id: string) =>
  adminFetch<null>(`/admin/v1/menu-categories/${id}`, { method: "DELETE" });

export type SupplyCategoryRow = {
  id: string;
  name: string;
  name_i18n: Record<string, string>;
  slug: string;
  sort_order: number;
  is_active: boolean;
  supply_items_count: number;
};

export const fetchSupplyCategories = (status: "all" | "active" | "inactive" = "all") =>
  adminFetch<{ categories: SupplyCategoryRow[] }>(
    `/admin/v1/supply-categories?status=${status}`,
  ).then((d) => d.categories);

export const createSupplyCategory = (body: {
  name: LocalizedNameInput;
  slug?: string;
  sort_order?: number;
  is_active?: boolean;
}) =>
  adminFetch<SupplyCategoryRow>("/admin/v1/supply-categories", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateSupplyCategory = (
  id: string,
  body: {
    name?: LocalizedNameInput;
    slug?: string;
    sort_order?: number;
    is_active?: boolean;
  },
) =>
  adminFetch<SupplyCategoryRow>(`/admin/v1/supply-categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteSupplyCategory = (id: string) =>
  adminFetch<{ id: string }>(`/admin/v1/supply-categories/${id}`, { method: "DELETE" });

export type UnitRow = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

/** @deprecated use UnitRow */
export type UnitOption = Pick<UnitRow, "id" | "name" | "slug">;

export const fetchUnits = (q?: string) => {
  const params = q ? `?q=${encodeURIComponent(q)}` : "";
  return adminFetch<{ units: UnitRow[] }>(`/admin/v1/units${params}`).then((d) => d.units);
};

export const createUnit = (body: { name: string; slug?: string }) =>
  adminFetch<UnitRow>("/admin/v1/units", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateUnit = (id: string, body: { name?: string; slug?: string }) =>
  adminFetch<UnitRow>(`/admin/v1/units/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteUnit = (id: string) =>
  adminFetch<{ id: string }>(`/admin/v1/units/${id}`, { method: "DELETE" });

export type ServiceTypeRow = {
  id: number;
  name: string;
  name_i18n: Record<string, string>;
  slug: string;
  icon: string | null;
  status: number;
  is_active: boolean;
  businesses_count: number;
};

export const fetchServiceTypes = (status: "all" | "active" | "inactive" = "all") =>
  adminFetch<{ service_types: ServiceTypeRow[] }>(
    `/admin/v1/service-types?status=${status}`,
  ).then((d) => d.service_types);

export const createServiceType = (body: {
  name: LocalizedNameInput;
  slug?: string;
  icon?: string | null;
  is_active?: boolean;
}) =>
  adminFetch<ServiceTypeRow>("/admin/v1/service-types", {
    method: "POST",
    body: JSON.stringify({
      name: body.name,
      slug: body.slug,
      icon: body.icon,
      is_active: body.is_active,
    }),
  });

export const updateServiceType = (
  id: number,
  body: {
    name?: LocalizedNameInput;
    slug?: string;
    icon?: string | null;
    is_active?: boolean;
  },
) =>
  adminFetch<ServiceTypeRow>(`/admin/v1/service-types/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteServiceType = (id: number) =>
  adminFetch<{ id: number }>(`/admin/v1/service-types/${id}`, { method: "DELETE" });

export type ExtraServiceRow = {
  id: string;
  title: string;
  description: string | null;
  pricing_type: "FIXED" | "PER_UNIT" | "PER_GUEST";
  price: number;
  is_optional: boolean;
  is_active: boolean;
  business_id: string | null;
  business_name: string | null;
  is_global: boolean;
  created_at: string;
  updated_at: string;
};

export const fetchExtraServices = (filters: {
  scope?: "all" | "global" | "business";
  business_id?: string;
  pricing_type?: string;
  status?: "all" | "active" | "inactive";
  q?: string;
}) => {
  const params = new URLSearchParams();
  if (filters.scope && filters.scope !== "all") params.set("scope", filters.scope);
  if (filters.business_id) params.set("business_id", filters.business_id);
  if (filters.pricing_type) params.set("pricing_type", filters.pricing_type);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.q) params.set("q", filters.q);
  const qs = params.toString();
  return adminFetch<{ items: ExtraServiceRow[] }>(
    `/admin/v1/extra-services${qs ? `?${qs}` : ""}`,
  ).then((d) => d.items);
};

export const createExtraService = (body: {
  scope: "global" | "business";
  business_id?: string;
  title: string;
  description?: string;
  pricing_type: "FIXED" | "PER_UNIT" | "PER_GUEST";
  price: number;
  is_optional?: boolean;
  is_active?: boolean;
}) =>
  adminFetch<ExtraServiceRow>("/admin/v1/extra-services", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateExtraService = (
  id: string,
  body: Partial<{
    scope: "global" | "business";
    business_id: string | null;
    title: string;
    description: string | null;
    pricing_type: "FIXED" | "PER_UNIT" | "PER_GUEST";
    price: number;
    is_optional: boolean;
    is_active: boolean;
  }>,
) =>
  adminFetch<ExtraServiceRow>(`/admin/v1/extra-services/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteExtraService = (id: string) =>
  adminFetch<{ id: string }>(`/admin/v1/extra-services/${id}`, { method: "DELETE" });

export type SupplyItemRow = {
  id: string;
  name: string;
  name_i18n: Record<string, string>;
  type: "INGREDIENT" | "UTENSIL";
  category_slug: string;
  category_name: string;
  business_id: string | null;
  business_name: string | null;
  is_global: boolean;
  unit_options: string[];
  default_unit: string;
  available_count: number | null;
  damaged_count: number;
  photo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const fetchSupplyItems = (filters: {
  scope?: "all" | "global" | "business";
  business_id?: string;
  category_slug?: string;
  type?: string;
  status?: "all" | "active" | "inactive";
  q?: string;
}) => {
  const params = new URLSearchParams();
  if (filters.scope && filters.scope !== "all") params.set("scope", filters.scope);
  if (filters.business_id) params.set("business_id", filters.business_id);
  if (filters.category_slug) params.set("category_slug", filters.category_slug);
  if (filters.type) params.set("type", filters.type);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.q) params.set("q", filters.q);
  const qs = params.toString();
  return adminFetch<{ items: SupplyItemRow[] }>(
    `/admin/v1/supply-items${qs ? `?${qs}` : ""}`,
  ).then((d) => d.items);
};

export const createSupplyItem = (body: {
  scope: "global" | "business";
  business_id?: string;
  name: LocalizedNameInput;
  type: "INGREDIENT" | "UTENSIL";
  category_slug: string;
  unit_options: string[];
  default_unit: string;
  available_count?: number | null;
  damaged_count?: number;
  photo_url?: string;
  is_active?: boolean;
}) =>
  adminFetch<SupplyItemRow>("/admin/v1/supply-items", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateSupplyItem = (
  id: string,
  body: Partial<{
    scope: "global" | "business";
    business_id: string | null;
    name: LocalizedNameInput;
    type: "INGREDIENT" | "UTENSIL";
    category_slug: string;
    unit_options: string[];
    default_unit: string;
    available_count: number | null;
    damaged_count: number;
    photo_url: string | null;
    is_active: boolean;
  }>,
) =>
  adminFetch<SupplyItemRow>(`/admin/v1/supply-items/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteSupplyItem = (id: string) =>
  adminFetch<{ id: string }>(`/admin/v1/supply-items/${id}`, { method: "DELETE" });

export type BusinessOption = {
  id: string;
  name: string;
  ownerName?: string | null;
};

export type MenuItemIngredient = {
  name: string;
  qty?: string;
  unit?: string;
};

export type MenuItemRow = {
  id: string;
  name: string;
  name_i18n: Record<string, string>;
  description: string | null;
  how_to_make: string | null;
  price_per_person: number;
  category_slug: string;
  category_name: string;
  food_type: "veg" | "non_veg";
  business_id: string | null;
  business_name: string | null;
  is_global: boolean;
  ingredients: MenuItemIngredient[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export const fetchBusinesses = (q?: string) => {
  const params = q ? `?q=${encodeURIComponent(q)}` : "";
  return adminFetch<{ businesses: BusinessOption[] }>(`/admin/v1/businesses${params}`).then(
    (d) => d.businesses,
  );
};

export const fetchMenuItems = (filters: {
  scope?: "all" | "global" | "business";
  business_id?: string;
  category_slug?: string;
  food_type?: string;
  q?: string;
}) => {
  const params = new URLSearchParams();
  if (filters.scope && filters.scope !== "all") params.set("scope", filters.scope);
  if (filters.business_id) params.set("business_id", filters.business_id);
  if (filters.category_slug) params.set("category_slug", filters.category_slug);
  if (filters.food_type) params.set("food_type", filters.food_type);
  if (filters.q) params.set("q", filters.q);
  const qs = params.toString();
  return adminFetch<{ items: MenuItemRow[] }>(
    `/admin/v1/menu-items${qs ? `?${qs}` : ""}`,
  ).then((d) => d.items);
};

export const createMenuItem = (body: {
  scope: "global" | "business";
  business_id?: string;
  name: LocalizedNameInput;
  price_per_person: number;
  category_slug: string;
  food_type: "veg" | "non_veg";
  ingredients?: MenuItemIngredient[];
  image_url?: string;
  description?: string;
  how_to_make?: string;
}) =>
  adminFetch<MenuItemRow>("/admin/v1/menu-items", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateMenuItem = (
  id: string,
  body: Partial<{
    scope: "global" | "business";
    business_id: string | null;
    name: LocalizedNameInput;
    price_per_person: number;
    category_slug: string;
    food_type: "veg" | "non_veg";
    ingredients: MenuItemIngredient[];
    image_url: string | null;
    description: string | null;
    how_to_make: string | null;
  }>,
) =>
  adminFetch<MenuItemRow>(`/admin/v1/menu-items/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteMenuItem = (id: string) =>
  adminFetch<{ id: string }>(`/admin/v1/menu-items/${id}`, { method: "DELETE" });

export type BulkImportField = {
  key: string;
  label: string;
  required: boolean;
};

export type BulkImportSchema = {
  type: string;
  label: string;
  fields: BulkImportField[];
};

export type BulkImportResult = {
  type: string;
  imported: number;
  skipped: number;
  failed: number;
  total_rows: number;
  errors: { row: number; message: string }[];
};

export const fetchBulkImportSchemas = () =>
  adminFetch<{ types: BulkImportSchema[] }>("/admin/v1/bulk-import/schemas").then(
    (d) => d.types,
  );

export const runBulkImport = (body: {
  type: string;
  rows: Record<string, string>[];
  mapping: Record<string, string>;
  options?: { skip_duplicates?: boolean };
}) =>
  adminFetch<BulkImportResult>("/admin/v1/bulk-import", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const downloadBulkImportTemplate = async (type: string) => {
  const token = getAdminToken();
  const res = await fetch(`${getApiBaseUrl()}/admin/v1/bulk-import/templates/${type}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new AdminApiError("Failed to download template", res.status);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${type}-template.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
