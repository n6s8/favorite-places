import PlaceForm from "../components/Places/PlaceForm";

export default function AddPlaces({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
