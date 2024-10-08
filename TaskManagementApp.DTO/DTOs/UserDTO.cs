﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.DTO.DTOs
{
    public class UserDTO
    {
        public string Login { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string PhoneNumber {  get; set; }
    }
}
