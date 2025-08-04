import { IRegisterFormValues } from '@/interface';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: Request){

  const userPath = path.join(process.cwd(), 'data', 'users.json');
  const json = await fs.readFile(userPath, 'utf8');

  const data = JSON.parse(json);

  return NextResponse.json({message: 'success', data: data});
}

export async function POST(request: Request) {

  const body: IRegisterFormValues = await request.json();

  const userPath = path.join(process.cwd(), "data", "users.json");
  const json = await fs.readFile(userPath, "utf8");
  const data = JSON.parse(json);

  const newUser = {
    id: data.length + 1,
    name: body.firstName + " " + body.lastName,
    email: body.email,
    password: body.password,
    phone: body.phone,
    userType: body.userType,
    role: "client",
    roomNumber: '',
  };

  data.push(newUser);

  await fs.writeFile(userPath, JSON.stringify(data, null, 2), 'utf8');

  return NextResponse.json({ message: "success", data: newUser });
}