

export interface IRoom {
  id: string;
  number: string;
  type: "standard" | "deluxe" | "suite" | "presidential"; // Xonalar turi aniq
  status: "occupied" | "available" | "cleaning" | "maintenance"; // Holatlar ro'yxati
  price: number;
  floor: number;
  capacity: number;
  currentGuest?: string;
  checkInTime?: string; // "2024-01-15" formatdagi sanalar
  checkOutTime?: string;
  cleaningTime?: string; // "14:00" formatdagi vaqt
  notes?: string;
}
