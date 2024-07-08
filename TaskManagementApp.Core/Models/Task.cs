using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.Core.Models
{
    public class UserTask
    {

        [Key]
        public int TaskId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime DueDate { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        public User User { get; set; }

    }
}
