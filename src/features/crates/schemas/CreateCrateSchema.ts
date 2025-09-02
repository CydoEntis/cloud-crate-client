import z from "zod";

export type StorageDetails = {
  usedStorageMb: number;      // how much storage the user has already used
  maxStorageMb: number;       // total storage allowed by their plan
};

export const createCreateCrateSchema = (storage: StorageDetails) => {
  const remainingAllocatableMb = storage.maxStorageMb - storage.usedStorageMb;
  const minStorageMb = Math.max(storage.usedStorageMb, 1024); // can't go below 1 GB or used
  const maxStorageMb = storage.usedStorageMb + remainingAllocatableMb;

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
    allocatedStorageMb: z
      .number({
        required_error: "Allocated storage is required",
        invalid_type_error: "Allocated storage must be a number",
      })
      .min(minStorageMb, { message: `Allocated storage cannot be less than ${minStorageMb / 1024} GB` })
      .max(maxStorageMb, { message: `Allocated storage cannot exceed ${maxStorageMb / 1024} GB` }),
  });
};
