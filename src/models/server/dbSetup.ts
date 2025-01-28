import { db } from "../name";
import createCollections from "../server/collections"

import { databases } from "./config";

export default async function getOrCreateDB(){
  try {
    await databases.get(db)
    console.log("Database connection")
  } catch (error) {
    try {
      await databases.create(db, "AW_CMS_Zustand")
      console.log("database created")
      //create collections
      await Promise.all([
        createCollections()
      ])
      console.log("Collection created")
      console.log("Database connected")
    } catch (error) {
      console.log("Error creating databases or collection", error)
    }
  }

  return databases
}