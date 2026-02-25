package api

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/Izenberk/Portfolio/internal/repository"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Server struct {
	Repo        *repository.ProjectRepository
	SkillRepo   *repository.SkillRepository
	ExpRepo     *repository.ExperienceRepository
	ContactRepo *repository.ContactRepository
}

func NewServer(
	repo *repository.ProjectRepository,
	skillRepo *repository.SkillRepository,
	expRepo *repository.ExperienceRepository,
	contactRepo *repository.ContactRepository,
) *Server {
	return &Server{
		Repo:        repo,
		SkillRepo:   skillRepo,
		ExpRepo:     expRepo,
		ContactRepo: contactRepo,
	}
}

// ─── Auth ───

func (s *Server) PostLogin(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	adminEmail := os.Getenv("ADMIN_EMAIL")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	if string(req.Email) != adminEmail || req.Password != adminPassword {
		c.JSON(http.StatusUnauthorized, MessageResponse{Message: "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": req.Email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	})

	secret := os.Getenv("JWT_SECRET")
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create token"})
		return
	}

	c.JSON(http.StatusOK, LoginResponse{Token: tokenString})
}

// ─── Contact ───

func (s *Server) PostContact(c *gin.Context) {
	var req ContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	msg := repository.ContactMessage{
		Name:    req.Name,
		Email:   string(req.Email),
		Message: req.Message,
	}
	if req.Subject != nil {
		msg.Subject = *req.Subject
	}

	_, err := s.ContactRepo.Create(c.Request.Context(), msg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save message"})
		return
	}

	c.JSON(http.StatusCreated, MessageResponse{Message: "Message received!"})
}

func (s *Server) GetContactMessages(c *gin.Context) {
	messages, err := s.ContactRepo.GetAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch messages"})
		return
	}
	c.JSON(http.StatusOK, messages)
}

// ─── Projects ───

func (s *Server) GetProjects(c *gin.Context) {
	dbProjects, err := s.Repo.GetAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}
	c.JSON(http.StatusOK, dbProjects)
}

func (s *Server) CreateProject(c *gin.Context) {
	var body bson.M
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	delete(body, "_id")
	delete(body, "id")

	result, err := s.Repo.Create(c.Request.Context(), body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	body["_id"] = result.InsertedID
	c.JSON(http.StatusCreated, body)
}

func (s *Server) UpdateProject(c *gin.Context, id IdParam) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var body bson.M
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	delete(body, "_id")
	delete(body, "id")

	if err := s.Repo.Update(c.Request.Context(), objID, body); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}

	body["_id"] = objID
	c.JSON(http.StatusOK, body)
}

func (s *Server) DeleteProject(c *gin.Context, id IdParam) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := s.Repo.Delete(c.Request.Context(), objID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.JSON(http.StatusOK, MessageResponse{Message: "Project deleted"})
}

// ─── Skills ───

func (s *Server) GetSkills(c *gin.Context) {
	skills, err := s.SkillRepo.GetAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch skills"})
		return
	}
	c.JSON(http.StatusOK, skills)
}

func (s *Server) CreateSkillCategory(c *gin.Context) {
	var category repository.SkillCategory
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	category.ID = primitive.NilObjectID
	result, err := s.SkillRepo.Create(c.Request.Context(), category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create skill category"})
		return
	}

	category.ID = result.InsertedID.(primitive.ObjectID)
	c.JSON(http.StatusCreated, category)
}

func (s *Server) UpdateSkillCategory(c *gin.Context, id IdParam) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var category repository.SkillCategory
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	category.ID = objID
	if err := s.SkillRepo.Update(c.Request.Context(), objID, category); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update skill category"})
		return
	}

	c.JSON(http.StatusOK, category)
}

func (s *Server) DeleteSkillCategory(c *gin.Context, id IdParam) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := s.SkillRepo.Delete(c.Request.Context(), objID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete skill category"})
		return
	}

	c.JSON(http.StatusOK, MessageResponse{Message: "Skill category deleted"})
}

// ─── Experience ───

func (s *Server) GetExperience(c *gin.Context) {
	experience, err := s.ExpRepo.GetAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch experience"})
		return
	}
	c.JSON(http.StatusOK, experience)
}

func (s *Server) CreateExperience(c *gin.Context) {
	var item repository.ExperienceItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	item.ID = primitive.NilObjectID
	result, err := s.ExpRepo.Create(c.Request.Context(), item)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create experience"})
		return
	}

	item.ID = result.InsertedID.(primitive.ObjectID)
	c.JSON(http.StatusCreated, item)
}

func (s *Server) UpdateExperience(c *gin.Context, id IdParam) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var item repository.ExperienceItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	item.ID = objID
	if err := s.ExpRepo.Update(c.Request.Context(), objID, item); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update experience"})
		return
	}

	c.JSON(http.StatusOK, item)
}

func (s *Server) DeleteExperience(c *gin.Context, id IdParam) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := s.ExpRepo.Delete(c.Request.Context(), objID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete experience"})
		return
	}

	c.JSON(http.StatusOK, MessageResponse{Message: "Experience deleted"})
}
