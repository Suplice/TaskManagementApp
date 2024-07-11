using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.DTO.DTOs
{
    public class RegisterDTO
    {
        [StringLength(15, ErrorMessage = "Login cannot be longer than 15 characters")]
        public string Login {  get; set; }

        [PasswordPropertyText]
        public string Password { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }


    }
}
