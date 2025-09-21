
import { Application, Package } from './types';

export const mockApplications: Application[] = [
  {
    id: 'KD2024001',
    restaurantId: 'rest_001',
    restaurantName: 'Bella Italia Restaurant',
    status: 'under_review',
    submittedDate: '2024-01-15',
    lastUpdate: '2024-01-18',
    steps: [
      { name: 'Application Submitted', completed: true, date: '2024-01-15' },
      { name: 'Document Verification', completed: true, date: '2024-01-16' },
      { name: 'Quality Review', completed: false },
      { name: 'Contract Preparation', completed: false },
      { name: 'Account Setup', completed: false },
    ],
  },
  {
    id: 'KD2024002',
    restaurantId: 'rest_002',
    restaurantName: 'Spice Garden',
    status: 'approved',
    submittedDate: '2024-01-10',
    lastUpdate: '2024-01-20',
    steps: [
      { name: 'Application Submitted', completed: true, date: '2024-01-10' },
      { name: 'Document Verification', completed: true, date: '2024-01-12' },
      { name: 'Quality Review', completed: true, date: '2024-01-15' },
      { name: 'Contract Preparation', completed: true, date: '2024-01-18' },
      { name: 'Account Setup', completed: true, date: '2024-01-20' },
    ],
  },
];

export const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 'Free',
    commission: '15%',
    description: 'Perfect for small restaurants getting started',
    features: [
      'Online ordering system',
      'Basic analytics dashboard',
      'Email customer support',
      'Standard delivery network',
      'Mobile app listing',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '$99/month',
    commission: '12%',
    popular: true,
    description: 'Ideal for growing restaurants',
    features: [
      'All Basic features',
      'Advanced analytics & insights',
      'Priority customer support',
      'Marketing tools & promotions',
      'Custom branding options',
      'Faster delivery priority',
      'Social media integration',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 'Custom pricing',
    commission: '10%',
    description: 'For large restaurant chains',
    features: [
      'All Premium features',
      'Dedicated account manager',
      'Custom API integrations',
      'White-label solution',
      'Advanced reporting suite',
      'Multi-location management',
      'Custom contract terms',
    ],
  },
];

export const platformBenefits = [
  {
    icon: 'people-outline',
    title: 'Reach More Customers',
    description: 'Access to thousands of hungry customers in your area',
    stats: '50K+ active users',
  },
  {
    icon: 'trending-up-outline',
    title: 'Increase Revenue',
    description: 'Boost your sales with our proven delivery platform',
    stats: 'Average 30% revenue increase',
  },
  {
    icon: 'phone-portrait-outline',
    title: 'Easy Management',
    description: 'Manage orders, menu, and analytics from one dashboard',
    stats: 'Save 5+ hours weekly',
  },
  {
    icon: 'flash-outline',
    title: 'Fast Delivery',
    description: 'Our efficient delivery network ensures quick service',
    stats: 'Average 25 min delivery',
  },
];

export const faqs = [
  {
    question: 'How long does the registration process take?',
    answer: 'Typically 3-5 business days from submission to approval, depending on document verification and quality review.',
  },
  {
    question: 'What documents do I need to register?',
    answer: 'You&apos;ll need a valid business license, food safety certificate, tax registration, and proof of address.',
  },
  {
    question: 'Are there any setup fees?',
    answer: 'No setup fees for the Basic plan. Premium and Enterprise plans may have onboarding costs depending on customization needs.',
  },
  {
    question: 'How do I receive payments?',
    answer: 'Payments are processed weekly via direct deposit to your registered bank account, minus our commission.',
  },
  {
    question: 'Can I change my package later?',
    answer: 'Yes, you can upgrade or downgrade your package at any time. Changes take effect at the next billing cycle.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'We currently operate in major cities and are expanding rapidly. Contact us to check availability in your area.',
  },
];
