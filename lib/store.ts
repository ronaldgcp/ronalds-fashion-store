'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order, Address, ShippingMethod } from './types';
import { v4 as uuidv4 } from 'uuid';

// Cart Store
interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, selectedSize: size, selectedColor: color },
            ],
          };
        });
      },
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        }));
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getTotal: () => {
        return get().getSubtotal();
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Auth Store
interface AuthState {
  user: Omit<User, 'password'> | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateAddress: (address: Address) => void;
  addOrder: (order: Order) => void;
  getOrders: () => Order[];
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      login: async (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: async (email, password, name) => {
        const existingUser = get().users.find((u) => u.email === email);
        if (existingUser) {
          return false;
        }
        const newUser: User = {
          id: uuidv4(),
          email,
          password,
          name,
          orders: [],
          createdAt: new Date(),
        };
        set((state) => ({
          users: [...state.users, newUser],
        }));
        // Auto login after registration
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (data) => {
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, ...data };
          return {
            user: updatedUser,
            users: state.users.map((u) =>
              u.id === state.user?.id ? { ...u, ...data } : u
            ),
          };
        });
      },
      updateAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, address };
          return {
            user: updatedUser,
            users: state.users.map((u) =>
              u.id === state.user?.id ? { ...u, address } : u
            ),
          };
        });
      },
      addOrder: (order) => {
        set((state) => {
          if (!state.user) return state;
          const updatedOrders = [...(state.user.orders || []), order];
          return {
            user: { ...state.user, orders: updatedOrders },
            users: state.users.map((u) =>
              u.id === state.user?.id ? { ...u, orders: updatedOrders } : u
            ),
          };
        });
      },
      getOrders: () => {
        return get().user?.orders || [];
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Order Store
interface OrderState {
  currentOrder: Partial<Order> | null;
  shippingMethod: ShippingMethod | null;
  setShippingAddress: (address: Address) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  createOrder: (items: CartItem[], total: number, subtotal: number, shipping: number, tax: number) => Order;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>()((set, get) => ({
  currentOrder: null,
  shippingMethod: null,
  setShippingAddress: (address) => {
    set((state) => ({
      currentOrder: { ...state.currentOrder, shippingAddress: address },
    }));
  },
  setShippingMethod: (method) => {
    set((state) => ({
      shippingMethod: method,
      currentOrder: { ...state.currentOrder, shippingMethod: method },
    }));
  },
  createOrder: (items, total, subtotal, shipping, tax) => {
    const state = get();
    const order: Order = {
      id: uuidv4(),
      userId: useAuthStore.getState().user?.id || '',
      items,
      total,
      subtotal,
      shipping,
      tax,
      status: 'pending',
      shippingAddress: state.currentOrder?.shippingAddress || {} as Address,
      shippingMethod: state.shippingMethod || {} as ShippingMethod,
      paymentMethod: 'card',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return order;
  },
  clearCurrentOrder: () => {
    set({ currentOrder: null, shippingMethod: null });
  },
}));
