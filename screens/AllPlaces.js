import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const place = await fetchPlaces();
      setLoadedPlaces(place);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
}
