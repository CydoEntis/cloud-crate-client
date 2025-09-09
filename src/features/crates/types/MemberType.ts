import type { allowedMemberTypes } from "../utils/crate.constants";

export type MemberType = (typeof allowedMemberTypes)[number];
