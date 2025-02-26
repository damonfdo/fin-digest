import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Image } from "@rneui/themed";
import { News } from "../types/news";
import { fetchNewsAPI } from "../services/newsApi";
import { ExternalLink } from "./ExternalLink";

const NewsFlatList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News[]>([]);
  const [errror, setError] = useState<string | null>(
    "Something went wrong. Please try again later"
  );

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetchNewsAPI();
      setNews(res);
    } catch (error) {
      setError("Something went wrong. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  const renderItem = ({ item }: { item: News }) => {
    const formattedDateTime = new Date(item.datetime);
    return (
      <ExternalLink href={item.url}>
        <View key={item.id} style={styles.itemContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="stretch"
            PlaceholderContent={<ActivityIndicator />}
          />

          <View style={styles.itemWrapper}>
            <View style={styles.subTextRow}>
              <Text style={[styles.subText]}>{item.source}</Text>
              <Text style={[styles.subText]}>
                {formattedDateTime.toDateString()}
              </Text>
            </View>
            <Text style={[styles.label]}>{item.headline}</Text>
          </View>
        </View>
      </ExternalLink>
    );
  };
  return (
    <FlatList
      data={news}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10, gap: 16 }}
      ListEmptyComponent={
        errror ? (
          <Text style={[styles.errorLabel]}>{errror}</Text>
        ) : (
          <Text style={styles.subText}>No Data available</Text>
        )
      }
      onEndReached={fetchNews}
      onEndReachedThreshold={0.6}
      refreshControl={<Text style={styles.subText}>Refreshing</Text>}
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
    color: "#FFFFFF",
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
  itemContainer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  itemWrapper: { flexDirection: "column", gap: 8, flex: 1 },
  subTextRow: { flexDirection: "row", justifyContent: "space-between" },
  errorLabel: {
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#FFFFFF",
  },
});
