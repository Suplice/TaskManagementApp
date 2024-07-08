﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.Core.Models
{
    public class Notification
    {
        [Key]
        public int NotificationId { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        public DateTime SendDate { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        public User User { get; set; }


    }
}
