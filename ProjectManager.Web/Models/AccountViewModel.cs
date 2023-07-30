using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManager.Data;

namespace ProjectManager.Web
{
    public class AccountViewModel : User
    {
        public string Password { get; set; }
    }
}
