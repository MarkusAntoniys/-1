import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AttentionScreen from '../screens/Attentionscreen';
import ProfileScreen from '../screens/Profilescreen';
import SettingsScreen from '../screens/Settingsscreen';
import AgreementScreen from '../screens/AgreementScreen';
import DisclaimerScreen from '../screens/DisclaimerScreen';
import { COLORS } from '../config/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.tabBar,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.gray,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTitleStyle: {
          color: COLORS.text,
        },
        headerTintColor: COLORS.text,
      }}
    >
      <Tab.Screen
        name="Внимание"
        component={AttentionScreen}
        options={{
          tabBarIcon: () => '👁️',
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => '👤',
        }}
      />
      <Tab.Screen
        name="Админ"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => '⚙️',
        }}
      />
      <Tab.Screen
        name="Соглашение"
        component={AgreementScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Disclaimer"
        component={DisclaimerScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
