import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Stack, useRouter } from "expo-router";
import Payments from "../../components/Payments";
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
        <NativeBaseProvider className="h-[50px]">
          <View className="flex-1 p-8 min-h-screen flex items-center">
            <Payments/>
          </View>
        </NativeBaseProvider>
 </SafeAreaView>
  );
};

export default auth;
