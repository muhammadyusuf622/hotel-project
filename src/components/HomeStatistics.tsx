import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface RoomStatusData {
  roomNumber: string;
  status: "available" | "occupied" | "cleaning" | "maintenance";
  cleaningTime?: string;
  nextCleaning?: string;
  occupancy: number;
  maxOccupancy: number;
}

interface HomeStatisticsProps {
  roomStatusData: RoomStatusData[];
}

const HomeStatistics: React.FC<HomeStatisticsProps> = ({ roomStatusData }) => {
  return (
    <Card
      title="📊 Hotel statistikasi"
      style={{
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={12} md={6}>
          <Statistic
            title="Jami xonalar"
            value={roomStatusData.length}
            prefix={<HomeOutlined />}
            valueStyle={{ color: "#8B4513", fontSize: "24px" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Bo'sh xonalar"
            value={
              roomStatusData.filter((r) => r.status === "available").length
            }
            valueStyle={{ color: "#52c41a", fontSize: "24px" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Band xonalar"
            value={roomStatusData.filter((r) => r.status === "occupied").length}
            valueStyle={{ color: "#1890ff", fontSize: "24px" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Tozalashda"
            value={roomStatusData.filter((r) => r.status === "cleaning").length}
            valueStyle={{ color: "#faad14", fontSize: "24px" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default HomeStatistics;
