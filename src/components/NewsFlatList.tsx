import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Input } from "@rneui/themed";
import { News } from "../types/news";
import { fetchNewsAPI } from "../services/newsApi";
import { Link } from "expo-router";
import { ExternalLink } from "./ExternalLink";

const NewsFlatList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News[]>([]);

  const fetchNews = async () => {
    console.log(process.env.EXPO_API_BASE);
    try {
      const res = await fetchNewsAPI();
      setNews(res);
    } catch (error) {
      // TODO: Error handling
      console.log("🚀 ~ fetchNews ~ error:", error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, [isLoading]);

  const renderItem = ({ item }: { item: News }) => {
    const formattedDateTime = new Date(item.datetime);
    return (
      <View key={item.id} style={{ flexDirection: "row", gap: 4, padding: 16 }}>
        <Image
          source={{ uri: item.image }}
          //   style={{ width: 100, height: 100 }}
          //   resizeMode="contain"
          height={100}
          width={100}
          containerStyle={styles.item}
          //   PlaceholderContent={<ActivityIndicator />}
        />

        <ExternalLink href={item.url}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.label]}>{item.source}</Text>
            <Text style={[styles.label]}>
              {formattedDateTime.toISOString()}
            </Text>
          </View>
          <Text style={[styles.label]}>{item.headline}</Text>
        </ExternalLink>
      </View>
    );
  };
  return (
    <FlatList
      data={news}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10, gap: 16 }}
      ListEmptyComponent={
        <Button
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 300);
          }}
          loading={isLoading}
        >
          no Data
        </Button>
      }
      onEndReached={fetchNews}
      onEndReachedThreshold={0.6}
      refreshControl={<Text>Refreshing</Text>}
      refreshing={isLoading}
    />
  );
};

export default NewsFlatList;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#fff",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
});
