using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.DTO.DTOAttributes;

namespace TaskManagementApp.DTO.DTOs
{
    public class AddTaskRequest
    {
        [Required]
        public string title { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        [DateGreaterThanToday]
        public DateTime dueDate { get; set; }
    }
}
