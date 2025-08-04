"use client";
import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Card,
  Button,
  Input,
  Select,
  TimePicker,
  Modal,
  message,
  Badge,
  Avatar,
  List,
  Tag,
  Divider,
  Space,
  Typography,
  Row,
  Col,
  Image,
  Drawer,
  Form,
  Rate,
  Tooltip,
  Progress,
  Alert,
  Timeline,
  Statistic,
  Carousel,
} from "antd";
import {
  HomeOutlined,
  RestOutlined,
  ClearOutlined,
  MessageOutlined,
  UserOutlined,
  ClockCircleOutlined,
  BellOutlined,
  StarOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  CrownOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import HotelNotification from "../components/HotelNotification";
import RoomStatus from "../components/RoomStatus";

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface RoomCleaning {
  id: number;
  roomNumber: string;
  status: "pending" | "in-progress" | "completed";
  scheduledTime: string;
  notes: string;
}

interface ChatMessage {
  id: number;
  sender: "user" | "admin";
  message: string;
  timestamp: Date;
  type: "complaint" | "question" | "general";
}

interface NotificationItem {
  id: string;
  type: "cleaning" | "food" | "general";
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

interface RoomStatusData {
  roomNumber: string;
  status: "available" | "occupied" | "cleaning" | "maintenance";
  cleaningTime?: string;
  nextCleaning?: string;
  occupancy: number;
  maxOccupancy: number;
}

interface HotelAmenity {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  rating: number;
  price?: string;
}

const foodMenu: FoodItem[] = [
  {
    id: 1,
    name: "Hambuger fast food",
    description: "Fresh eggs, bacon, toast, and coffee",
    price: 25,
    image:
      "https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Ch=1335%2Cq=85%2Cw=2000/wp-content/uploads/national-fast-food-day.jpg",
    category: "breakfast",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Grilled Salmon",
    description: "Fresh salmon with vegetables and rice",
    price: 35,
    image:
      "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/spicy_salmon_bite_rice_16300_16x9.jpg",
    category: "main",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Caesar",
    description: "Fresh lettuce, parmesan, and croutons",
    price: 18,
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-craig-122861-376464.jpg&fm=jpg",
    category: "appetizer",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Delicious chicken",
    description: "Rich chicken cake with lemon",
    price: 12,
    image:
      "https://cdn.media.amplience.net/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    category: "dessert",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Ice cream",
    description: "Creamy pasta with bacon and parmesan",
    price: 28,
    image:
      "https://ingredion-stage65.adobecqms.net/content/dam/ingredion/other/us/colorblock-images/Solids-Replacement-Icecream-720x560.jpg",
    category: "main",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Pasta happy birthday",
    description: "Pasta happy birthday very sweet",
    price: 15,
    image:
      "https://m.media-amazon.com/images/I/71gbygKCKfL._UF1000,1000_QL80_.jpg",
    category: "soup",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Beef Steak",
    description: "Premium beef steak with mashed potatoes",
    price: 45,
    image:
      "https://nebraskastarbeef.com/wp-content/uploads/2022/09/52913995_m-scaled.jpg",
    category: "main",
    rating: 4.9,
  },
  {
    id: 8,
    name: "Fruit Smoothie",
    description: "Fresh fruit smoothie with yogurt",
    price: 8,
    image:
      "https://irepo.primecp.com/2015/04/216765/Mixed-Fruit-Smoothie-5134_Large600_ID-951557.jpg?v=951557",
    category: "drink",
    rating: 4.4,
  },
];

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

const quickComplaints = [
  "Xona sovuq",
  "Ovqat sovuq",
  "Internet ishlamayapti",
  "Konditsioner ishlamayapti",
  "Hovuz tozalash kerak",
  "Lift ishlamayapti",
  "Ovqat kech keldi",
  "Xona tozalash kerak",
  "Televizor ishlamayapti",
  "Issiq suv yo'q",
];

const roomStatusData: RoomStatusData[] = [
  {
    roomNumber: "101",
    status: "occupied",
    occupancy: 2,
    maxOccupancy: 2,
    cleaningTime: "14:00",
  },
  { roomNumber: "102", status: "available", occupancy: 0, maxOccupancy: 2 },
  {
    roomNumber: "103",
    status: "cleaning",
    occupancy: 0,
    maxOccupancy: 2,
    cleaningTime: "10:30",
  },
  {
    roomNumber: "201",
    status: "occupied",
    occupancy: 1,
    maxOccupancy: 2,
    nextCleaning: "16:00",
  },
  { roomNumber: "202", status: "maintenance", occupancy: 0, maxOccupancy: 2 },
  { roomNumber: "203", status: "available", occupancy: 0, maxOccupancy: 2 },
  {
    roomNumber: "301",
    status: "occupied",
    occupancy: 2,
    maxOccupancy: 2,
    nextCleaning: "15:30",
  },
  {
    roomNumber: "302",
    status: "cleaning",
    occupancy: 0,
    maxOccupancy: 2,
    cleaningTime: "11:00",
  },
];

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [roomCleaning, setRoomCleaning] = useState<RoomCleaning[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [cleaningModalVisible, setCleaningModalVisible] = useState(false);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cleaningForm] = Form.useForm();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (roomCleaning.length > 0) {
        const pendingCleaning = roomCleaning.find(
          (r) => r.status === "pending"
        );
        if (pendingCleaning) {
          const newNotification: NotificationItem = {
            id: Date.now().toString(),
            type: "cleaning",
            title: "Xona tozalash eslatmasi",
            message: `Xona ${pendingCleaning.roomNumber} tozalash vaqti yaqinlashmoqda`,
            time: new Date(),
            read: false,
          };
          setNotifications((prev) => [newNotification, ...prev]);
          toast.success(
            `Xona ${pendingCleaning.roomNumber} tozalash vaqti yaqinlashmoqda!`
          );
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [roomCleaning]);

  const addToCart = (food: FoodItem) => {
    setCart([...cart, food]);
    toast.success(`${food.name} savatga qo'shildi!`);

    // Add notification for food order
    const newNotification: NotificationItem = {
      id: Date.now().toString(),
      type: "food",
      title: "Ovqat buyurtmasi",
      message: `${food.name} savatga qo'shildi`,
      time: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    toast.success("Mahsulot savatdan olib tashlandi!");
  };

  const scheduleCleaning = (values: any) => {
    const newCleaning: RoomCleaning = {
      id: Date.now(),
      roomNumber: values.roomNumber,
      status: "pending",
      scheduledTime: values.time.format("HH:mm"),
      notes: values.notes || "",
    };
    setRoomCleaning([...roomCleaning, newCleaning]);
    setCleaningModalVisible(false);
    cleaningForm.resetFields();
    toast.success("Xona tozalash vaqti belgilandi!");

    // Add notification
    const newNotification: NotificationItem = {
      id: Date.now().toString(),
      type: "cleaning",
      title: "Xona tozalash belgilandi",
      message: `Xona ${values.roomNumber} ${values.time.format(
        "HH:mm"
      )} da tozalanadi`,
      time: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now(),
        sender: "user",
        message: newMessage,
        timestamp: new Date(),
        type: "general",
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");

      // Simulate admin response
      setTimeout(() => {
        const adminResponse: ChatMessage = {
          id: Date.now() + 1,
          sender: "admin",
          message: "Xabar qabul qilindi. Tez orada javob beramiz!",
          timestamp: new Date(),
          type: "general",
        };
        setChatMessages((prev) => [...prev, adminResponse]);
      }, 2000);
    }
  };

  const sendQuickComplaint = (complaint: string) => {
    const message: ChatMessage = {
      id: Date.now(),
      sender: "user",
      message: complaint,
      timestamp: new Date(),
      type: "complaint",
    };
    setChatMessages([...chatMessages, message]);
    toast.success("Shikoyat yuborildi!");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleRoomClick = (roomNumber: string) => {
    toast.success(`Xona ${roomNumber} ma'lumotlari ko'rsatilmoqda`);
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Bosh sahifa",
    },
    {
      key: "food",
      icon: <RestOutlined />,
      label: "Ovqat buyurtma",
    },
    {
      key: "cleaning",
      icon: <ClearOutlined />,
      label: "Xona tozalash",
    },
    {
      key: "chat",
      icon: <MessageOutlined />,
      label: "Admin bilan suhbat",
    },
  ];

  const renderHomeContent = () => (
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
            onClick={() => setFoodModalVisible(true)}
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
            onClick={() => setCleaningModalVisible(true)}
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
            onClick={() => setChatDrawerVisible(true)}
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
          <RoomStatus rooms={roomStatusData} onRoomClick={handleRoomClick} />
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

  const renderFoodContent = () => (
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
                  <img src={food.image} alt="this food img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  onClick={() => addToCart(food)}
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

  const renderCleaningContent = () => (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px", color: "#8B4513" }}>
        🧹 Xona tozalash
      </Title>

      <Alert
        message="Xizmat haqida"
        description="Xona tozalash xizmati kuniga 2 marta amalga oshiriladi. Vaqtni tanlang va maxsus talablaringizni yozing."
        type="info"
        showIcon
        style={{ marginBottom: "24px", borderRadius: "12px" }}
      />

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            style={{
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <Form
              form={cleaningForm}
              onFinish={scheduleCleaning}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="roomNumber"
                    label="Xona raqami"
                    rules={[
                      { required: true, message: "Xona raqamini kiriting!" },
                    ]}
                  >
                    <Input placeholder="Masalan: 101" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="time"
                    label="Tozalash vaqti"
                    rules={[{ required: true, message: "Vaqtni tanlang!" }]}
                  >
                    <TimePicker format="HH:mm" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="notes" label="Qo'shimcha ma'lumot">
                <Input.TextArea rows={4} placeholder="Maxsus talablar..." />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ backgroundColor: "#8B4513" }}
                >
                  Tozalash vaqtini belgilash
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {roomCleaning.length > 0 && (
          <Col span={24}>
            <Card
              title="Tozalash jadvali"
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <List
                dataSource={roomCleaning}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <ClearOutlined
                          style={{ fontSize: "24px", color: "#8B4513" }}
                        />
                      }
                      title={`Xona ${item.roomNumber}`}
                      description={`Vaqt: ${item.scheduledTime} | Eslatma: ${item.notes}`}
                    />
                    <Tag
                      color={
                        item.status === "completed"
                          ? "green"
                          : item.status === "in-progress"
                          ? "blue"
                          : "orange"
                      }
                    >
                      {item.status}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );

  const renderChatContent = () => (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px", color: "#8B4513" }}>
        💬 Admin bilan suhbat
      </Title>

      <Alert
        message="24/7 qo'llab-quvvatlash"
        description="Har qanday savol va shikoyatlar uchun admin bilan bog'laning"
        type="success"
        showIcon
        style={{ marginBottom: "24px", borderRadius: "12px" }}
      />

      <Card
        title="Tezkor shikoyatlar"
        style={{
          marginBottom: "24px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Space wrap>
          {quickComplaints.map((complaint, index) => (
            <Button
              key={index}
              onClick={() => sendQuickComplaint(complaint)}
              style={{ backgroundColor: "#8B4513", color: "white" }}
            >
              {complaint}
            </Button>
          ))}
        </Space>
      </Card>

      <Card
        title="Suhbat tarixi"
        style={{
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ height: "400px", overflowY: "auto" }}>
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "16px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "admin" ? "#f0f0f0" : "#e6f7ff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor:
                      msg.sender === "admin" ? "#8B4513" : "#1890ff",
                    marginRight: "8px",
                  }}
                />
                <Text strong>{msg.sender === "admin" ? "Admin" : "Siz"}</Text>
                <Text
                  type="secondary"
                  style={{ marginLeft: "auto", fontSize: "12px" }}
                >
                  {msg.timestamp.toLocaleTimeString()}
                </Text>
              </div>
              <Text>{msg.message}</Text>
            </div>
          ))}
        </div>

        <Divider />

        <Space.Compact style={{ width: "100%" }}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Xabar yozing..."
            onPressEnter={sendMessage}
          />
          <Button
            type="primary"
            onClick={sendMessage}
            style={{ backgroundColor: "#8B4513" }}
          >
            Yuborish
          </Button>
        </Space.Compact>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "food":
        return renderFoodContent();
      case "cleaning":
        return renderCleaningContent();
      case "chat":
        return renderChatContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
      }}
    >
      <Sider
        width={280}
        style={{
          background:
            "linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #D2691E 100%)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ padding: "32px 24px", textAlign: "center" }}>
          <Title
            level={2}
            style={{ color: "white", marginBottom: "12px", fontSize: "28px" }}
          >
            🏨 Luxury Hotel
          </Title>
          <Text style={{ color: "white", opacity: 0.9, fontSize: "16px" }}>
            Premium xizmatlar
          </Text>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "16px",
          }}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "white",
            padding: "0 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title
            level={4}
            style={{ margin: 0, color: "#8B4513", fontSize: "20px" }}
          >
            {selectedMenu === "home" && "🏠 Bosh sahifa"}
            {selectedMenu === "food" && "🍽️ Ovqat buyurtma"}
            {selectedMenu === "cleaning" && "🧹 Xona tozalash"}
            {selectedMenu === "chat" && "💬 Admin bilan suhbat"}
          </Title>

          <Space>
            <HotelNotification
              notifications={notifications}
              onMarkAsRead={markNotificationAsRead}
              onClearAll={clearAllNotifications}
            />
            <Badge count={cart.length}>
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={() => setFoodModalVisible(true)}
                style={{ backgroundColor: "#8B4513", color: "white" }}
              />
            </Badge>
            <Badge
              count={roomCleaning.filter((r) => r.status === "pending").length}
            >
              <Button
                icon={<ClearOutlined />}
                onClick={() => setCleaningModalVisible(true)}
                style={{ backgroundColor: "#8B4513", color: "white" }}
              />
            </Badge>
            <Badge
              count={chatMessages.filter((m) => m.sender === "admin").length}
            >
              <Button
                icon={<MessageOutlined />}
                onClick={() => setChatDrawerVisible(true)}
                style={{ backgroundColor: "#8B4513", color: "white" }}
              />
            </Badge>
          </Space>
        </Header>

        <Content style={{ margin: "24px", background: "transparent" }}>
          {renderContent()}
        </Content>
      </Layout>

      {/* Food Modal */}
      <Modal
        title="Ovqat buyurtma"
        open={foodModalVisible}
        onCancel={() => setFoodModalVisible(false)}
        footer={null}
        width={800}
        className="hotel-modal"
      >
        {renderFoodContent()}
      </Modal>

      {/* Cleaning Modal */}
      <Modal
        title="Xona tozalash"
        open={cleaningModalVisible}
        onCancel={() => setCleaningModalVisible(false)}
        footer={null}
        width={600}
        className="hotel-modal"
      >
        {renderCleaningContent()}
      </Modal>

      {/* Chat Drawer */}
      <Drawer
        title="Admin bilan suhbat"
        placement="right"
        onClose={() => setChatDrawerVisible(false)}
        open={chatDrawerVisible}
        width={400}
        className="hotel-drawer"
      >
        {renderChatContent()}
      </Drawer>
    </Layout>
  );
}
