import { z } from "zod";

export const allowedSortByValues = ["Name", "JoinedAt", "UsedStorage"] as const;
export const allowedMemberTypes = ["All", "Owner", "Joined"] as const;

const crateNameField = z
  .string()
  .min(3, { message: "Crate name must be at least 3 characters long." })
  .max(100, { message: "Crate name must be at most 100 characters long." })
  .regex(/^[a-zA-Z0-9 _-]*$/, { message: "Crate name contains invalid characters." });

const colorField = z
  .string()
  .min(1, { message: "Color is required." })
  .regex(/^#([0-9A-Fa-f]{6})$/, { message: "Color is invalid." });

export const crateSearchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(allowedSortByValues).optional().default("Name"),
  ascending: z.boolean().optional().default(false),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(10),
  memberType: z.enum(allowedMemberTypes).optional().default("All"),
  edit: z.string().optional(),
});

export const createCreateCrateSchema = (storage: { usedStorageBytes: number; accountStorageLimitBytes: number }) => {
  const BytesPerGb = 1024 * 1024 * 1024;
  const usedGb = Math.ceil(storage.usedStorageBytes / BytesPerGb);
  const maxGb = Math.floor(storage.accountStorageLimitBytes / BytesPerGb);
  const minGb = Math.max(1, usedGb);

  return z.object({
    name: crateNameField,
    color: colorField,
    allocatedStorageGb: z
      .number({
        required_error: "Allocated storage is required",
        invalid_type_error: "Allocated storage must be a number",
      })
      .min(minGb, { message: `Allocated storage cannot be less than ${minGb} GB` })
      .max(maxGb, { message: `Allocated storage cannot exceed ${maxGb} GB` }),
  });
};

export const createCrateSchema = z.object({
  name: crateNameField,
  color: colorField,
  allocatedStorageGb: z.number().min(1).max(1000),
});

export const updateCrateSchema = z.object({
  name: crateNameField,
  color: colorField,
  storageAllocationGb: z.number().min(1).max(1000).optional(),
});

export const crateResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  owner: z.object({
    userId: z.string(),
    email: z.string(),
    displayName: z.string(),
    profilePicture: z.string(),
    role: z.string(),
    joinedAt: z.string(),
  }),
  usedStorageBytes: z.number(),
  totalStorageBytes: z.number(),
  joinedAt: z.string(),
});

export const crateDetailsResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  color: z.string(),
  totalUsedStorage: z.number(),
  storageLimit: z.number(),
  breakdownByType: z.array(z.any()),
  remainingStorage: z.number(),
  rootFolderId: z.string(),
});