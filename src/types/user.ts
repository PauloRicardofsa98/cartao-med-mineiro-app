export type Dependent = {
  uuid: string;
  id: number;
  asaasId: string | null;
  name: string;
  cpfOrCnpj: string;
  birthday: string;
  phone: string;
  email: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
  created_at: Date;
  updated_at: Date;
  branchUuid: string;
  external: boolean;
};
export type Customer = {
  uuid: string;
  id: number;
  asaasId: string | null;
  name: string;
  cpfOrCnpj: string;
  birthday: string;
  phone: string;
  email: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
  created_at: Date;
  updated_at: Date;
  branchUuid: string;
  external: boolean;
  planName: string;
};

export type User = {
  uuid: string;
  name: string;
  cpfOrCnpj: string;
  holderUuid: string;
  plan: string;
  subscriptionUuid: string;
  subscriptionActive: boolean;
};
