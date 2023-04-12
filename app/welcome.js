import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import WelcomeComponent from "../components/WelcomeComponent";
import { NativeBaseProvider } from "native-base";
import Header from "../components/Header";
export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 ">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => {
            <Header/>
            // <Image source={icon} alt='NA' className = 'h-[60px] w-[60px] m-3 mb-7' />;
          },
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <NativeBaseProvider>
          <View className="flex-1 p-8 bg-white h-[92vh] overflow-hidden ">
            <WelcomeComponent />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
}
