package main

import (
	"context"
	"log"
	"time"

	"github.com/Izenberk/Portfolio/internal/api"
	"github.com/Izenberk/Portfolio/internal/db"
	"github.com/Izenberk/Portfolio/internal/repository"
	"github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    _ = godotenv.Load()

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

    database := client.Database("portfolio")

    // 3. Initialize Repo and Server
    repo := repository.NewProjectRepository(database)
    skillRepo := repository.NewSkillRepository(database)
    expRepo := repository.NewExperienceRepository(database)
    server := api.NewServer(repo, skillRepo, expRepo)

    r := gin.Default()
    // --- 1. PLUG IN CORS MIDDLEWARE HERE ---
    r.Use(func(c *gin.Context) {
        // In dev, you can use "*" to allow everything,
        // but localhost:3000 is safer and more professional!
        c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") 
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    })

    // --- 2. REGISTER HANDLERS ---
    api.RegisterHandlers(r, server)

    log.Println("🚀 Portfolio Server starting on http://localhost:8080")
    r.Run(":8080")
}