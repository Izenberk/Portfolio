package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	Order       int                `bson:"order"         json:"order"`
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
	opts := options.Find().SetSort(bson.D{{Key: "order", Value: 1}})
	cursor, err := r.collection.Find(ctx, bson.M{}, opts)
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

func (r *ExperienceRepository) Create(ctx context.Context, item ExperienceItem) (*mongo.InsertOneResult, error) {
	return r.collection.InsertOne(ctx, item)
}

func (r *ExperienceRepository) Update(ctx context.Context, id primitive.ObjectID, item ExperienceItem) error {
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": id}, item)
	return err
}

func (r *ExperienceRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *ExperienceRepository) UpdateOrder(ctx context.Context, id primitive.ObjectID, order int) error {
	_, err := r.collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": bson.M{"order": order}})
	return err
}
