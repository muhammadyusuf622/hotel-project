import React from "react";
import { Card, Typography, Badge } from "antd";
import {
  RestOutlined,
  ClearOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface ServiceCardsProps {
  cart: any[];
  roomCleaning: any[];
  onFoodClick: () => void;
  onCleaningClick: () => void;
  onChatClick: () => void;
}

const ServiceCards: React.FC<ServiceCardsProps> = ({
  cart,
  roomCleaning,
  onFoodClick,
  onCleaningClick,
  onChatClick,
}) => {
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div
          style={{
            fontSize: "64px",
            marginBottom: "16px",
            background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🍽️
        </div>
        <Title level={3} style={{ color: "#8B4513", marginBottom: "8px" }}>
          Ovqat buyurtma
        </Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Restoran menyusidan tanlang
        </Text>
        {cart.length > 0 && (
          <Badge count={cart.length} style={{ marginTop: "12px" }}>
            <div />
          </Badge>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px" }}>
        <div
          style={{
            fontSize: "64px",
            marginBottom: "16px",
            background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🧹
        </div>
        <Title level={3} style={{ color: "#8B4513", marginBottom: "8px" }}>
          Xona tozalash
        </Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Tozalash vaqtini belgilang
        </Text>
        {roomCleaning.filter((r) => r.status === "pending").length > 0 && (
          <Badge
            count={roomCleaning.filter((r) => r.status === "pending").length}
            style={{ marginTop: "12px" }}
          >
            <div />
          </Badge>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px" }}>
        <div
          style={{
            fontSize: "64px",
            marginBottom: "16px",
            background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          💬
        </div>
        <Title level={3} style={{ color: "#8B4513", marginBottom: "8px" }}>
          Admin bilan suhbat
        </Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Savollar va shikoyatlar
        </Text>
      </div>
    </>
  );
};

export default ServiceCards;
