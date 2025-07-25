import React from 'react';
import Icon from '@react-native-vector-icons/material-design-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import { IconName, TabName } from '../../infrastructure/interfaces/navigation';

const Tab = createBottomTabNavigator();

const tabBarIconConfig = (
  route: RouteProp<ParamListBase, string>,
  color: string,
  size: number,
) => {
  const icons: Record<TabName, IconName> = {
    Home: 'home',
    Search: 'magnify',
    Profile: 'account-outline',
    Add: 'plus-circle-outline',
    Reels: 'video-outline',
  };

  return <Icon name={icons[route.name as TabName]} size={size} color={color} />;
};

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => tabBarIconConfig(route, color, size),
        tabBarActiveTintColor: '#000',
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Probabilidad',
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Mapa',
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarLabel: 'aaaa',
        }}
      />
      <Tab.Screen
        name="Reels"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Mapa',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Mapa',
        }}
      />
    </Tab.Navigator>
  );
};
