using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;

namespace TaskManagementApp.Core.Models
{

    public class User : IdentityUser
    {

        public ICollection<UserTask>? Tasks { get; set; }

        public ICollection<Notification>? Notifications { get; set; }

    }
}
