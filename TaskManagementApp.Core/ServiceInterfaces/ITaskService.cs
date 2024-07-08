using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.DTO.DTOs;
using System.Threading.Tasks;

namespace TaskManagementApp.Core.ServiceInterfaces
{
    public interface ITaskService
    {
        Task<bool> CreateTask(UserTaskDTO task);
        
    }
}
