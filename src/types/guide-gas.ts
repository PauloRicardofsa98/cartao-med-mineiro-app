import { SupplierGas } from "./supplier-gas";

export type GuideGas = {
  uuid: string;
  id: number;
  customerUuid: string;
  adminUuid: string;
  supplierGasUuid: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paidSupplier: boolean;
  observation: string | null;
  created_at: Date;
  updated_at: Date;
  supplier_gas: SupplierGas;
};

export type GuideGasProps = {
  customerUuid?: string;
  supplierGasUuid?: string;
  observation: string;
  createdBy: string;
};
