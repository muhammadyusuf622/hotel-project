export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface RoomCleaning {
  id: number;
  roomNumber: string;
  status: "pending" | "in-progress" | "completed";
  scheduledTime: string;
  notes: string;
}

export interface ChatMessage {
  id: number;
  sender: "user" | "admin";
  message: string;
  timestamp: Date;
  type: "complaint" | "question" | "general";
}

export interface NotificationItem {
  id: string;
  type: "cleaning" | "food" | "general";
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

export interface RoomStatusData {
  roomNumber: string;
  status: "available" | "occupied" | "cleaning" | "maintenance";
  cleaningTime?: string;
  nextCleaning?: string;
  occupancy: number;
  maxOccupancy: number;
}

export interface HotelAmenity {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  rating: number;
  price?: string;
}

export const foodMenu: FoodItem[] = [
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
      "https://www.allrecipes.com/thmb/SI6dn__pfJb9G5eBpYAqkyGCLxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50050-five-minute-ice-cream-DDMFS-4x3-076-fbf49ca6248e4dceb3f43a4f02823dd9.jpg",
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

export const hotelAmenities: HotelAmenity[] = [
  {
    id: 1,
    name: "Premium Restaurant",
    description: "5 yulduzli restoran - dunyo standartlariga mos",
    image:
      "https://www.architectandinteriorsindia.com/cloud/2021/11/15/Dubai_Marina_Restaurant_19.jpg",
    icon: "🍽️",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Sport Zali",
    description: "Zamonaviy jihozlangan sport zali",
    image:
      "https://housing.com/news/wp-content/uploads/2022/11/GYM-INTERIORS-FEATURE-compressed.jpg",
    icon: "🏆",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Hovuz va Sauna",
    description: "Infinity hovuz va fin sauna",
    image:
      "https://bookmestatic.net.nz/bookme-product-images/products/6391/6391_image1_RCHR_Pool_BookMe2.jpg",
    icon: "🔥",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Spa va Massaj",
    description: "Professional spa xizmatlari",
    image:
      "https://img.grouponcdn.com/iam/3YvWGFGyhvk5FKjkkTiEcBNv6RyE/3Y-2048x1229/v1/t2001x1212.webp",
    icon: "👑",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Konferens Zali",
    description: "Biznes uchrashuvlari uchun",
    image:
      "https://adenhotel.by/upload/resize_cache/iblock/f9a/1200_500_2/3s3u24j6h2zlsok0nmnqpkdgr6m3pq34.jpg",
    icon: "🛡️",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Bar va Lounge",
    description: "Premium ichimliklar va muzika",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/a6/70/7b/interior-of-rt60.jpg?w=900&h=500&s=1",
    icon: "☕",
    rating: 4.8,
  },
];

export const quickComplaints = [
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

export const roomStatusData: RoomStatusData[] = [
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
