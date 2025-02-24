import { useSession } from "@/src/Context/AuthContext";
import { Text, View } from "react-native";

export default function Home() {
  const { signOut } = useSession();
  return (
    <View>
      <Text>Welcome !!!</Text>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        Signout
      </Text>
    </View>
  );
}
