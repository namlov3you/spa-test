import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  db,
  isFirebaseConfigured,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import {
  CORE_TREATMENTS,
  PRODUCTS_LIST,
  BLOG_POSTS,
} from '../../data/spaData';
import {
  ServiceItem,
  ProductItem,
  BlogPost,
  BookingFormData,
} from '../../types';

export interface BookingResponse {
  success: boolean;
  bookingId: string;
  bookingCode: string;
  message: string;
  data: BookingFormData & {
    id: string;
    bookingCode: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
  };
}

/**
 * Service Layer: Truy xuất danh sách dịch vụ Spa
 * Kết hợp Firestore & Fallback dữ liệu tĩnh bảo đảm uptime 100%
 */
export async function getServices(): Promise<ServiceItem[]> {
  const collectionPath = 'services';
  try {
    if (!isFirebaseConfigured()) {
      return CORE_TREATMENTS;
    }

    const servicesRef = collection(db, collectionPath);
    const q = query(servicesRef, orderBy('title', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return CORE_TREATMENTS;
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        duration: data.duration || '60 phút',
        price: data.price || '0đ',
        image: data.image || '',
        category: data.category || 'facial',
        badge: data.badge || undefined,
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
      } as ServiceItem;
    });
  } catch (error) {
    console.warn('[getServices] Warning: Failed to query Firestore, falling back to local dataset.', error);
    try {
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    } catch {
      // Fallback grace
      return CORE_TREATMENTS;
    }
  }
}

/**
 * Service Layer: Truy xuất danh sách sản phẩm mỹ phẩm
 */
export async function getProducts(): Promise<ProductItem[]> {
  const collectionPath = 'products';
  try {
    if (!isFirebaseConfigured()) {
      return PRODUCTS_LIST;
    }

    const productsRef = collection(db, collectionPath);
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      return PRODUCTS_LIST;
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        category: data.category || 'Dưỡng da',
        price: Number(data.price) || 0,
        originalPrice: Number(data.originalPrice) || Number(data.price) || 0,
        saleLabel: data.saleLabel || undefined,
        rating: Number(data.rating) || 5.0,
        reviewsCount: Number(data.reviewsCount) || 10,
        image: data.image || '',
        description: data.description || '',
        volume: data.volume || '50ml',
      } as ProductItem;
    });
  } catch (error) {
    console.warn('[getProducts] Warning: Failed to query Firestore, falling back to local dataset.', error);
    try {
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    } catch {
      return PRODUCTS_LIST;
    }
  }
}

/**
 * Service Layer: Truy xuất danh sách bài viết cẩm nang làm đẹp
 */
export async function getBlogs(): Promise<BlogPost[]> {
  const collectionPath = 'blogs';
  try {
    if (!isFirebaseConfigured()) {
      return BLOG_POSTS;
    }

    const blogsRef = collection(db, collectionPath);
    const q = query(blogsRef, limit(20));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return BLOG_POSTS;
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        slug: data.slug || doc.id,
        author: data.author || 'MONA Master',
        date: data.date || 'Gần đây',
        category: data.category || 'Cẩm nang',
        image: data.image || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        readTime: data.readTime || '5 phút đọc',
      } as BlogPost;
    });
  } catch (error) {
    console.warn('[getBlogs] Warning: Failed to query Firestore, falling back to local dataset.', error);
    try {
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    } catch {
      return BLOG_POSTS;
    }
  }
}

/**
 * Service Layer: Tạo đơn đặt lịch hẹn mới (Booking System)
 * Tích hợp sinh mã định danh, timestamp và xử lý lỗi
 */
export async function createBooking(formData: BookingFormData): Promise<BookingResponse> {
  const collectionPath = 'bookings';

  // 1. Validation cơ bản ở tầng Service
  if (!formData.fullName?.trim()) {
    throw new Error('Vui lòng nhập họ và tên khách hàng.');
  }
  if (!formData.phone?.trim()) {
    throw new Error('Vui lòng cung cấp số điện thoại liên hệ.');
  }
  if (!formData.date || !formData.time) {
    throw new Error('Vui lòng chọn ngày và giờ hẹn phù hợp.');
  }

  // Tạo mã đặt hẹn chuyên nghiệp (Ví dụ: MB-2609-XXXX)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingCode = `MB-${new Date().getFullYear().toString().slice(-2)}${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${randomSuffix}`;

  const bookingPayload = {
    ...formData,
    bookingCode,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  };

  try {
    let generatedId = `local-${Date.now()}`;

    if (isFirebaseConfigured()) {
      const bookingsRef = collection(db, collectionPath);
      const docRef = await addDoc(bookingsRef, {
        ...formData,
        bookingCode,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      generatedId = docRef.id;
    } else {
      // Lưu tạm vào LocalStorage để Admin Dashboard có thể xem ngay lập tức
      try {
        const stored = localStorage.getItem('mona_local_bookings') || '[]';
        const list = JSON.parse(stored);
        list.unshift({ ...bookingPayload, id: generatedId });
        localStorage.setItem('mona_local_bookings', JSON.stringify(list));
      } catch (err) {
        console.warn('LocalStorage save fallback:', err);
      }
    }

    return {
      success: true,
      bookingId: generatedId,
      bookingCode,
      message: 'Đặt lịch thành công! Chuyên viên Mona Beauty Blendz sẽ gọi điện xác nhận trong 15 phút.',
      data: {
        ...bookingPayload,
        id: generatedId,
      },
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
  }
}
