"use client";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Alert,
  Form,
  Input,
  TimePicker,
  List,
  Tag,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { RoomCleaning } from "../data/hotelData";

const { Title, Text } = Typography;

interface CleaningPageProps {
  roomCleaning: RoomCleaning[];
  onScheduleCleaning: (values: any) => void;
  cleaningForm: any;
}

export default function CleaningPage({
  roomCleaning,
  onScheduleCleaning,
  cleaningForm,
}: CleaningPageProps) {
  return (
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
              onFinish={onScheduleCleaning}
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
}
