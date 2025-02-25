import { Alert, StyleSheet, View } from "react-native";
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
      router.replace("/notification");
    } catch (error) {
      throw new Error("Unable to Sign In at this moment");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 16, gap: 24 }}>
        <Text style={styles.title}>Your Legal Name</Text>
        <Text style={styles.desc}>
          We need to know a bit about you so that we can create your account.
        </Text>
        <Input
          placeholder="First Name"
          onChangeText={setFirstName}
          inputStyle={styles.input}
        />
        <Input
          placeholder="Last Name"
          onChangeText={setLastName}
          inputStyle={styles.input}
        />
      </View>
      <FAB
        onPress={handleSignIn}
        disabled={!firstName || !lastName}
        style={{ right: 0, position: "absolute", bottom: 15, margin: 10 }}
        buttonStyle={styles.fabBtn}
        disabledStyle={[styles.fabBtn, { opacity: 0.8 }]}
        title={">"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 80,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 38,
    color: "#171717",
  },
  desc: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    color: "#737373",
  },
  input: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 30,
    color: "#171717",
  },
  fabBtn: {
    height: 56,
    width: 56,
    backgroundColor: "#523AE4",
  },
});
