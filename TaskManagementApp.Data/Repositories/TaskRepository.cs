using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Data.Context;
using TaskManagementApp.Core.RepositoryInterfaces;

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
    }
}
