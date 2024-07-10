using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.DTO.DTOs;

namespace TaskManagementApp.Core.ServiceInterfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterUserAsync(RegisterDTO registerData);
        Task<SignInResult> SignInAsync(SignInDTO signInData);
        Task<User?> FindUserAsync(string username);

        void SignOutAsync();
    }
}
