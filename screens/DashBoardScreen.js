import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "../Navigation/DrawerNavigation";

export default function DashboardScreen() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}