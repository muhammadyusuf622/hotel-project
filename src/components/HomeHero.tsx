import React from "react";
import { Card, Typography, Space } from "antd";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface HomeHeroProps {
  currentTime: Date;
}

const HomeHero: React.FC<HomeHeroProps> = ({ currentTime }) => {
  return (
    <Card
      style={{
        background: "black",
        color: "white",
        borderRadius: "20px",
        boxShadow: "0 15px 40px rgba(139, 69, 19, 0.3)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "60px 0",
        }}
      >
        <Title
          level={1}
          style={{
            color: "white",
            marginBottom: "16px",
            fontSize: "48px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          🏨 Luxury Hotel
        </Title>
        <Paragraph
          style={{
            color: "white",
            fontSize: "20px",
            marginBottom: "32px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Premium mehmonxona xizmatlari va qulayliklar
        </Paragraph>
        <Space size="large" style={{ fontSize: "16px" }}>
          <Text
            style={{
              color: "white",
              fontSize: "20px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <ClockCircleOutlined /> {currentTime.toLocaleTimeString()}
          </Text>
          <Text
            style={{
              color: "white",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <EnvironmentOutlined /> Toshkent, O'zbekiston
          </Text>
        </Space>
      </div>
    </Card>
  );
};

export default HomeHero;
