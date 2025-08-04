import React from "react";
import { Card, Tag, Progress, Space, Typography, Button, Row, Col } from "antd";
import {
  ClearOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

interface RoomStatus {
  roomNumber: string;
  status: "available" | "occupied" | "cleaning" | "maintenance";
  cleaningTime?: string;
  nextCleaning?: string;
  occupancy: number;
  maxOccupancy: number;
}

interface RoomStatusProps {
  rooms: RoomStatus[];
  onRoomClick: (roomNumber: string) => void;
}

export const RoomStatus: React.FC<RoomStatusProps> = ({
  rooms,
  onRoomClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "green";
      case "occupied":
        return "blue";
      case "cleaning":
        return "orange";
      case "maintenance":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Bo'sh";
      case "occupied":
        return "Band";
      case "cleaning":
        return "Tozalash";
      case "maintenance":
        return "Ta'mirlash";
      default:
        return "Noma'lum";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircleOutlined />;
      case "occupied":
        return <HomeOutlined />;
      case "cleaning":
        return <ClearOutlined />;
      case "maintenance":
        return <EnvironmentOutlined />;
      default:
        return <HomeOutlined />;
    }
  };

  const getOccupancyPercentage = (occupancy: number, maxOccupancy: number) => {
    return Math.round((occupancy / maxOccupancy) * 100);
  };

  return (
    <div style={{ padding: "16px" }}>
      <Title level={4} style={{ marginBottom: "16px", color: "#8B4513" }}>
        🏨 Xona holati
      </Title>

      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col xs={24} sm={12} md={8} lg={6} key={room.roomNumber}>
            <Card
              hoverable
              style={{
                borderRadius: "12px",
                cursor: "pointer",
                border: `2px solid ${
                  room.status === "cleaning" ? "#faad14" : "#f0f0f0"
                }`,
              }}
              onClick={() => onRoomClick(room.roomNumber)}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "12px" }}>
                  {getStatusIcon(room.status)}
                </div>

                <Title level={4} style={{ margin: "8px 0", color: "#8B4513" }}>
                  Xona {room.roomNumber}
                </Title>

                <Tag
                  color={getStatusColor(room.status)}
                  style={{ marginBottom: "12px" }}
                >
                  {getStatusText(room.status)}
                </Tag>

                <div style={{ marginBottom: "12px" }}>
                  <Text type="secondary">
                    Bandlik: {room.occupancy}/{room.maxOccupancy}
                  </Text>
                  <Progress
                    percent={getOccupancyPercentage(
                      room.occupancy,
                      room.maxOccupancy
                    )}
                    size="small"
                    strokeColor="#8B4513"
                    showInfo={false}
                  />
                </div>

                {room.cleaningTime && (
                  <div style={{ marginTop: "8px" }}>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      <ClockCircleOutlined /> Tozalash: {room.cleaningTime}
                    </Text>
                  </div>
                )}

                {room.nextCleaning && (
                  <div style={{ marginTop: "4px" }}>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Keyingi: {room.nextCleaning}
                    </Text>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: "24px" }}>
        <Card title="Xona statistikasi" style={{ borderRadius: "12px" }}>
          <Row gutter={16}>
            <Col span={6}>
              <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ color: "green" }}>
                  {rooms.filter((r) => r.status === "available").length}
                </Title>
                <Text type="secondary">Bo'sh</Text>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ color: "blue" }}>
                  {rooms.filter((r) => r.status === "occupied").length}
                </Title>
                <Text type="secondary">Band</Text>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ color: "orange" }}>
                  {rooms.filter((r) => r.status === "cleaning").length}
                </Title>
                <Text type="secondary">Tozalash</Text>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ textAlign: "center" }}>
                <Title level={3} style={{ color: "red" }}>
                  {rooms.filter((r) => r.status === "maintenance").length}
                </Title>
                <Text type="secondary">Ta'mirlash</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default RoomStatus;
