using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;

namespace TaskManagementApp.Core.Models
{

    public class User : IdentityUser
    {

        public List<Task> Tasks { get; set; }

        public List<Notification> Notifications { get; set; }



    }
}
