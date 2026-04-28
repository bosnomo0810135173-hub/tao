// ===== Restaurant Data =====
const restaurants = [
  {
    id: 1,
    name: "ครัวบ้านย่า",
    category: "อาหารจานเดียว",
    type: "ร้านดัง",
    tags: ["อาหารไทย", "ผัดไทย", "ร้านดัง"],
    image: "images/restaurant-1.png",
    rating: 4.8,
    reviewCount: 324,
    priceRange: "฿฿",
    priceAvg: "80-150 บาท",
    location: "ถ.ข้าวสาร, กรุงเทพฯ",
    hours: "10:00 - 22:00",
    phone: "02-123-4567",
    description: "ร้านอาหารไทยแท้ สูตรคุณย่า รสชาติจัดจ้าน ถูกปากคนไทย เปิดมานานกว่า 30 ปี การันตีความอร่อยด้วยรีวิวจากนักชิมทั่วประเทศ",
    menu: [
      { name: "ผัดไทยกุ้งสด", price: "120 บาท" },
      { name: "ต้มยำกุ้งน้ำข้น", price: "150 บาท" },
      { name: "ส้มตำปูปลาร้า", price: "80 บาท" },
      { name: "แกงเขียวหวานไก่", price: "100 บาท" },
      { name: "ข้าวผัดปู", price: "130 บาท" },
      { name: "ไข่เจียวปู", price: "90 บาท" }
    ],
    reviews: [
      { name: "สมชาย", avatar: "ส", rating: 5, date: "15 เม.ย. 2569", text: "อร่อมมากครับ ผัดไทยรสชาติถูกปาก เส้นไม่เละ กุ้งตัวใหญ่ น้ำจิ้มเด็ดมาก!" },
      { name: "วิภา", avatar: "ว", rating: 5, date: "10 เม.ย. 2569", text: "ต้มยำกุ้งเข้มข้นมาก เผ็ดร้อนถูกใจ ราคาไม่แพง บรรยากาศร้านดี" },
      { name: "ธนา", avatar: "ธ", rating: 4, date: "5 เม.ย. 2569", text: "อาหารอร่อย แต่ต้องรอนานหน่อยช่วงพีค แนะนำมาวันธรรมดา" }
    ]
  },
  {
    id: 2,
    name: "Slow Bar Cafe",
    category: "คาเฟ่",
    type: "ร้านลับ",
    tags: ["คาเฟ่", "กาแฟ", "ร้านลับ"],
    image: "images/restaurant-2.png",
    rating: 4.6,
    reviewCount: 189,
    priceRange: "฿฿",
    priceAvg: "100-200 บาท",
    location: "ซ.อารีย์, กรุงเทพฯ",
    hours: "08:00 - 20:00",
    phone: "02-234-5678",
    description: "คาเฟ่สไตล์มินิมอล ซ่อนตัวในซอยอารีย์ บรรยากาศเงียบสงบ เหมาะกับการทำงานและพักผ่อน กาแฟคั่วเองจากเมล็ดพันธุ์พิเศษ",
    menu: [
      { name: "Espresso", price: "80 บาท" },
      { name: "Latte Art", price: "120 บาท" },
      { name: "Matcha Latte", price: "130 บาท" },
      { name: "Croissant", price: "90 บาท" },
      { name: "Cheesecake", price: "150 บาท" },
      { name: "Acai Bowl", price: "180 บาท" }
    ],
    reviews: [
      { name: "มินนี่", avatar: "ม", rating: 5, date: "12 เม.ย. 2569", text: "กาแฟหอมมาก บรรยากาศดี ที่นั่งสบาย มี WiFi แรง เหมาะทำงาน" },
      { name: "เจมส์", avatar: "จ", rating: 4, date: "8 เม.ย. 2569", text: "Matcha Latte ดีมาก ไม่หวานเกินไป ร้านน่ารัก ถ่ายรูปสวย" }
    ]
  },
  {
    id: 3,
    name: "มารุเมน ราเมน",
    category: "อาหารจานเดียว",
    type: "ร้านดัง",
    tags: ["ราเมน", "อาหารญี่ปุ่น", "ร้านดัง"],
    image: "images/restaurant-3.png",
    rating: 4.7,
    reviewCount: 456,
    priceRange: "฿฿฿",
    priceAvg: "200-350 บาท",
    location: "ทองหล่อ, กรุงเทพฯ",
    hours: "11:00 - 21:30",
    phone: "02-345-6789",
    description: "ราเมนสไตล์ญี่ปุ่นแท้ น้ำซุปเคี่ยวนาน 18 ชั่วโมง เส้นทำสดทุกวัน ชาชูหมูนุ่มละลายในปาก คิวยาวทุกวันแต่คุ้มค่าการรอ",
    menu: [
      { name: "Tonkotsu Ramen", price: "250 บาท" },
      { name: "Miso Ramen", price: "230 บาท" },
      { name: "Shoyu Ramen", price: "220 บาท" },
      { name: "Gyoza (6 ชิ้น)", price: "120 บาท" },
      { name: "Karaage", price: "150 บาท" },
      { name: "Chashu Don", price: "200 บาท" }
    ],
    reviews: [
      { name: "อาร์ม", avatar: "อ", rating: 5, date: "14 เม.ย. 2569", text: "น้ำซุปเข้มข้นมากก ชาชูนุ่ม ไข่ออนเซ็นสุกพอดี ร้านนี้คือที่สุดของราเมน!" },
      { name: "นุช", avatar: "น", rating: 5, date: "11 เม.ย. 2569", text: "รอคิว 30 นาทีแต่คุ้มมาก เส้นเหนียวนุ่ม น้ำซุปหอมกลมกล่อม" },
      { name: "ต้น", avatar: "ต", rating: 4, date: "6 เม.ย. 2569", text: "อร่อยเหมือนกินที่ญี่ปุ่นเลย ราคาค่อนข้างสูงแต่คุณภาพคุ้ม" }
    ]
  },
  {
    id: 4,
    name: "บ้านขนมหวาน",
    category: "ของหวาน",
    type: "ร้านดัง",
    tags: ["ของหวาน", "ขนมไทย", "ร้านดัง"],
    image: "images/restaurant-4.png",
    rating: 4.9,
    reviewCount: 512,
    priceRange: "฿",
    priceAvg: "40-100 บาท",
    location: "เยาวราช, กรุงเทพฯ",
    hours: "09:00 - 19:00",
    phone: "02-456-7890",
    description: "ร้านขนมไทยโบราณ สูตรดั้งเดิมส่งต่อมา 3 รุ่น ข้าวเหนียวมะม่วงหอมหวาน ขนมชั้น ทองหยอด ทองหยิบ ทุกอย่างทำสดใหม่ทุกวัน",
    menu: [
      { name: "ข้าวเหนียวมะม่วง", price: "80 บาท" },
      { name: "ขนมชั้น", price: "40 บาท" },
      { name: "ทองหยอด", price: "60 บาท" },
      { name: "บัวลอยไข่หวาน", price: "50 บาท" },
      { name: "กล้วยบวชชี", price: "45 บาท" },
      { name: "ไอศกรีมกะทิ", price: "70 บาท" }
    ],
    reviews: [
      { name: "แพร", avatar: "แ", rating: 5, date: "13 เม.ย. 2569", text: "ข้าวเหนียวมะม่วงที่นี่อร่อยที่สุดในกรุงเทพ! มะม่วงหวานฉ่ำ ข้าวเหนียวนุ่มหอม" },
      { name: "กิ๊ฟ", avatar: "ก", rating: 5, date: "9 เม.ย. 2569", text: "ทองหยอดหอมมาก ละลายในปาก ร้านสะอาด พี่เจ้าของน่ารัก" }
    ]
  },
  {
    id: 5,
    name: "โคขุนหมักไฟ",
    category: "บุฟเฟ่ต์",
    type: "ร้านดัง",
    tags: ["ปิ้งย่าง", "บุฟเฟ่ต์", "เนื้อย่าง"],
    image: "images/restaurant-5.png",
    rating: 4.5,
    reviewCount: 278,
    priceRange: "฿฿฿",
    priceAvg: "399-599 บาท",
    location: "รัชดา, กรุงเทพฯ",
    hours: "16:00 - 23:00",
    phone: "02-567-8901",
    description: "บุฟเฟ่ต์ปิ้งย่างพรีเมียม เนื้อวัวนำเข้าจากออสเตรเลียและญี่ปุ่น หมักสูตรพิเศษ ทานได้ไม่อั้น พร้อมซีฟู้ดสดๆ และเครื่องเคียงกว่า 50 ชนิด",
    menu: [
      { name: "บุฟเฟ่ต์ปกติ", price: "399 บาท" },
      { name: "บุฟเฟ่ต์พรีเมียม", price: "599 บาท" },
      { name: "เนื้อวากิว (เสริม)", price: "250 บาท" },
      { name: "ชุดซีฟู้ด", price: "199 บาท" },
      { name: "เครื่องดื่มไม่อั้น", price: "99 บาท" }
    ],
    reviews: [
      { name: "บอส", avatar: "บ", rating: 5, date: "14 เม.ย. 2569", text: "เนื้อคุณภาพดีมาก หมักมาพอดี นุ่มทุกชิ้น ทานคุ้มแน่นอน!" },
      { name: "ปุ้ย", avatar: "ป", rating: 4, date: "7 เม.ย. 2569", text: "บรรยากาศดี ที่นั่งกว้าง เนื้อสดมาก แต่วันเสาร์คนเยอะต้องจองล่วงหน้า" }
    ]
  },
  {
    id: 6,
    name: "แกงป้าศรี",
    category: "อาหารจานเดียว",
    type: "ราคาประหยัด",
    tags: ["อาหารไทย", "ข้าวแกง", "ราคาประหยัด"],
    image: "images/restaurant-6.png",
    rating: 4.4,
    reviewCount: 198,
    priceRange: "฿",
    priceAvg: "35-60 บาท",
    location: "ลาดพร้าว, กรุงเทพฯ",
    hours: "06:30 - 14:00",
    phone: "089-123-4567",
    description: "ร้านข้าวแกงเจ้าเก่า เปิดมากว่า 20 ปี แกงกะทิเข้มข้น ราคาเริ่มต้นแค่ 35 บาท อิ่มอร่อยไม่ต้องควักกระเป๋าหนัก เมนูหมุนเวียนทุกวัน",
    menu: [
      { name: "ข้าวราดแกง 1 อย่าง", price: "35 บาท" },
      { name: "ข้าวราดแกง 2 อย่าง", price: "45 บาท" },
      { name: "ข้าวราดแกง 3 อย่าง", price: "55 บาท" },
      { name: "แกงเขียวหวาน", price: "40 บาท" },
      { name: "แกงส้มชะอม", price: "40 บาท" },
      { name: "ผัดกะเพราหมูกรอบ", price: "50 บาท" }
    ],
    reviews: [
      { name: "แบงค์", avatar: "แ", rating: 5, date: "15 เม.ย. 2569", text: "ถูกและอร่อยมาก! แกงเขียวหวานเข้มข้น เนื้อเยอะ คุ้มค่าสุดๆ" },
      { name: "ฝน", avatar: "ฝ", rating: 4, date: "10 เม.ย. 2569", text: "ราคาถูกมาก อาหารรสชาติดี ต้องมาเช้า เพราะหมดเร็ว" }
    ]
  }
];

// Category definitions
const categories = [
  { id: "all", name: "ทั้งหมด", icon: "🍽️", count: restaurants.length },
  { id: "อาหารจานเดียว", name: "อาหารจานเดียว", icon: "🍛", count: restaurants.filter(r => r.category === "อาหารจานเดียว").length },
  { id: "ของหวาน", name: "ของหวาน", icon: "🍰", count: restaurants.filter(r => r.category === "ของหวาน").length },
  { id: "คาเฟ่", name: "คาเฟ่", icon: "☕", count: restaurants.filter(r => r.category === "คาเฟ่").length },
  { id: "บุฟเฟ่ต์", name: "บุฟเฟ่ต์", icon: "🥩", count: restaurants.filter(r => r.category === "บุฟเฟ่ต์").length },
  { id: "อาหารญี่ปุ่น", name: "อาหารญี่ปุ่น", icon: "🍜", count: restaurants.filter(r => r.tags.includes("อาหารญี่ปุ่น")).length },
];

const typeFilters = [
  { id: "all", name: "ทั้งหมด" },
  { id: "ร้านดัง", name: "🔥 ร้านดัง" },
  { id: "ร้านลับ", name: "🤫 ร้านลับ" },
  { id: "ราคาประหยัด", name: "💰 ราคาประหยัด" },
];
