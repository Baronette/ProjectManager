using System;

namespace ProjectManager.Data
{

    //public class Proect
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //    public string Address { get; set; }
    //    public Cleaner Cleaner { get; set; }
    //    public DateTime Date { get; set; }
    //    public DateTime Time { get; set; }
    //    public Category Category { get; set; }

    //}
    public class Cleaner
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
   
    }
    public class Client
    {

    }

    public enum Category
    {
        House_Cleaning,
        Deep_Clean,
        Commercial,
        Move
    }


}
