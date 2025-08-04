"use client";
import { Card, Row, Col, Typography, Space, Button, Alert, Rate } from "antd";
import { foodMenu } from "../data/hotelData";
import { FoodItem } from "../data/hotelData";

const { Title, Text, Paragraph } = Typography;

interface FoodPageProps {
  onAddToCart: (food: FoodItem) => void;
}

export default function FoodPage({ onAddToCart }: FoodPageProps) {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px", color: "#8B4513" }}>
        🍽️ Restoran menyusi
      </Title>

      <Alert
        message="Maxsus taklif"
        description="Har bir buyurtmangiz uchun bepul yetkazib berish xizmati!"
        type="info"
        showIcon
        style={{ marginBottom: "24px", borderRadius: "12px" }}
      />

      <Row gutter={[16, 16]}>
        {foodMenu.map((food) => (
          <Col xs={24} sm={12} md={8} lg={6} key={food.id}>
            <Card
              hoverable
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
              cover={
                <div
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "64px",
                    background:
                      "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                    borderRadius: "12px 12px 0 0",
                  }}
                >
                  <img
                    src={food.image}
                    alt="this food img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  onClick={() => onAddToCart(food)}
                  style={{ backgroundColor: "#8B4513" }}
                >
                  Savatga qo'shish
                </Button>,
              ]}
            >
              <Card.Meta
                title={food.name}
                description={
                  <div>
                    <Paragraph>{food.description}</Paragraph>
                    <Space>
                      <Rate disabled defaultValue={food.rating} />
                      <Text strong>${food.price}</Text>
                    </Space>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
