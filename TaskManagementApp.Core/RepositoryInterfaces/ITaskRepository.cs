using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.DTO.DTOs;

namespace TaskManagementApp.Core.RepositoryInterfaces
{
    public interface ITaskRepository
    {
        Task<bool> CreateTask(UserTask task);
        Task<bool> ModifyTask(UserTaskDTO task);

        Task<bool> DeleteTask(UserTaskDTO task);

        UserTask GetTaskById(int id);

        List<UserTask> GetAllTasksByUserId(string userId);
    }
}
