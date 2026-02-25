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
	Repo 		*repository.ProjectRepository
	SkillRepo 	*repository.SkillRepository
	ExpRepo 	*repository.ExperienceRepository
}

func NewServer(
		repo 		*repository.ProjectRepository,
		skillRepo 	*repository.SkillRepository,
		expRepo 	*repository.ExperienceRepository,
	) *Server {
	return &Server{
		Repo: repo,
		SkillRepo: skillRepo,
		ExpRepo: expRepo,
	}
}

// GetProjects - Matches the operationId in yaml
func (s *Server) GetProjects(c *gin.Context) {
	dbProjects, err := s.Repo.GetAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}
	c.JSON(http.StatusOK, dbProjects)
}

// GetSkills - Matches the operationId in yaml
func (s *Server) GetSkills(c *gin.Context) {
	skills, err := s.SkillRepo.GetAll(c.Request.Context())
	if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch skills"})
			return
	}
	c.JSON(http.StatusOK, skills)
}

// GetExperience - Matches the operationId in yaml
func (s *Server) GetExperience(c *gin.Context) {
	experience, err := s.ExpRepo.GetAll(c.Request.Context())
	if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch experience"})
			return
	}
	c.JSON(http.StatusOK, experience)
}

// PostContact - Matches the operationId in yaml
func (s *Server) PostContact(c *gin.Context) {
	c.JSON(http.StatusCreated, MessageResponse{Message: "Success!"})
}