
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';

interface ApplicationStatus {
  id: string;
  restaurantName: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  submittedDate: string;
  lastUpdate: string;
  steps: {
    name: string;
    completed: boolean;
    date?: string;
  }[];
}

export default function TrackingScreen() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');
  const [application, setApplication] = useState<ApplicationStatus | null>(null);

  // Mock data for demonstration
  const mockApplication: ApplicationStatus = {
    id: 'KD2024001',
    restaurantName: 'Sample Restaurant',
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
  };

  const handleTrack = () => {
    console.log('Tracking application:', trackingId);
    if (trackingId.trim()) {
      setApplication(mockApplication);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return colors.warning;
      case 'under_review':
        return colors.accent;
      case 'approved':
        return colors.success;
      case 'rejected':
        return colors.error;
      default:
        return colors.grey;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'under_review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const renderProgressBar = () => {
    const completedSteps = application?.steps.filter(step => step.completed).length || 0;
    const totalSteps = application?.steps.length || 0;
    const progress = (completedSteps / totalSteps) * 100;

    return (
      <View style={commonStyles.card}>
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Progress</Text>
        <View style={{
          height: 8,
          backgroundColor: colors.border,
          borderRadius: 4,
          marginBottom: 8,
        }}>
          <View style={{
            height: 8,
            backgroundColor: colors.primary,
            borderRadius: 4,
            width: `${progress}%`,
          }} />
        </View>
        <Text style={commonStyles.textSecondary}>
          {completedSteps} of {totalSteps} steps completed
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Icon name="arrow-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>Track Application</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Tracking Input */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
              Enter Your Tracking ID
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="e.g., KD2024001"
              value={trackingId}
              onChangeText={setTrackingId}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={commonStyles.button}
              onPress={handleTrack}
            >
              <Text style={commonStyles.buttonText}>Track Application</Text>
            </TouchableOpacity>
          </View>

          {/* Application Status */}
          {application && (
            <>
              <View style={commonStyles.section}>
                <View style={commonStyles.card}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={commonStyles.subtitle}>{application.restaurantName}</Text>
                    <View style={{
                      backgroundColor: getStatusColor(application.status),
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}>
                      <Text style={{ color: colors.background, fontSize: 12, fontWeight: '600' }}>
                        {getStatusText(application.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                    Application ID: {application.id}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                    Submitted: {application.submittedDate}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    Last Update: {application.lastUpdate}
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={commonStyles.section}>
                {renderProgressBar()}
              </View>

              {/* Steps */}
              <View style={commonStyles.section}>
                <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Application Steps</Text>
                {application.steps.map((step, index) => (
                  <View key={index} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}>
                    <View style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: step.completed ? colors.success : colors.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}>
                      {step.completed && (
                        <Icon name="checkmark-outline" size={16} color={colors.background} />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.text, {
                        fontWeight: step.completed ? '600' : '400',
                        color: step.completed ? colors.text : colors.textSecondary,
                      }]}>
                        {step.name}
                      </Text>
                      {step.date && (
                        <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                          {step.date}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Help Section */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Need Help?</Text>
              <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
                If you have any questions about your application status, feel free to contact our support team.
              </Text>
              <TouchableOpacity
                style={commonStyles.secondaryButton}
                onPress={() => router.push('/contact')}
              >
                <Text style={commonStyles.secondaryButtonText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
