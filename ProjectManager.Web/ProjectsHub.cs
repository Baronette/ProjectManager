using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ProjectManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ProjectManager.Web
{
    public class ProjectsHub : Hub
    {
        private readonly string _connection;

        public ProjectsHub(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("ConStr");
        }
        public void NewProject(Project project)
        {
            var repo = new ProjectsRepository(_connection);
            repo.AddProject(project);
            Clients.All.SendAsync("new-project", project);
        }
        public void MarkCompleted(Project project)
        {
            var repo = new ProjectsRepository(_connection);
            repo.MarkCompleted(project);
            Clients.All.SendAsync("projects", repo.GetAllProjects());
        }
        public void OnLogin()
        {
            var repo = new ProjectsRepository(_connection);
            Clients.Caller.SendAsync("projects", repo.GetAllProjects());
            Clients.Caller.SendAsync("Users", repo.GetUsers());
        }

        public void AssignProject(ProjectManagerViewModel vm)
        {
            var accntRepo = new AccountRepository(_connection);
            var user = accntRepo.GetUser(vm.Email);
            var repo = new ProjectsRepository(_connection);
            repo.AssignProject(vm.ProjectId, user.Id);
            Clients.All.SendAsync("projects", repo.GetAllProjects());           
        }
        public void AddComment(Comment comment)
        {
            var acctRepo = new AccountRepository(_connection);
            var user = acctRepo.GetUser(Context.User.Identity.Name);
            comment.UserId = user.Id;
            var repo = new ProjectsRepository(_connection);
            var newComment = repo.AddComment(comment);
            newComment.User = user;
            Clients.All.SendAsync("comment", newComment);

        }

        //private List<Object> GetAll()
        //{
        //    var repo = new ProjectsRepository(_connection);
        //    return repo.GetAllProjects().Select(p => new
        //    {
        //        Title = p.Title,
        //        Date = p.Date,
        //        Priority = p.Priority,
        //        UserId = p.UserId,
        //        User = p.User != null ? $"{p.User.FirstName} {p.User.LastName}" : null

        //    });

    }
}
