import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import DashboardScreen from "../screens/DashboardScreen";
import ActivityScreen from "../screens/ActivityScreen";
import TradeScreen from "../screens/TradeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  BottomTabParamList,
  DashboardParamList,
  ActivityParamList,
  TradeParamList,
  SettingsParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-speedometer" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-pulse" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Trade"
        component={TradeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cash" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerTitle: "Dashboard" }}
      />
    </DashboardStack.Navigator>
  );
}

const ActivityStack = createStackNavigator<ActivityParamList>();

function ActivityNavigator() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{ headerTitle: "Account Activity" }}
      />
    </ActivityStack.Navigator>
  );
}

const TradeStack = createStackNavigator<TradeParamList>();

function TradeNavigator() {
  return (
    <TradeStack.Navigator>
      <TradeStack.Screen
        name="TradeScreen"
        component={TradeScreen}
        options={{ headerTitle: "Trading Bots" }}
      />
    </TradeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: "Settings" }}
      />
    </SettingsStack.Navigator>
  );
}
