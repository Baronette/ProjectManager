using Microsoft.EntityFrameworkCore;

namespace ProjectManager.Data
{
    public class ProjectManagerContext : DbContext
    {
        private readonly string _connection;

        public ProjectManagerContext(string connection)
        {
            _connection = connection;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connection);
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments {get;set;}

    }

}
