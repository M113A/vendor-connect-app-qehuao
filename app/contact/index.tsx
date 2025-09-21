
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';

export default function ContactScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const contactInfo = {
    phone: '+96893207302',
    email: 'mubasher.tariq@khedmahdelivery.com',
    address: 'Khedmah Delivery Headquarters',
  };

  const handleCall = () => {
    Linking.openURL(`tel:${contactInfo.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  const handleScheduleMeeting = () => {
    Alert.alert(
      'Schedule Meeting',
      'Our team will contact you within 24 hours to schedule a meeting at your convenience.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log('Meeting request submitted') },
      ]
    );
  };

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    console.log('Message sent:', { name, email, message });
    Alert.alert(
      'Message Sent!',
      'Thank you for your message. Our team will get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => {
        setName('');
        setEmail('');
        setMessage('');
      }}]
    );
  };

  const contactMethods = [
    {
      icon: 'call-outline',
      title: 'Phone Support',
      subtitle: contactInfo.phone,
      description: 'Call us for immediate assistance',
      action: handleCall,
      color: colors.success,
    },
    {
      icon: 'mail-outline',
      title: 'Email Support',
      subtitle: contactInfo.email,
      description: 'Send us an email for detailed inquiries',
      action: handleEmail,
      color: colors.accent,
    },
    {
      icon: 'calendar-outline',
      title: 'Schedule Meeting',
      subtitle: 'Book a consultation',
      description: 'Meet with our team to discuss your needs',
      action: handleScheduleMeeting,
      color: colors.primary,
    },
  ];

  const faqs = [
    {
      question: 'How long does the registration process take?',
      answer: 'Typically 3-5 business days from submission to approval.',
    },
    {
      question: 'What documents do I need?',
      answer: 'Business license, food safety certificate, and tax registration.',
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for Basic plan. Premium and Enterprise may have onboarding costs.',
    },
    {
      question: 'How do I receive payments?',
      answer: 'Weekly direct deposits to your registered bank account.',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Icon name="arrow-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>Contact Support</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Contact Methods */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Get in Touch</Text>
            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center' }]}
                onPress={method.action}
              >
                <View style={{
                  backgroundColor: method.color,
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Icon name={method.icon as any} size={24} color={colors.background} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                    {method.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { fontSize: 14, marginBottom: 2 }]}>
                    {method.subtitle}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                    {method.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Form */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Send us a Message</Text>
            <View style={commonStyles.card}>
              <TextInput
                style={commonStyles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
              />
              
              <TextInput
                style={commonStyles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={[commonStyles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Your message..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
              />
              
              <TouchableOpacity
                style={commonStyles.button}
                onPress={handleSendMessage}
              >
                <Text style={commonStyles.buttonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Frequently Asked Questions</Text>
            {faqs.map((faq, index) => (
              <View key={index} style={[commonStyles.card, { marginBottom: 12 }]}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                  {faq.question}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>

          {/* Office Hours */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Support Hours</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={commonStyles.text}>Monday - Friday</Text>
                <Text style={commonStyles.textSecondary}>9:00 AM - 6:00 PM</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={commonStyles.text}>Saturday</Text>
                <Text style={commonStyles.textSecondary}>10:00 AM - 4:00 PM</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={commonStyles.text}>Sunday</Text>
                <Text style={commonStyles.textSecondary}>Closed</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
