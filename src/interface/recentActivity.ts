
export interface IRecentActivity {
  id: string;
  type: "booking" | "checkin" | "checkout" | "complaint";
  message: string;
  time: string;
  user: string;
}
