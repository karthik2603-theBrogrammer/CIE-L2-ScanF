import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { View, Text, Dimensions } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  Stack,
  Button,
  Box,
  Heading,
  FlatList,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from "native-base";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Loader from "./Loader";
const Payments = () => {
  const { email } = useSearchParams();
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState(null);
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const handleDataPointClick = (data) => {
    console.log(data.value);
  };
  useEffect(() => {
    console.log(email);

    const fetchDocumentsAndUser = () => {
      const myQueryParam = email;
      const myCollection = collection(db, "payments");
      const q = query(myCollection, where("email", "==", myQueryParam));
      const documentsData = [];
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          documentsData.push(doc.data());
          // setUser(null)
        });
        setPayments(documentsData);
      });

      const userCollection = collection(db, "users");

      // const myQueryParam = email;
      const userQuery = query(
        userCollection,
        where("email", "==", myQueryParam)
      );
      // console.log(getDocs(q));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          setUser(doc.data());
          // setUser(null)
        });
      });
    };
    fetchDocumentsAndUser();
  }, []);

  return (
    <View>
      {payments.length == 0 && user != null ? (
        <Loader />
      ) : (
        <View>
          <Box>
            <Heading fontSize="xl" pb="3">
              Track Your Payments, {email}, {user?.name}
            </Heading>
            <FlatList
              data={payments.sort(function (a, b) {
                return a.date - b.date;
              })}
              renderItem={({ item }) => (
                <Box
                  key={item.date}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  width={290}
                  borderColor="muted.800"
                  // pl={["0", "4"]}
                  // pr={["0", "5"]}
                  py="2"
                >
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <Avatar size="48px" />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.purpose}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {new Date(item.date).toLocaleDateString()}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {new Date(item.date).toLocaleTimeString()}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      {item.moneySpent}
                    </Text>
                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.date}
            />
          </Box>
          {/* <LineChart
            data={{
              labels: payments.map((item) =>
                new Date(item["date"]).toLocaleTimeString()
              ),
              datasets: [
                {
                  data: payments.map((item) => item["moneyLeft"]),
                },
              ],
            }}
            onDataPointClick={handleDataPointClick}
            width={Dimensions.get("window").width - 60} // from react-native
            height={300}
            yAxisLabel="Rs. "
            yAxisInterval={2} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#1a8cb8",
              backgroundGradientTo: "#1aa4b8",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          /> */}
        </View>
      )}
    </View>
  );
};

export default Payments;
