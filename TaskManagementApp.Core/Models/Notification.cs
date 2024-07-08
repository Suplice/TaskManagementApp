using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.Core.Models
{
    public class Notification
    {

        public int NotificationId { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        public DateTime SendDate { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }


    }
}
