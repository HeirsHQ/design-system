import { IsolationMode } from "./tenant";
import { User } from "./user";

export interface SigninDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SigninResponse {
  user: User;
  tokens: {
    accessToken: string;
    expiresIn: Date;
    refreshToken: string;
    tokenType: string;
  };
}

export interface CreateTenantDto {
  organizationName: string;
  subscriptionPlan: string;
  email: string;
  domainName: string;
  domainSuffix: string;
  phoneNumber: string;
  address: string;
  isolationMode: IsolationMode | (string & {});
  primaryCurrency: string;
  adminUser: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export type UpdateTenantDto = Omit<CreateTenantDto, "adminUser">;
