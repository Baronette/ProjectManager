using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.Data
{
    public class ProjectsRepository
    {
        private readonly string _connection;
        public ProjectsRepository(string connection)
        {
            _connection = connection;
        }

        public void AddProject(Project project)
        {
            using var context = new ProjectManagerContext(_connection);
            context.Projects.Add(project);
            context.SaveChanges();
        }

        public List<Project> GetAllProjects()
        {
            using var context = new ProjectManagerContext(_connection);
            return context.Projects.Where(p => !p.IsCompleted)
                .Include(p => p.User)
                .Include(p => p.Comments).ThenInclude(c => c.User)
                .OrderBy(p => p.Date).ToList();
        }
        public void MarkCompleted(Project project)
        {
            project.IsCompleted = true;
            using var context = new ProjectManagerContext(_connection);
            context.Projects.Update(project);
            context.SaveChanges();
        } 
        public void AssignProject(int projectId, int userId)
        {
            using var context = new ProjectManagerContext(_connection);
            context.Projects.FirstOrDefault(p => p.Id == projectId).UserId = userId;
            context.SaveChanges();
        }
        public Project GetById(int id)
        {
            using var context = new ProjectManagerContext(_connection);
            return context.Projects.FirstOrDefault(p => p.Id == id);
        }
        public List<Project> GetCompleted()
        {
            using var context = new ProjectManagerContext(_connection);
            return context.Projects.Where(p => p.IsCompleted).Include(p => p.User).ToList();
        }
        public Comment AddComment(Comment comment)
        {
            var context = new ProjectManagerContext(_connection);
            context.Comments.Add(comment);
            context.SaveChanges();
            return comment;
        }
        public List<User> GetUsers()
        {
            using var context = new ProjectManagerContext(_connection);
            return context.Users.ToList();
        }
    }
}
