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
        public async Task<bool> CreateTask(AddTaskRequest task)
        {
            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if(CurrentUserId == null) {
                return false;
            }

            UserTask userTask = new()
            { 
            Title = task.title,
            Description = task.description,
            IsCompleted = false,
            StartDate = DateTime.Now,
            DueDate = task.dueDate,
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

        public UserTaskDTO? GetTaskByIdAsync(int id)
        {
            var task = _taskRepository.GetTaskById(id);

            UserTaskDTO? userTask = (task == null) ? null : new UserTaskDTO
            {
                Description = task.Description,
                Title = task.Title,
                DueDate = task.DueDate,
                StartDate = DateTime.Now,
                IsCompleted = task.IsCompleted
            };


            return userTask;

        }

        public List<UserTaskDTO> GetAllUserTasks()
        {

            var CurrentUserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var tasks = _taskRepository.GetAllUserTasks(CurrentUserId);

            List<UserTaskDTO> result = new List<UserTaskDTO>();

            foreach (var task in tasks)
            {
                var userTask = new UserTaskDTO
                {
                    Description = task.Description,
                    Title = task.Title,
                    DueDate = task.DueDate,
                    StartDate = task.StartDate,
                    IsCompleted = task.IsCompleted,
                    TaskId = task.TaskId
                    
                };
                result.Add(userTask);
            }

            return result;
        }
    }
}
