import React from "react";
import { Card, Timeline } from "antd";

interface RoomCleaning {
  id: number;
  roomNumber: string;
  status: "pending" | "in-progress" | "completed";
  scheduledTime: string;
  notes: string;
}

interface CleaningScheduleProps {
  roomCleaning: RoomCleaning[];
}

const CleaningSchedule: React.FC<CleaningScheduleProps> = ({
  roomCleaning,
}) => {
  if (roomCleaning.length === 0) return null;

  return (
    <Card
      title="📅 Xona tozalash jadvali"
      style={{
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <Timeline>
        {roomCleaning.map((item) => (
          <Timeline.Item
            key={item.id}
            color={
              item.status === "completed"
                ? "green"
                : item.status === "in-progress"
                ? "blue"
                : "orange"
            }
          >
            <p>
              <strong>Xona {item.roomNumber}</strong>
            </p>
            <p>Vaqt: {item.scheduledTime}</p>
            <p>Status: {item.status}</p>
            {item.notes && <p>Eslatma: {item.notes}</p>}
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default CleaningSchedule;
