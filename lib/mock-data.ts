export interface Property {
  id: string
  title: string
  titleAr: string
  price: string
  location: string
  locationAr: string
  area: string
  type: "apartment" | "villa" | "office" | "land"
  videoUrl: string
  thumbnail: string
  agent: {
    name: string
    nameAr: string
    avatar: string
  }
  description: string
  descriptionAr: string
  likes: number
  comments: number
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Appartement moderne à Casablanca",
    titleAr: "شقة حديثة في الدار البيضاء",
    price: "1 200 000 MAD",
    location: "Casablanca, Maarif",
    locationAr: "الدار البيضاء، المعاريف",
    area: "120 m²",
    type: "apartment",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/modern-apartment-exterior-casablanca.jpg",
    agent: {
      name: "Fatima Zahra",
      nameAr: "فاطمة الزهراء",
      avatar: "/professional-woman-realtor.jpg",
    },
    description: "Magnifique appartement avec vue sur mer, 3 chambres, cuisine équipée, parking.",
    descriptionAr: "شقة رائعة مع إطلالة على البحر، 3 غرف نوم، مطبخ مجهز، موقف سيارات.",
    likes: 234,
    comments: 45,
  },
  {
    id: "2",
    title: "Villa luxueuse à Marrakech",
    titleAr: "فيلا فاخرة في مراكش",
    price: "4 500 000 MAD",
    location: "Marrakech, Palmeraie",
    locationAr: "مراكش، النخيل",
    area: "350 m²",
    type: "villa",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "/luxury-villa-exterior-marrakech.jpg",
    agent: {
      name: "Youssef Alami",
      nameAr: "يوسف العلمي",
      avatar: "/professional-realtor.png",
    },
    description: "Villa de prestige avec piscine, jardin, 5 chambres, style marocain contemporain.",
    descriptionAr: "فيلا مرموقة مع مسبح، حديقة، 5 غرف نوم، طراز مغربي معاصر.",
    likes: 567,
    comments: 89,
  },
  {
    id: "3",
    title: "Bureau moderne à Rabat",
    titleAr: "مكتب حديث في الرباط",
    price: "2 800 000 MAD",
    location: "Rabat, Agdal",
    locationAr: "الرباط، أكدال",
    area: "200 m²",
    type: "office",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "/modern-office-exterior.jpg",
    agent: {
      name: "Amina Bennis",
      nameAr: "أمينة بنيس",
      avatar: "/professional-business-woman.png",
    },
    description: "Espace de bureau lumineux, climatisé, parking privé, idéal pour entreprise.",
    descriptionAr: "مساحة مكتبية مضيئة، مكيفة، موقف خاص، مثالية للشركات.",
    likes: 123,
    comments: 23,
  },
  {
    id: "4",
    title: "Terrain à Tanger",
    titleAr: "أرض في طنجة",
    price: "850 000 MAD",
    location: "Tanger, Zone Industrielle",
    locationAr: "طنجة، المنطقة الصناعية",
    area: "500 m²",
    type: "land",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "/empty-land-plot.png",
    agent: {
      name: "Karim Tazi",
      nameAr: "كريم التازي",
      avatar: "/professional-man-suit.png",
    },
    description: "Terrain constructible, bien situé, proche des commodités, titre foncier.",
    descriptionAr: "أرض قابلة للبناء، موقع جيد، قريبة من المرافق، سند ملكية.",
    likes: 89,
    comments: 12,
  },
  {
    id: "5",
    title: "Appartement avec terrasse à Agadir",
    titleAr: "شقة مع تراس في أكادير",
    price: "980 000 MAD",
    location: "Agadir, Front de Mer",
    locationAr: "أكادير، الواجهة البحرية",
    area: "95 m²",
    type: "apartment",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnail: "/apartment-balcony-ocean-view.jpg",
    agent: {
      name: "Salma Idrissi",
      nameAr: "سلمى الإدريسي",
      avatar: "/professional-woman-smiling.png",
    },
    description: "Appartement lumineux avec grande terrasse, vue océan, 2 chambres.",
    descriptionAr: "شقة مضيئة مع تراس كبير، إطلالة على المحيط، غرفتي نوم.",
    likes: 345,
    comments: 56,
  },
]
