import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "@rneui/themed";
import { News } from "../types/news";
import { fetchNewsAPI } from "../services/newsApi";
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
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          gap: 4,
          paddingHorizontal: 16,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="stretch"
          PlaceholderContent={<ActivityIndicator />}
        />

        <ExternalLink href={item.url}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.subText]}>{item.source}</Text>
              <Text style={[styles.subText]}>
                {formattedDateTime.toDateString()}
              </Text>
            </View>
            <Text style={[styles.label]}>{item.headline}</Text>
          </View>
        </ExternalLink>
      </View>
    );
  };
  return (
    <FlatList
      data={news}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 16 }}
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
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#ffffff",
  },
  subText: {
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: "#FFFFFFB2",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    aspectRatio: 1,
  },
});
