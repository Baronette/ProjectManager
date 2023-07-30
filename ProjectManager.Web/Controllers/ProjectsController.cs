using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using ProjectManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly string _connection;
        private readonly IHubContext<ProjectsHub> _context;

        public ProjectsController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("ConStr");
        }
        //public ProjectsController(IHubContext<ProjectsHub> context)
        //{
        //    _context = context;
        //}

        [HttpGet]
        [Route("getcompleted")]
        public List<Project> GetCompleted()
        {
            var repo = new ProjectsRepository(_connection);
            return repo.GetCompleted();
        }
        [HttpGet]
        [Route("get/{id}")]
        public object Get(int id)
        {
            var repo = new ProjectsRepository(_connection);
            return repo.GetById(id).Comments;
        }
        [HttpPost]
        [Route("assignproject")]
        public void Assign(ProjectManagerViewModel vm)
        {
            var accntRepo = new AccountRepository(_connection);
            var user = accntRepo.GetUser(vm.Email);
                var repo = new ProjectsRepository(_connection);
            repo.AssignProject(vm.ProjectId, user.Id);
            //_context.Clients.All.SendAsync("projects", repo.GetAllProjects());
        }
    }
}
