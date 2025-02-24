import { View } from "react-native";
import { useSession } from "../Context/AuthContext";
import { router } from "expo-router";
import { FAB, Input, Text } from "@rneui/themed";
import { useState } from "react";

export default function SignIn() {
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const { signIn } = useSession();

  const handleSignIn = () => {
    if (!firstName || !lastName) {
      return;
    }
    try {
      signIn(firstName, lastName);
      router.replace("/");
    } catch (error) {
      throw new Error("Unable to Sign In at this moment");
    }
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <Text>Your Legal Name</Text>
      <Text>
        We need to know a bit about you so that we can create your account.
      </Text>
      <Input placeholder="First Name" onChangeText={setFirstName} />
      <Input placeholder="Last Name" onChangeText={setLastName} />
      <FAB onPress={handleSignIn} />
    </View>
  );
}
