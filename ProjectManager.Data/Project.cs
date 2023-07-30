using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ProjectManager.Data
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? UserId {get;set;}
        public User User { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime Date { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
