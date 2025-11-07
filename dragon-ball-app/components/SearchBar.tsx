import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch(text); // Envia el texto al componente padre
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar personaje..."
        value={query}
        onChangeText={handleChange}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
