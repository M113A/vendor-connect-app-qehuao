
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateRegistrationForm = (data: {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  cuisine: string;
}): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!validateRequired(data.restaurantName)) {
    errors.restaurantName = 'Restaurant name is required';
  }

  if (!validateRequired(data.ownerName)) {
    errors.ownerName = 'Owner name is required';
  }

  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(data.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!validateRequired(data.address)) {
    errors.address = 'Address is required';
  }

  if (!validateRequired(data.cuisine)) {
    errors.cuisine = 'Cuisine type is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
