import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Progress, Button } from "native-base";
import { useRouter } from "expo-router";
import hand from "../assets/hand.png";
import icon from "../assets/icon.png";

team = [
  {
    fullName: "Krish Shah",
    name: "Krish",
    position: "CTO",
    imageSrc: "",
  },
  {
    fullName: "Karthik Namboori",
    name: "Karthik",
    position: "CTO",
    imageSrc: "",
  },
  {
    fullName: "Sharath Vishwanath",
    name: "Sharath",
    position: "CTO",
    imageSrc: "",
  },
  {
    fullName: "Rashi Bandi",
    name: "Rashi",
    position: "CTO",
    imageSrc: "",
  },
  {
    fullName: "Pranav TP",
    name: "Pranav",
    position: "CTO",
    imageSrc: "",
  },
  {
    fullName: "Bhargav P",
    name: "Bhargav",
    position: "CTO",
    imageSrc: "",
  },
];

const WelcomeComponent = () => {
  const router = useRouter();
  const [intro, SetIntro] = useState(true);
  return (
    <View className="flex items-center justify-center">
      <View className="rounded-md w-[300px] flex flex-row justify-center items-center">
        {intro && (
          <Image
            source={icon}
            alt="NA"
            className="h-[60px] w-[60px] m-3 mb-7"
          />
        )}
        <View className="bg-transparent text-5xl font-extrabold   text-left ">
          {intro ? (
              <View className="flex flex-col items-start justify-start">
                <Text className = 'text-5xl  '>Welcome To</Text>
                <Text className = 'text-6xl h-[80px] pt-[3px] border-b-[10px] border-indigo-200 font-extrabold  '>ScanF</Text>
              </View>
            
          ) : (
            <View className="flex flex-col items-start justify-start">
                <Text className = 'text-6xl h-[50px] pt-[3px]  border-indigo-200 font-extrabold   '>Meet The</Text>
                <Text className = 'text-6xl h-[80px] pt-[6px] mt-[10px] border-b-[10px] border-indigo-200 font-extrabold  '>Team</Text>
              </View>
          )}
        </View>
      </View>
      {!intro && (
        <View className=" p-5 m-5 rounded-md h-[50vh]">
          
        </View>
      )}
      {intro && (
        <View className="min-h-fit  my-7 rounded-md">
          <Image
            source={hand}
            alt="NA"
            className="h-[400px] w-[100vw] object-contain"
          />
        </View>
      )}

      <View className="w-full h-1">
        <Progress size="md" mb={4} value={intro ? 50 : 100} />
      </View>
      <View>
        <Button
          size="sm"
          variant="subtle"
          color="green.300"
          className="mt-9 text-green"
          onPress={() => {
            SetIntro(!intro);
          }}
        >
          {intro ? (
            <Text className="font-extrabold">Next</Text>
          ) : (
            <Text className="font-extrabold">Previous</Text>
          )}
        </Button>
        {!intro && (
          <TouchableOpacity
            onPress={() => {
              router.push("/auth");
            }}
          >
            {/* <Text className="bg-white p-3 m-3 rounded-md ">Next</Text> */}
          </TouchableOpacity>
        )}
        {!intro && (
          <Button
            size="sm"
            variant="solid"
            className="mt-2"
            onPress={() => {
              router.push("/auth");
            }}
          >
            <Text className="text-white font-bold">Proceed</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default WelcomeComponent;
