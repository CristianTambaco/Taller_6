import React, { useState, useMemo } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { ErrorState } from "../../components/ErrorState";
import { LoadingState } from "../../components/LoadingState";
import { CharacterCard } from "../../components/CharacterCard";
import { SearchBar } from "../../components/SearchBar";
import { useCharacters } from "../../src/presentation/hooks/useCharacters";
import { Character } from "../../src/domain/models/Character.model";
import { globalStyles } from "../../src/presentation/styles/globalStyles";

/**
 * Pantalla de personajes con búsqueda y paginación
 */
export default function CharactersScreen() {
  const { characters, loading, error, loadMore, refresh } = useCharacters();
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Filtrar personajes localmente
  const filteredCharacters = useMemo(() => {
    return characters.filter((char) =>
      char.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [characters, searchQuery]);

  if (loading && characters.length === 0) {
    return <LoadingState message="Cargando personajes..." />;
  }

  if (error && characters.length === 0) {
    return <ErrorState message={error} />;
  }

  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard character={item} />
  );

  return (
    <View style={globalStyles.container}>
      {/* 🔍 Campo de búsqueda */}
      <SearchBar onSearch={setSearchQuery} />

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        contentContainerStyle={globalStyles.listContent}
      />
    </View>
  );
}
