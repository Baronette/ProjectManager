using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ProjectManager.Data
{
    public class ProjectManagerContextFactory : IDesignTimeDbContextFactory<ProjectManagerContext>
    {
        public ProjectManagerContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
             .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ProjectManager.Web"))
            .AddJsonFile("appsettings.json")
            .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new ProjectManagerContext(config.GetConnectionString("ConStr"));
        }
    }
}
