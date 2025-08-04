

export interface IComplaint {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomNumber: string;
  subject: string;
  description: string;
  status: "pending" | "in_progress" | "resolved"; // statuslar aniq ko'rinib turibdi
  priority: "low" | "medium" | "high";
  category: "facility" | "service" | "cleanliness"; // categoriyalar ham aniq
  rating: number;
  createdAt: string; // ISO formatdagi vaqt
  updatedAt: string;
  assignedTo?: string;
  response?: string;
  resolution?: string;
}
