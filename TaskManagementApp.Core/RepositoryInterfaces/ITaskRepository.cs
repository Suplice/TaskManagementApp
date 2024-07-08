using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;

namespace TaskManagementApp.Core.RepositoryInterfaces
{
    public interface ITaskRepository
    {
        Task<UserTask> CreateTask(UserTask task); 
    }
}
