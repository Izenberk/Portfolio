package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ContactMessage struct {
	ID      primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Name    string             `bson:"name"          json:"name"`
	Email   string             `bson:"email"         json:"email"`
	Subject string             `bson:"subject"       json:"subject,omitempty"`
	Message string             `bson:"message"       json:"message"`
}

type ContactRepository struct {
	collection *mongo.Collection
}

func NewContactRepository(db *mongo.Database) *ContactRepository {
	return &ContactRepository{
		collection: db.Collection("contacts"),
	}
}

func (r *ContactRepository) GetAll(ctx context.Context) ([]ContactMessage, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []ContactMessage
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

func (r *ContactRepository) Create(ctx context.Context, msg ContactMessage) (*mongo.InsertOneResult, error) {
	return r.collection.InsertOne(ctx, msg)
}
