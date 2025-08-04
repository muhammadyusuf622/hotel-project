"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Statistic,
  Timeline,
  List,
  Divider,
  Button,
  Badge,
  Carousel,
} from "antd";
import {
  HomeOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { roomStatusData, hotelAmenities } from "../data/hotelData";
import RoomStatus from "./RoomStatus";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;

interface HomePageProps {
  currentTime: Date;
  cart: any[];
  roomCleaning: any[];
  onRoomClick: (roomNumber: string) => void;
  onFoodClick: () => void;
  onCleaningClick: () => void;
  onChatClick: () => void;
  removeFromCart: (index: number) => void;
  getTotalPrice: () => number;
}

export default function HomePage({
  currentTime,
  cart,
  roomCleaning,
  onRoomClick,
  onFoodClick,
  onCleaningClick,
  onChatClick,
  removeFromCart,
  getTotalPrice,
}: HomePageProps) {
  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Hero Section with Hotel Image */}
        <Col span={24}>
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
        </Col>

        {/* Service Cards */}
        <Col xs={24} md={8}>
          <Card
            hoverable
            style={{
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
            }}
            onClick={onFoodClick}
            className="service-card"
          >
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div
                style={{
                  fontSize: "64px",
                  marginBottom: "16px",
                  background:
                    "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🍽️
              </div>
              <Title
                level={3}
                style={{ color: "#8B4513", marginBottom: "8px" }}
              >
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
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            style={{
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
            }}
            onClick={onCleaningClick}
            className="service-card"
          >
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div
                style={{
                  fontSize: "64px",
                  marginBottom: "16px",
                  background:
                    "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🧹
              </div>
              <Title
                level={3}
                style={{ color: "#8B4513", marginBottom: "8px" }}
              >
                Xona tozalash
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Tozalash vaqtini belgilang
              </Text>
              {roomCleaning.filter((r) => r.status === "pending").length >
                0 && (
                <Badge
                  count={
                    roomCleaning.filter((r) => r.status === "pending").length
                  }
                  style={{ marginTop: "12px" }}
                >
                  <div />
                </Badge>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            style={{
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
            }}
            onClick={onChatClick}
            className="service-card"
          >
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div
                style={{
                  fontSize: "64px",
                  marginBottom: "16px",
                  background:
                    "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                💬
              </div>
              <Title
                level={3}
                style={{ color: "#8B4513", marginBottom: "8px" }}
              >
                Admin bilan suhbat
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Savollar va shikoyatlar
              </Text>
            </div>
          </Card>
        </Col>

        {/* Room Status Section */}
        <Col span={24}>
          <RoomStatus rooms={roomStatusData} onRoomClick={onRoomClick} />
        </Col>

        {/* Hotel Amenities Carousel */}
        <Col span={24}>
          <Card
            style={{
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Carousel autoplay dots={false}>
              {hotelAmenities.map((amenity) => (
                <div key={amenity.id}>
                  <div
                    style={{
                      height: "650px",
                      background:
                        "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "80px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        background: "rgba(139, 69, 19, 0.9)",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {amenity.rating} ⭐
                    </div>
                    <img
                      src={amenity.image}
                      alt="this hotel img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <Title
                      level={4}
                      style={{ color: "#8B4513", marginBottom: "8px" }}
                    >
                      {amenity.icon} {amenity.name}
                    </Title>
                    <Text type="secondary">{amenity.description}</Text>
                  </div>
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>

        {/* Statistics */}
        <Col span={24}>
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
                    roomStatusData.filter((r) => r.status === "available")
                      .length
                  }
                  valueStyle={{ color: "#52c41a", fontSize: "24px" }}
                />
              </Col>
              <Col xs={12} md={6}>
                <Statistic
                  title="Band xonalar"
                  value={
                    roomStatusData.filter((r) => r.status === "occupied").length
                  }
                  valueStyle={{ color: "#1890ff", fontSize: "24px" }}
                />
              </Col>
              <Col xs={12} md={6}>
                <Statistic
                  title="Tozalashda"
                  value={
                    roomStatusData.filter((r) => r.status === "cleaning").length
                  }
                  valueStyle={{ color: "#faad14", fontSize: "24px" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {roomCleaning.length > 0 && (
          <Col span={24}>
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
          </Col>
        )}

        {cart.length > 0 && (
          <Col span={24}>
            <Card
              title="🛒 Savat"
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <List
                dataSource={cart}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        danger
                        onClick={() => removeFromCart(index)}
                      >
                        O'chirish
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Text style={{ fontSize: "32px" }}>{item.image}</Text>
                      }
                      title={item.name}
                      description={`$${item.price}`}
                    />
                  </List.Item>
                )}
              />
              <Divider />
              <div style={{ textAlign: "right" }}>
                <Title level={4}>Jami: ${getTotalPrice()}</Title>
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#8B4513" }}
                >
                  Buyurtma berish
                </Button>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}
