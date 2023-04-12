import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Stack, useRouter } from "expo-router";
import Auth from "../components/Auth";
const auth = () => {
  return (
    <SafeAreaView className="flex-1 ">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => {
            <Text>Scanf</Text>;
          },
          headerTitle: "ScanF",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <NativeBaseProvider className="h-[50px]">
          <View className="flex-1 p-8 bg-white min-h-screen flex items-center justify-center overflow-hidden">
            <Auth />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default auth;
