package repository

import (
    "context"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ProjectRepository struct {
    collection *mongo.Collection
}

func NewProjectRepository(db *mongo.Database) *ProjectRepository {
    return &ProjectRepository{
        collection: db.Collection("projects"),
    }
}

// Return a slice of maps or a simple local struct to avoid importing 'api'
func (r *ProjectRepository) GetAll(ctx context.Context) ([]bson.M, error) {
    cursor, err := r.collection.Find(ctx, bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(ctx)

    var projects []bson.M
    if err = cursor.All(ctx, &projects); err != nil {
        return nil, err
    }
    return projects, nil
}