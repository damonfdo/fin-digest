import NewsFlatList from "@/src/components/NewsFlatList";
import { useSession } from "@/src/Context/AuthContext";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { signOut, session } = useSession();

  const firstName = session?.split("-")[0];

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Hey {firstName}</Text>
      <NewsFlatList />
      {/* TODO:: DELETE  */}
      <Text
        onPress={() => {
          signOut();
        }}
        style={[styles.title]}
      >
        Signout
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05021B",
  },
  title: {
    fontFamily: "Raleway",
    fontWeight: 900,
    fontSize: 32,
    lineHeight: 36,
    color: "#fff",
    marginTop: 60,
    paddingHorizontal: 16,
  },
});
