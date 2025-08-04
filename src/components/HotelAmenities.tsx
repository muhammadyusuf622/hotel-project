import React from "react";
import { Card, Carousel, Typography } from "antd";
import {
  RestOutlined,
  TrophyOutlined,
  FireOutlined,
  CrownOutlined,
  SafetyOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface HotelAmenity {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  rating: number;
  price?: string;
}

const hotelAmenities: HotelAmenity[] = [
  {
    id: 1,
    name: "Premium Restaurant",
    description: "5 yulduzli restoran - dunyo standartlariga mos",
    image:
      "https://www.architectandinteriorsindia.com/cloud/2021/11/15/Dubai_Marina_Restaurant_19.jpg",
    icon: <RestOutlined />,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Sport Zali",
    description: "Zamonaviy jihozlangan sport zali",
    image:
      "https://housing.com/news/wp-content/uploads/2022/11/GYM-INTERIORS-FEATURE-compressed.jpg",
    icon: <TrophyOutlined />,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Hovuz va Sauna",
    description: "Infinity hovuz va fin sauna",
    image:
      "https://bookmestatic.net.nz/bookme-product-images/products/6391/6391_image1_RCHR_Pool_BookMe2.jpg",
    icon: <FireOutlined />,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Spa va Massaj",
    description: "Professional spa xizmatlari",
    image:
      "https://img.grouponcdn.com/iam/3YvWGFGyhvk5FKjkkTiEcBNv6RyE/3Y-2048x1229/v1/t2001x1212.webp",
    icon: <CrownOutlined />,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Konferens Zali",
    description: "Biznes uchrashuvlari uchun",
    image:
      "https://adenhotel.by/upload/resize_cache/iblock/f9a/1200_500_2/3s3u24j6h2zlsok0nmnqpkdgr6m3pq34.jpg",
    icon: <SafetyOutlined />,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Bar va Lounge",
    description: "Premium ichimliklar va muzika",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/a6/70/7b/interior-of-rt60.jpg?w=900&h=500&s=1",
    icon: <CoffeeOutlined />,
    rating: 4.8,
  },
];

const HotelAmenities: React.FC = () => {
  return (
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
                background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
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
  );
};

export default HotelAmenities;
