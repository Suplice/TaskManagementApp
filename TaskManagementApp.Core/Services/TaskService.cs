using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using TaskManagementApp.Core.RepositoryInterfaces;
using TaskManagementApp.DTO.DTOs;


namespace TaskManagementApp.Core.Services
{
    public class TaskService : ITaskService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository, IHttpContextAccessor httpContextAccessor)
        {
            _taskRepository = taskRepository;
            _httpContextAccessor = httpContextAccessor;
        }   
        public async Task<UserTaskDTO> CreateTask(UserTaskDTO task)
        {
            var UserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            /*
             TODO: Przekształcenie DTO w model, przesłanie danych do repozytorium
             */
            return task;
        }
    }
}
