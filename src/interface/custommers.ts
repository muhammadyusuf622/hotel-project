

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "vip" | "premium" | "regular";
  status: "active" | "inactive";
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  currentRoom?: string;
  checkInDate?: string;
  checkOutDate?: string;
  notes?: string;
}



