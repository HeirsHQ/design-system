export type SubscriptionStatus = "active" | "inactive" | "expired";

export interface Subscription {
  id: string;
  correlationId: string;
  description: string | null;
  name: string;
  expiresAt: Date;
}
