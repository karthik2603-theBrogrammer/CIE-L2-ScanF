import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button, NativeBaseProvider, useToast, Box } from "native-base";
import { app, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Stack, Input, Icon, MaterialIcons, Pressable } from "native-base";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";
const initialState = {
  email: "",
  password: "",
  name: "",
  money: 0,
};
const Auth = () => {
  const auth = getAuth();
  const toast = useToast();
  const [details, setDetails] = useState(initialState);
  const [login, setIsLogin] = useState(true);
  const router = useRouter();
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (!login) {
      console.log("ji");
      createUserWithEmailAndPassword(auth, details.email, details.password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.show({
            render: () => {
              return (
                <Box bg="blue.500" px="2" py="1" rounded="sm" mb={5}>
                  Success!
                </Box>
              );
            },
          });
          addDoc(collection(db, "users"), {
            ...details,
            email: details.email,
            password: details.password,
            name: details.name,
          });
        })
        .catch((error) => {
          // Handle errors here
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.show({
            render: () => {
              return (
                <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  {errorCode} {errorMessage}
                </Box>
              );
            },
          });
        });
    } else {
      signInWithEmailAndPassword(auth, details.email, details.password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.show({
            render: () => {
              return (
                <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Logged In Successfully
                </Box>
              );
            },
          });
          router.push(`individual/${details.email}`);
        })
        .catch((error) => {
          // Handle errors here
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.show({
            render: () => {
              return (
                <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  <Text>{errorCode}</Text>
                  <Text>{errorMessage}</Text>
                </Box>
              );
            },
          });
        });
    }

    console.log(details);
  };
  return (
    <View className="p-6 bg-white rounded-lg flex flex-col  justify-center w-[100vw] h-[80vh]">
      <View className="flex flex-col items-start justify-start">
        <Text className="text-5xl  pt-6 border-indigo-200 font-extrabold   ">
          Authentication Page
        </Text>
        <Text className="text-5xl pt-[6px] mt-[10px] border-b-[10px] border-indigo-200 font-extrabold  ">
          {login?'Login':'Signup'}
        </Text>
      </View>

      <View className=" flex items-center min-h-fit m-5">
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          textAlign="center"
          type="email"
          margin={1}
          className="px-1 m-1"
          placeholder="Enter Email"
          onChangeText={(text) => {
            setDetails({ ...details, email: text });
          }}
        />
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          className=" m-1"
          textAlign="center"
          margin={1}
          type="password"
          placeholder="Enter Password"
          onChangeText={(text) => {
            setDetails({ ...details, password: text });
          }}
        />
        {!login && (
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            textAlign="center"
            type="text"
            margin={1}
            className="px-1 m-1"
            placeholder="Enter Name"
            onChangeText={(text) => {
              setDetails({ ...details, name: text });
            }}
          />
        )}
      </View>
      {/*  */}
      <View className="h-[150px]">
        <NativeBaseProvider>
          <Button
            size="md"
            variant="subtle"
            onPress={handleSubmit}
            className="m-3 font-extrabold"
          >
            {login ? "Login" : "Sign Up"}
          </Button>
          <Button onPress={() => setIsLogin(!login)} className="m-1">
            <Text className="font-extrabold text-white">
              {login ? "Sign Up instead" : "Login Instead"}
            </Text>
          </Button>
        </NativeBaseProvider>
      </View>
    </View>
  );
};

export default Auth;
