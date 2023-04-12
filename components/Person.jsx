import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { app, db } from "../firebaseConfig";
import { Stack, Input, Button, Modal, VStack, HStack } from "native-base";
import Loader from "./Loader";
import Card from "./Card";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "expo-router";

const Person = () => {
  const { email } = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [moneyAdded, setMoneyAdded] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [moneyChanged, setMoneyChanged] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [moneySpent, setMoneySpent] = useState(0);

  const myCollection = collection(db, "users");
  const paymentsCollection = collection(db, "payments");
  useEffect(() => {
    // console.log(email);
    const myQueryParam = email;
    const q = query(myCollection, where("email", "==", myQueryParam));
    // console.log(getDocs(q));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setUser(doc.data());
        // setUser(null)
      });
    });
  }, [moneyChanged]);
  const addMoney = async () => {

    console.log("Doing...");
    const spending = {
      purpose: purpose,
      moneySpent: moneySpent,
      date: Date.now(),
      action: 'Addition',
      moneyLeft: parseInt(user.money) + parseInt(moneySpent),
      email:user.email
    };
    const q = query(myCollection, where("email", "==", user.email));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      updateDoc(doc.ref, {
        ...user,
        money: parseInt(moneyAdded) + parseInt(user.money),
      });
    });
    console.log("Changed");
    setShowAddModal(false);
    setMoneyChanged(moneyChanged + 10);
  };
  const makePayment = async () => {
    const spending = {
      purpose: purpose,
      moneySpent: isNaN(moneyAdded) ? user.money: moneySpent,
      date: Date.now(),
      action: 'Deduction',
      moneyLeft: parseInt(user.money) - parseInt(moneySpent),
      email: user.email
    };
    console.log("Doing...");
    const q = query(myCollection, where("email", "==", user.email));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      updateDoc(doc.ref, {
        ...user,
        money: parseInt(user.money) - parseInt(moneySpent),
      });
    });
    console.log("Changed");
    setShowPayModal(false);
    setMoneyChanged(moneyChanged + 10);
    await addDoc(paymentsCollection, spending);
    console.log(spending)
  };
  return (
    <View>
      {user === null ? (
        <View>
          <Loader />
        </View>
      ) : (
        <View>
          <Card name={user.name} email={user.email} money={user.money} />
          <Text className="text-2xl pt-[6px] pb-[8px] border-b-[10px] border-indigo-200 font-extrabold ">
            Hey {user.name}! what would you like to do?
          </Text>
          <Stack
            margin={7}
            direction={{
              base: "row",
              md: "row",
            }}
            space={2}
            mx={{
              base: "auto",
              md: "0",
            }}
          >
            <Button
              size="sm"
              variant="solid"
              onPress={() => setShowAddModal(true)}
              
            >
              Add Money
            </Button>
            {/*  */}
            <Modal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              size="lg"
            >
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>Add Money</Modal.Header>
                <Modal.Body>
                  <VStack space={3}>
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      marginBottom={6}
                    >
                      <Text fontWeight="medium">Money Present</Text>
                      <Text color="blueGray.400">{user.money} Rs</Text>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text className="text-[18px]">
                        {" "}
                        How Much Would You Like To Add?
                      </Text>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Total Amount in Rs.</Text>
                      <Input
                        w={{
                          base: "50%",
                          md: "25%",
                        }}
                        textAlign="center"
                        type="number"
                        placeholder="Enter Money"
                        onChangeText={(money) => {
                          setMoneyAdded(money);
                        }}
                      />
                    </HStack>
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button flex="1" onPress={addMoney}>
                    Proceed
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            {/*  THIS IS FOR ALL THE PAYMENTS*/}
            <Button
              size="lg"
              variant="outline"
              colorScheme="green"
              color="amber.200"
              onPress={() => setShowPayModal(true)}
            >
              Make Payments
            </Button>
            <Modal
              isOpen={showPayModal}
              onClose={() => setShowPayModal(false)}
              size="lg"
            >
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>Pay For Something</Modal.Header>
                <Modal.Body>
                  <VStack space={3}>
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      marginBottom={6}
                    >
                      <Text fontWeight="medium">Money Present</Text>
                      <Text color="blueGray.400">{user.money} Rs</Text>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Purpose</Text>
                      <Input
                        w={{
                          base: "50%",
                          md: "25%",
                        }}
                        textAlign="center"
                        placeholder="Enter Spending"
                        onChangeText={(purpose) => {
                          setPurpose(purpose);
                        }}
                      />
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Total Amount in Rs.</Text>
                      <Input
                        w={{
                          base: "50%",
                          md: "25%",
                        }}
                        textAlign="center"
                        type="number"
                        placeholder="Enter Money"
                        onChangeText={(money) => {
                          setMoneySpent(money);
                        }}
                      />
                    </HStack>
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button flex="1" onPress={makePayment}>
                    Proceed
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Stack>
          <Stack
            margin={0}
            direction={{
              base: "row",
              md: "row",
            }}
            space={2}
            mx={{
              base: "auto",
              md: "0",
            }}
          >
            <Button
              size="sm"
              variant="solid"
              onPress={() => {
                router.push(`/track/${user.email}`)
              }}
            >
              Track Payments
            </Button>
          </Stack>
        </View>
      )}
    </View>
  );
};

export default Person;
