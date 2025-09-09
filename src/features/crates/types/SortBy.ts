import type { allowedSortByValues } from "../utils/crate.constants";

export type SortBy = (typeof allowedSortByValues)[number];