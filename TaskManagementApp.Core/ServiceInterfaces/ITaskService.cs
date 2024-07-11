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

        Task<bool> ModifyTask(UserTaskDTO task);

        Task<bool> DeleteTask(UserTaskDTO task);

        UserTaskDTO? GetTaskByIdAsync(int id);
        
        List<UserTaskDTO> GetAllUserTasks();
    }
}
