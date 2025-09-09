import z from "zod";
import { allowedMemberTypes, allowedSortByValues } from "../utils/crate.constants";

export const crateSearchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(allowedSortByValues).optional(),
  ascending: z.boolean().optional().default(false),
  page: z.coerce.number().optional().default(1),
  memberType: z.enum(allowedMemberTypes).optional().default("All"),
});
