import { View, Text } from "react-native";
import { useSession } from "../Context/AuthContext";
import { router } from "expo-router";

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn();
          router.replace("/");
        }}
      >
        Signin
      </Text>
    </View>
  );
}
