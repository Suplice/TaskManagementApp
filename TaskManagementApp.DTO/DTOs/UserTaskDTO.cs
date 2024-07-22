using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using TaskManagementApp.DTO.DTOAttributes;

namespace TaskManagementApp.DTO.DTOs
{
    public class UserTaskDTO
    {
        public int TaskId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
    }
}
