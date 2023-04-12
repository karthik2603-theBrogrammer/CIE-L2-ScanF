import React from "react";
import { VStack, Center, Skeleton, HStack } from "native-base";
import { View,Text } from "react-native";
export default Loader = () => {
  return (
    <Center w="100%">
      <VStack
      h="95%"
        w="190%"
        maxW="500"
        borderWidth="1"
        space={9}
        rounded="md"
        alignItems="center"
        _dark={{
          borderColor: "coolGray.200",
        }}
        _light={{
          borderColor: "coolGray.300",
        }}
      >
        <Skeleton h="40" />
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.300"
          endColor="coolGray.100"
          size="50"
          rounded="full"
          mt="-70"
        />
        <HStack space="2">
          <Skeleton size="5" rounded="full" endColor="coolGray.200" />
          <Skeleton size="5" rounded="full" endColor="coolGray.200" />
          <Skeleton size="5" rounded="full" endColor="coolGray.200" />
          <Skeleton size="5" rounded="full" endColor="coolGray.200" />
          <Skeleton size="5" rounded="full" endColor="coolGray.200" />
        </HStack>
        <Skeleton.Text
          lines={3}
          alignItems="center"
          px="12"
          endColor="coolGray.400"
        />
        <Skeleton my="9" w="40" rounded="20" endColor="coolGray.300" />
        <Text>Make A Payment to see the same!</Text>
      </VStack>
    </Center>
  );
};
