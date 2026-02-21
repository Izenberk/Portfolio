package api

import (
	"net/http"
	"github.com/gin-gonic/gin"
	// Import your repository package - adjust path to match your new module name!
    "github.com/Izenberk/Portfolio/internal/repository"
)

// --- Tiny Helper to handle those pesky pointers ---
func ptr(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

type Server struct{
	Repo *repository.ProjectRepository
}

func NewServer(repo *repository.ProjectRepository) *Server {
	return &Server{
		Repo: repo,
	}
}

// GetProjects - Matches the operationId in yaml
func (s *Server) GetProjects(c *gin.Context) {
	mockProjects := []Project{
		{
			Id:      "1",
			Slug:    "go-portfolio",
			Title:   "Go Backend",
			Summary: "High-performance API built with Go and Gin",
			Stack:   []string{"Go", "MongoDB", "OpenAPI"},
			Links: struct {
				Demo *string `json:"demo,omitempty"`
				Repo *string `json:"repo,omitempty"`
			}{
				Demo: ptr("https://demo.com"), // Becomes *string
				Repo: ptr(""),                 // Becomes nil, field disappears!
			},
		},
	}
	c.JSON(http.StatusOK, mockProjects)
}

// GetExperience - Matches the operationId in yaml
func (s *Server) GetExperience(c *gin.Context) {
	c.JSON(http.StatusOK, []Experience{}) // Empty array for now
}

// GetSkills - Matches the operationId in yaml
func (s *Server) GetSkills(c *gin.Context) {
	c.JSON(http.StatusOK, []SkillCategory{}) // Empty array for now
}

// PostContact - Matches the operationId in yaml
func (s *Server) PostContact(c *gin.Context) {
	c.JSON(http.StatusCreated, MessageResponse{Message: "Success!"})
}