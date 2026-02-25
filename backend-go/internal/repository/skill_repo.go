package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type SkillRepository struct {
	collection *mongo.Collection
}

type SkillItem struct {
	Name        string `bson:"name"        json:"name"`
	Level       string `bson:"level"       json:"level,omitempty"`
	Icon        string `bson:"icon"        json:"icon,omitempty"`
	Description string `bson:"description" json:"description,omitempty"`
}

type SkillCategory struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Title string             `bson:"title"         json:"title"`
	Items []SkillItem        `bson:"items"         json:"items"`
}

func NewSkillRepository(db *mongo.Database) *SkillRepository {
	return &SkillRepository{
		collection: db.Collection("skillcategories"),
	}
}

func (r *SkillRepository) GetAll(ctx context.Context) ([]SkillCategory, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []SkillCategory
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

func (r *SkillRepository) Create(ctx context.Context, category SkillCategory) (*mongo.InsertOneResult, error) {
	return r.collection.InsertOne(ctx, category)
}

func (r *SkillRepository) Update(ctx context.Context, id primitive.ObjectID, category SkillCategory) error {
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": id}, category)
	return err
}

func (r *SkillRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}