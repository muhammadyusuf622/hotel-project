import React from "react";
import { notification, Badge, Button, Space, Typography } from "antd";
import { BellOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface NotificationItem {
  id: string;
  type: "cleaning" | "food" | "general";
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

interface HotelNotificationProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const HotelNotification: React.FC<HotelNotificationProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const showNotification = (
    type: "cleaning" | "food" | "general",
    title: string,
    message: string
  ) => {
    const icon =
      type === "cleaning" ? (
        <ClockCircleOutlined />
      ) : type === "food" ? (
        <BellOutlined />
      ) : (
        <BellOutlined />
      );

    notification.success({
      message: title,
      description: message,
      icon,
      placement: "topRight",
      duration: 4,
      style: {
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(139, 69, 19, 0.15)",
      },
    });
  };

  const getNotificationIcon = (type: "cleaning" | "food" | "general") => {
    switch (type) {
      case "cleaning":
        return <ClockCircleOutlined style={{ color: "#8B4513" }} />;
      case "food":
        return <BellOutlined style={{ color: "#8B4513" }} />;
      default:
        return <BellOutlined style={{ color: "#8B4513" }} />;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Badge count={unreadCount} offset={[-5, 5]}>
        <Button
          icon={<BellOutlined />}
          style={{
            backgroundColor: "#8B4513",
            color: "white",
            borderRadius: "8px",
          }}
        />
      </Badge>

      {notifications.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: "8px",
            }}
          >
            <Text strong>Bildirishnomalar</Text>
            <Button
              type="text"
              size="small"
              onClick={onClearAll}
              style={{ color: "#8B4513" }}
            >
              Tozalash
            </Button>
          </div>

          <Space direction="vertical" style={{ width: "100%" }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: notification.read ? "#f9f9f9" : "#fff7e6",
                  border: notification.read
                    ? "1px solid #f0f0f0"
                    : "1px solid #ffd591",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  {getNotificationIcon(notification.type)}
                  <div style={{ flex: 1 }}>
                    <Text
                      strong
                      style={{ display: "block", marginBottom: "4px" }}
                    >
                      {notification.title}
                    </Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {notification.message}
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Text type="secondary" style={{ fontSize: "10px" }}>
                        {notification.time.toLocaleTimeString()}
                      </Text>
                    </div>
                  </div>
                  {!notification.read && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#8B4513",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </Space>
        </div>
      )}
    </div>
  );
};

export default HotelNotification;
