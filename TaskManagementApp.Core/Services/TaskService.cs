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
        public async Task<bool> CreateTask(UserTaskDTO task)
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if(CurrentUserId == null) {
                return false;
            }

            UserTask userTask = new()
            { 
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            StartDate = task.StartDate,
            DueDate = task.DueDate,
            UserId = CurrentUserId
            };


            var AddedTaskToDbResult = await _taskRepository.CreateTask(userTask);

            return AddedTaskToDbResult;

        }

        public async Task<bool> ModifyTask(UserTaskDTO task)
        {
            return await _taskRepository.ModifyTask(task);
        }


        public async Task<bool> DeleteTask(UserTaskDTO task)
        {
            return await _taskRepository.DeleteTask(task);
        }
    }
}
