"use client";

import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IRegisterFormValues } from "@/interface";

const { Option } = Select;

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: IRegisterFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });


      const data = await res.json();

      const userInfo = {
        id: data.data.id,
        name: data.data.name,
      }
      console.log(userInfo)

      localStorage.setItem('user', JSON.stringify(userInfo));

      message.success("Muvaffaqiyatli ro'yxatdan o'tildi!");
      router.push('/');
    } catch (error) {
      message.error("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotel-auth-container">
      <div className="hotel-auth-card">
        <div className="hotel-logo">
          <HomeOutlined
            style={{ fontSize: "48px", color: "#1890ff", marginBottom: "16px" }}
          />
          <h1>Luxury Hotel</h1>
          <p>Yangi hisob yarating</p>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          layout="vertical"
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <div className="hotel-form-item" style={{ flex: 1 }}>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Iltimos, ismingizni kiriting!" },
                  {
                    min: 2,
                    message: "Ism kamida 2 ta harfdan iborat bo'lishi kerak!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Ism"
                  style={{ height: "48px", borderRadius: "8px" }}
                />
              </Form.Item>
            </div>

            <div className="hotel-form-item" style={{ flex: 1 }}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, familiyangizni kiriting!",
                  },
                  {
                    min: 2,
                    message:
                      "Familiya kamida 2 ta harfdan iborat bo'lishi kerak!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                  placeholder="Familiya"
                  style={{ height: "48px", borderRadius: "8px" }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Iltimos, email manzilingizni kiriting!",
                },
                { type: "email", message: "Noto'g'ri email format!" },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Email manzil"
                style={{ height: "48px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Iltimos, telefon raqamingizni kiriting!",
                },
                {
                  pattern: /^\+?[0-9\s\-\(\)]+$/,
                  message: "Noto'g'ri telefon raqam format!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Telefon raqam"
                style={{ height: "48px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="userType"
              rules={[
                {
                  required: true,
                  message: "Iltimos, foydalanuvchi turini tanlang!",
                },
              ]}
            >
              <Select
                placeholder="Foydalanuvchi turi"
                style={{ height: "48px", borderRadius: "8px" }}
              >
                <Option value="guest">Mehmon</Option>
                <Option value="business">Biznes mijoz</Option>
                <Option value="vip">VIP mijoz</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Iltimos, parol kiriting!" },
                {
                  min: 8,
                  message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak!",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Parol kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqam o'z ichiga olishi kerak!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Parol"
                style={{ height: "48px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Iltimos, parolni tasdiqlang!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Parollar mos kelmadi!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Parolni tasdiqlang"
                style={{ height: "48px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Iltimos, shartlarni qabul qiling!")
                        ),
                },
              ]}
            >
              <Checkbox>
                Men{" "}
                <Link href="/terms" style={{ color: "#1890ff" }}>
                  foydalanish shartlari
                </Link>{" "}
                va{" "}
                <Link href="/privacy" style={{ color: "#1890ff" }}>
                  maxfiylik siyosati
                </Link>
                ni qabul qilaman
              </Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="hotel-submit-btn"
              loading={loading}
            >
              Ro'yxatdan o'tish
            </Button>
          </Form.Item>
        </Form>

        <div className="hotel-divider">
          <span>yoki</span>
        </div>

        <div className="hotel-link">
          <span style={{ color: "#666" }}>Allaqachon hisobingiz bormi? </span>
          <Link href="/login">Tizimga kiring</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
