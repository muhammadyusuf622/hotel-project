"use client";

import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Bu yerda API chaqiruvini qo'shishingiz mumkin
      console.log("Login values:", values);
      message.success("Muvaffaqiyatli kirish!");
      // Router.push('/dashboard') - keyinroq qo'shishingiz mumkin
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
          <p>Xush kelibsiz! Iltimos, tizimga kiring</p>
        </div>

        <Form name="login" onFinish={onFinish} autoComplete="off" size="large">
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
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Email manzil"
                style={{ height: "48px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div className="hotel-form-item">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Iltimos, parolingizni kiriting!" },
                {
                  min: 6,
                  message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
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
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Meni eslab qol</Checkbox>
                </Form.Item>
                <Link href="/forgot-password" style={{ color: "#1890ff" }}>
                  Parolni unutdingizmi?
                </Link>
              </div>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="hotel-submit-btn"
              loading={loading}
            >
              Tizimga kirish
            </Button>
          </Form.Item>
        </Form>

        <div className="hotel-divider">
          <span>yoki</span>
        </div>

        <div className="hotel-link">
          <span style={{ color: "#666" }}>Hisobingiz yo'qmi? </span>
          <Link href="/register">Ro'yxatdan o'ting</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
