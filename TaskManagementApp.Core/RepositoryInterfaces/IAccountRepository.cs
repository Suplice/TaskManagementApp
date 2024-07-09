using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;

namespace TaskManagementApp.Core.RepositoryInterfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> RegisterUserAsync(User user, string password);
        Task<SignInResult> SignInAsync(User user, string password);
        Task<User?> FindUserAsync(string Login);
    }
}
