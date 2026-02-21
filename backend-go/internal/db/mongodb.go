package db

import (
    "context"
    "log"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB must be Capitalized to be exported!
func ConnectDB() *mongo.Client {
    // Replace with your actual Mongo URI (e.g., "mongodb://localhost:27017")
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

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