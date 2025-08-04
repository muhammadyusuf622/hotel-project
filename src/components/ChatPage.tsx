"use client";
import {
  Card,
  Typography,
  Button,
  Alert,
  Space,
  Input,
  Avatar,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ChatMessage } from "../data/hotelData";
import { quickComplaints } from "../data/hotelData";

const { Title, Text } = Typography;

interface ChatPageProps {
  chatMessages: ChatMessage[];
  newMessage: string;
  onSendMessage: () => void;
  onSendQuickComplaint: (complaint: string) => void;
  onNewMessageChange: (value: string) => void;
}

export default function ChatPage({
  chatMessages,
  newMessage,
  onSendMessage,
  onSendQuickComplaint,
  onNewMessageChange,
}: ChatPageProps) {
  return (
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
              onClick={() => onSendQuickComplaint(complaint)}
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
            onChange={(e) => onNewMessageChange(e.target.value)}
            placeholder="Xabar yozing..."
            onPressEnter={onSendMessage}
          />
          <Button
            type="primary"
            onClick={onSendMessage}
            style={{ backgroundColor: "#8B4513" }}
          >
            Yuborish
          </Button>
        </Space.Compact>
      </Card>
    </div>
  );
}
