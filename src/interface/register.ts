
export interface IRegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: "guest" | "business" | "vip";
  password: string;
  confirmPassword: string;
  agreement: boolean;
}
