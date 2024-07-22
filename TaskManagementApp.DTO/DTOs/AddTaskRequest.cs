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
        [Required(ErrorMessage = "Title field is required")]
        public string title { get; set; }

        [Required(ErrorMessage = "Description field is required")]
        public string description { get; set; }

        [Required(ErrorMessage ="End Date field is required")]
        [DateGreaterThanToday]
        public DateTime dueDate { get; set; }
    }
}
