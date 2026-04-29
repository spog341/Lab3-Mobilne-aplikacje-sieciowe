import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>ID: {post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  id: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  body: {
    color: "#374151",
  },
});