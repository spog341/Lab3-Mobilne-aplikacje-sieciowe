import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import PostCard from "./components/PostCard";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.jsonplaceholder.dev/posts"
      );

      if (!response.ok) {
        throw new Error("Błąd pobierania danych z serwera.");
      }

      const data = await response.json();

      setPosts(data);
    } catch (err) {
      setError("Nie udało się połączyć z serwerem.");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!title.trim() || !body.trim() || !userId.trim()) {
      setSuccessMessage("");
      setError("Wszystkie pola formularza są wymagane.");
      return;
    }

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch(
        "https://api.jsonplaceholder.dev/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
            userId: Number(userId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Nie udało się zapisać posta.");
      }

      const data = await response.json();

      setServerResponse(data);
      setSuccessMessage("Post został dodany pomyślnie.");

      setTitle("");
      setBody("");
      setUserId("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Lab 3</Text>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Dodaj nowy post</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.bodyInput]}
            placeholder="Body"
            value={body}
            onChangeText={setBody}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="User ID"
            value={userId}
            onChangeText={setUserId}
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={createPost}>
            <Text style={styles.buttonText}>Wyślij</Text>
          </Pressable>

          {successMessage ? (
            <Text style={styles.success}>{successMessage}</Text>
          ) : null}

          {serverResponse ? (
            <Text style={styles.response}>
              Odpowiedź serwera: #{serverResponse.id}
            </Text>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Lista postów</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => <PostCard post={item} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  bodyInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  success: {
    color: "green",
    marginTop: 10,
    fontWeight: "700",
  },
  error: {
    color: "red",
    marginTop: 10,
    fontWeight: "700",
  },
  response: {
    marginTop: 6,
    color: "#374151",
  },
});