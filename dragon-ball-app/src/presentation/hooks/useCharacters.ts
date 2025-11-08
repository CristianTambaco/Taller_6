import { useEffect, useState } from "react";
import { CharacterService } from "../../data/services/character.service";
import { Character } from "../../domain/models/Character.model";

/**
 * Hook personalizado para manejar la lista de personajes
 *
 * Responsabilidades:
 * - Obtener lista de personajes
 * - Manejar estados de carga
 * - Manejar errores
 * - Implementar paginación sin duplicados
 */
export const useCharacters = (initialPage: number = 1) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);

  /**
   * Función para cargar personajes
   */
  const fetchCharacters = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);

      

      const response = await CharacterService.getCharacters(pageNumber, 10);

      //  Eliminar duplicados por ID (usando Map)
      if (pageNumber === 1) {
        setCharacters(response.items);
      } else {
        setCharacters((prev) => {
          const map = new Map<number, Character>();
          [...prev, ...response.items].forEach((char) => map.set(char.id, char));
          return Array.from(map.values());
        });
      }

      // Verificar si hay más páginas disponibles
      setHasMore(response.meta.currentPage < response.meta.totalPages);
    } catch (err) {
      setError("Error al cargar personajes. Intenta nuevamente.");
      console.error(" Error en fetchCharacters:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar más personajes (siguiente página)
   */
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCharacters(nextPage);
    }
  };

  /**
   * Recargar personajes (pull to refresh)
   */
  const refresh = () => {
    setPage(1);
    fetchCharacters(1);
  };

  /**
   * Cargar personajes al montar el componente
   */
  useEffect(() => {
    fetchCharacters(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    characters,
    loading,
    error,
    loadMore,
    refresh,
    hasMore,
  };
};
