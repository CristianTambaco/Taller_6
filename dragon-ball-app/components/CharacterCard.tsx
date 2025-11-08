import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Character } from "../src/domain/models/Character.model";
import { globalStyles } from "../src/presentation/styles/globalStyles";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <TouchableOpacity
      style={globalStyles.characterCard}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: character.image }}
        style={globalStyles.characterImage}
        contentFit="contain"
        transition={300}
      />

      <View style={globalStyles.characterInfo}>
        {/* Nombre */}
        <Text style={globalStyles.characterName} numberOfLines={1}>
          {character.name}
        </Text>

        {/* Raza y género */}
        <Text style={globalStyles.characterRace}>
          {character.race} • {character.gender}
        </Text>

        {/* Ki actual y máximo */}
        <Text style={globalStyles.characterKi}>
          ⚡ Ki: {character.ki} / {character.maxKi}
        </Text>

        {/* Afiliación */}
        <Text style={globalStyles.characterAffiliation}>
          🛡️ Afiliación: {character.affiliation}
        </Text>

        {/* Transformaciones */}
        {character.transformations?.length > 0 && (
          <Text style={globalStyles.characterTransformations}>
            🔄 Transformaciones: {character.transformations.length}
          </Text>
        )}

        {/* Descripción (solo una línea resumida) */}
        {character.description && (
          <Text
            style={globalStyles.characterDescription}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {character.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
