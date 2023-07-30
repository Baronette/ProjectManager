using System.Linq;

namespace ProjectManager.Data
{
    public class AccountRepository
    {
        private readonly string _connection;

        public AccountRepository(string connection)
        {
            _connection = connection;
        }
        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new ProjectManagerContext(_connection);
            context.Users.Add(user);
            context.SaveChanges();
        }
        public User GetUser(string email)
        {
            using var context = new ProjectManagerContext(_connection);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
        public User Login(string email, string password)
        {
            var user = GetUser(email);
            if (user == null)
            {
                return null;
            }
            var isValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return isValid ? user : null;

        }
    }
}


