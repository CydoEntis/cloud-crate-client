import { z } from "zod";
import { adminUserSortByValues, planValues, userStatusValues, userTypeValues } from "./utils/adminUserConstants";

export const adminUserSearchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(adminUserSortByValues).optional(),
  ascending: z.boolean().optional(),
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).optional(),
  userType: z.enum(userTypeValues).optional(),
  userStatus: z.enum(userStatusValues).optional(),
  planFilter: z.enum(planValues).optional(),
});

export const createInviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  displayName: z.string().min(1, "Display name is required"),
  isAdmin: z.boolean().default(false),
});
