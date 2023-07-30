using System.Text.Json.Serialization;

namespace ProjectManager.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
