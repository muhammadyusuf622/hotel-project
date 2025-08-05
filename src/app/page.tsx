"use client";
import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Badge,
  Modal,
  Drawer,
  Form,
} from "antd";
import {
  HomeOutlined,
  RestOutlined,
  ClearOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import HotelNotification from "../components/HotelNotification";
import HomePage from "../components/HomePage";
import FoodPage from "../components/FoodPage";
import CleaningPage from "../components/CleaningPage";
import ChatPage from "../components/ChatPage";
import { useRouter } from "next/navigation";
import {
  FoodItem,
  RoomCleaning,
  ChatMessage,
  NotificationItem,
} from "../data/hotelData";

const { Header, Content, Sider } = Layout;

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [roomCleaning, setRoomCleaning] = useState<RoomCleaning[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatDrawerVisible, setChatDrawerVisible] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [cleaningModalVisible, setCleaningModalVisible] = useState(false);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [cleaningForm] = Form.useForm();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const router = useRouter();

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

  const renderContent = () => {
    switch (selectedMenu) {
      case "food":
        return <FoodPage onAddToCart={addToCart} />;
      case "cleaning":
        return (
          <CleaningPage
            roomCleaning={roomCleaning}
            onScheduleCleaning={scheduleCleaning}
            cleaningForm={cleaningForm}
          />
        );
      case "chat":
        return (
          <ChatPage
            chatMessages={chatMessages}
            newMessage={newMessage}
            onSendMessage={sendMessage}
            onSendQuickComplaint={sendQuickComplaint}
            onNewMessageChange={setNewMessage}
          />
        );
      default:
        return (
          <HomePage
            currentTime={currentTime}
            cart={cart}
            roomCleaning={roomCleaning}
            onRoomClick={handleRoomClick}
            onFoodClick={() => setFoodModalVisible(true)}
            onCleaningClick={() => setCleaningModalVisible(true)}
            onChatClick={() => setChatDrawerVisible(true)}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
          />
        );
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
            "linear-gradient(180deg, #4B2C20 0%, #8B4513 40%, #D2A679 100%)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ padding: "32px 24px", textAlign: "center" }}>
          <h2
            style={{ color: "white", marginBottom: "12px", fontSize: "28px" }}
          >
            🏨 Luxury Hotel
          </h2>
          <p style={{ color: "white", opacity: 0.9, fontSize: "16px" }}>
            Premium xizmatlar
          </p>
        </div>

        <Menu
          mode="inline"
          className="custom-sidebar"
          selectedKeys={[selectedMenu]}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "20px",
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
          <h4 style={{ margin: 0, color: "#8B4513", fontSize: "20px" }}>
            {selectedMenu === "home" && "🏨 Luxury Hotel"}
            {selectedMenu === "food" && "🍽️ Ovqat buyurtma"}
            {selectedMenu === "cleaning" && "🧹 Xona tozalash"}
            {selectedMenu === "chat" && "💬 Admin bilan suhbat"}
          </h4>

          <div style={{ display: "flex", gap: "8px", alignItems: 'center' }}>
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
          </div>
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
        <FoodPage onAddToCart={addToCart} />
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
        <CleaningPage
          roomCleaning={roomCleaning}
          onScheduleCleaning={scheduleCleaning}
          cleaningForm={cleaningForm}
        />
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
        <ChatPage
          chatMessages={chatMessages}
          newMessage={newMessage}
          onSendMessage={sendMessage}
          onSendQuickComplaint={sendQuickComplaint}
          onNewMessageChange={setNewMessage}
        />
      </Drawer>
    </Layout>
  );
}
