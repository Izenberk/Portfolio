package db

import (
    "context"
    "log"
    "os"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB must be Capitalized to be exported!
func ConnectDB() *mongo.Client {
    uri := os.Getenv("MONGODB_URI")
      if uri == "" {
          uri = "mongodb://localhost:27017"
      }

      clientOptions := options.Client().ApplyURI(uri)

    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    // Check the connection
    err = client.Ping(context.TODO(), nil)
    if err != nil {
        log.Fatal("Could not connect to MongoDB:", err)
    }

    log.Println("✅ Connected to MongoDB!")
    return client
}