import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

let database;

export async function init() {
  try {
    database = await SQLite.openDatabaseAsync("places.db");

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function insertPlace(place) {
  try {
    if (!database) {
      throw new Error("Database is not initialized. Call init() first.");
    }

    const statement = await database.prepareAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) 
       VALUES ($title, $imageUri, $address, $lat, $lng)`,
    );

    try {
      const result = await statement.executeAsync({
        $title: place.title,
        $imageUri: place.imageUri,
        $address: place.address,
        $lat: place.location.lat,
        $lng: place.location.lng,
      });

      return result;
    } finally {
      await statement.finalizeAsync();
    }
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}

export async function fetchPlaces() {
  try {
    if (!database) {
      throw new Error("Database is not initialized. Call init() first.");
    }

    const allPlaces = await database.getAllAsync("SELECT * FROM places");

    const places = allPlaces.map(
      (place) =>
        new Place(
          place.title,
          place.imageUri,
          { address: place.address, lat: place.lat, lng: place.lng },
          place.id, // id comes last as per the class constructor
        ),
    );

    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

export async function fetchPlaceDetails(id) {
  try {
    if (!database) {
      throw new Error("Database is not initialized. Call init() first.");
    }

    const targetPlace = await database.getFirstAsync(
      `SELECT * FROM places WHERE id = ?`,
      [id],
    );

    if (!targetPlace) {
      console.log(`No place found with id: ${id}`);
      return null;
    }

    const dbPlace = targetPlace;
    const place = new Place(
      dbPlace.title,
      dbPlace.imageUri,
      {
        lat: dbPlace.lat,
        lng: dbPlace.lng,
        address: dbPlace.address,
      },
      dbPlace.id,
    );
    return place;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
}
