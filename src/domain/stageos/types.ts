export const MEMBERSHIP_TIERS = ["free", "member", "custom"] as const;
export type MembershipTier = (typeof MEMBERSHIP_TIERS)[number];

export const PREVIEW_MODES = ["dot-sketch", "stage-2.5d", "stage-3d"] as const;
export type PreviewMode = (typeof PREVIEW_MODES)[number];
