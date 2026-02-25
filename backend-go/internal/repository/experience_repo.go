package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ExperienceItem struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Role        string             `bson:"role"          json:"role"`
	Company     string             `bson:"company"       json:"company"`
	URL         string             `bson:"url"           json:"url,omitempty"`
	Location    string             `bson:"location"      json:"location,omitempty"`
	Start       string             `bson:"start"         json:"start"`
	End         string             `bson:"end"           json:"end"`
	Description []string           `bson:"description"   json:"description"`
	Tags        []string           `bson:"tags"          json:"tags,omitempty"`
}

type ExperienceRepository struct {
	collection *mongo.Collection
}

func NewExperienceRepository(db *mongo.Database) *ExperienceRepository {
	return &ExperienceRepository{
		collection: db.Collection("experiences"),
	}
}

func (r *ExperienceRepository) GetAll(ctx context.Context) ([]ExperienceItem, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []ExperienceItem
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}
