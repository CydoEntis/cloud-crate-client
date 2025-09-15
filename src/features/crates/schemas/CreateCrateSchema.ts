import z from "zod";

export type StorageDetails = {
  usedStorageBytes: number;
  accountStorageLimitBytes: number;
};

export const createCreateCrateSchema = (storage: StorageDetails) => {
  const BytesPerGb = 1024 * 1024 * 1024;
  const usedGb = Math.ceil(storage.usedStorageBytes / BytesPerGb);
  const maxGb = Math.floor(storage.accountStorageLimitBytes / BytesPerGb);

  // Minimum 1 GB, and at least usedGb
  const minGb = Math.max(1, usedGb);

  return z.object({
    name: z
      .string()
      .min(3, { message: "Crate name must be at least 3 characters long." })
      .max(100, { message: "Crate name must be at most 100 characters long." })
      .regex(/^[a-zA-Z0-9 _-]*$/, { message: "Crate name contains invalid characters." }),
    color: z
      .string()
      .min(1, { message: "Color is required." })
      .regex(/^#([0-9A-Fa-f]{6})$/, { message: "Color is invalid." }),
    allocatedStorageGb: z
      .number({
        required_error: "Allocated storage is required",
        invalid_type_error: "Allocated storage must be a number",
      })
      .min(minGb, { message: `Allocated storage cannot be less than ${minGb} GB` })
      .max(maxGb, { message: `Allocated storage cannot exceed ${maxGb} GB` }),
  });
};
