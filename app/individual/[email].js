import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Stack, useRouter } from "expo-router";
import Person from "../../components/Person";
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
          <View className="flex-1 p-8 min-h-screen bg-white flex items-center  overflow-hidden">
            <Person />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default auth;
