using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Data.Context;
using TaskManagementApp.Core.RepositoryInterfaces;
using TaskManagementApp.DTO.DTOs;
using Microsoft.EntityFrameworkCore;

namespace TaskManagementApp.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _appDbContext;
        public TaskRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<bool> CreateTask(UserTask task)
        {
            try
            {
                await _appDbContext.Tasks.AddAsync(task);
                await _appDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> ModifyTask(UserTaskDTO task)
        {
            UserTask? userTask = await _appDbContext.Tasks.FindAsync(task.TaskId);

            if (userTask == null) {
                return false;
            }

            userTask.Title = task.Title;
            userTask.IsCompleted = task.IsCompleted;
            userTask.Description = task.Description;
            userTask.DueDate = task.DueDate;
            userTask.StartDate = task.StartDate;


            _appDbContext.Tasks.Update(userTask);
            await _appDbContext.SaveChangesAsync();


            return true;
        }


        public async Task<bool> DeleteTask(UserTaskDTO task)
        {
           var result = await _appDbContext.Tasks.Where(t => t.TaskId == task.TaskId).ExecuteDeleteAsync();
            if (result > 0)
                return true;
            return false;
        }

        public UserTask? GetTaskById(int id)
        {
            UserTask? task = _appDbContext.Tasks.FirstOrDefault(t => t.TaskId == id);

            return task;
        }

        public List<UserTask> GetAllUserTasks(string userId)
        {
            List<UserTask> tasks = _appDbContext.Tasks.Where(t => t.UserId == userId).ToList();

            return tasks;
        }


    }
}
