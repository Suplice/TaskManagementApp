using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.DTO.DTOs
{
    public class SignInDTO
    {
        [Required]
        public string Login { get; set; }

        [PasswordPropertyText]
        [Required]
        public string Password { get; set; }
    }
}
