package main

import (
	"context"
	"log"
	"time"

	"github.com/Izenberk/Portfolio/internal/api"
	"github.com/Izenberk/Portfolio/internal/db"
	"github.com/Izenberk/Portfolio/internal/repository"
	"github.com/gin-gonic/gin"
)

func main() {
    // 1. Connect to MongoDB
    client := db.ConnectDB()

    // 2. Setup a context for the database ping/timeout
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // Use the ctx to verify we can still talk to the DB
    err := client.Ping(ctx, nil)
    if err != nil {
        log.Fatalf("DB Ping failed: %v", err)
    }

    database := client.Database("portfolio_db")

    // 3. Initialize Repo and Server
    repo := repository.NewProjectRepository(database)
    server := api.NewServer(repo)

    r := gin.Default()
    api.RegisterHandlers(r, server)

    log.Println("🚀 Portfolio Server starting on http://localhost:8080")
    r.Run(":8080")
}