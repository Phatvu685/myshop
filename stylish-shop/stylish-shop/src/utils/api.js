const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts() {
  try {
    const response = await fetch(API_BASE_URL + '/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function login(credentials) {
  try {
    const response = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(userData) {
  try {
    const response = await fetch(API_BASE_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function getCart() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(API_BASE_URL + '/cart', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { cart: [] };
  }
}

export async function getPromotions() {
  try {
    const response = await fetch(API_BASE_URL + '/promotion');
    if (!response.ok) {
      throw new Error('Failed to fetch promotions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return [];
  }
}
