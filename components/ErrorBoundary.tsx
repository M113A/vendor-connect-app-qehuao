
import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Icon name="alert-circle-outline" size={64} color={colors.error} style={{ marginBottom: 20 }} />
          <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
            Something went wrong
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 32 }]}>
            We&apos;re sorry, but something unexpected happened. Please try again.
          </Text>
          <TouchableOpacity
            style={commonStyles.button}
            onPress={this.handleRetry}
          >
            <Text style={commonStyles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
