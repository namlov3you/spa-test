export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  category: 'facial' | 'body' | 'relaxation' | 'special';
  badge?: string;
  highlights: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  saleLabel?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  volume: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  titleEn: string;
  experience: string;
  specialty: string;
  avatar: string;
}

export interface PriceCategory {
  categoryName: string;
  categoryIcon: string;
  description: string;
  items: {
    name: string;
    duration: string;
    price: string;
    popular?: boolean;
    description: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  date: string;
  time: string;
  expertId?: string;
  notes?: string;
}
