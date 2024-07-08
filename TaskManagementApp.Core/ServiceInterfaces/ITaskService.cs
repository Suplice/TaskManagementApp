using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.DTO.DTOs;

namespace TaskManagementApp.Core.ServiceInterfaces
{
    public interface ITaskService
    {
        Task<UserTaskDTO> CreateTask(UserTaskDTO task);
        
    }
}
