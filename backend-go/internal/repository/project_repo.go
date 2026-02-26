package repository

import (
    "context"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type DBProject struct {
    ID      primitive.ObjectID  `bson:"_id,omitempty"`
    Title   string              `bson:"title"`
    Slug    string              `bson:"slug"`
    Summary string              `bson:"summary"`
    Stack   []string            `bson:"stack"`
}

type ProjectRepository struct {
    collection *mongo.Collection
}

func NewProjectRepository(db *mongo.Database) *ProjectRepository {
    return &ProjectRepository{
        collection: db.Collection("projects"),
    }
}

func (r *ProjectRepository) GetAll(ctx context.Context) ([]bson.M, error) {
    opts := options.Find().SetSort(bson.D{{Key: "order", Value: 1}})
    cursor, err := r.collection.Find(ctx, bson.M{}, opts)
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

func (r *ProjectRepository) Create(ctx context.Context, project bson.M) (*mongo.InsertOneResult, error) {
    return r.collection.InsertOne(ctx, project)
}

func (r *ProjectRepository) Update(ctx context.Context, id primitive.ObjectID, update bson.M) error {
    _, err := r.collection.ReplaceOne(ctx, bson.M{"_id": id}, update)
    return err
}

func (r *ProjectRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
    _, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
    return err
}

func (r *ProjectRepository) UpdateOrder(ctx context.Context, id primitive.ObjectID, order int) error {
    _, err := r.collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": bson.M{"order": order}})
    return err
}
