using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.RepositoryInterfaces;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.DTO.DTOs;

namespace TaskManagementApp.Core.Services
{
    public class AccountService : IAccountService
    {

        IAccountRepository _userRepository;
        public AccountService(IAccountRepository userRepository) {
        _userRepository = userRepository;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDTO data)
        {
            User user = new User
            {
                Email = data.Email,
                UserName = data.Login,
                PhoneNumber = data.PhoneNumber,
            };

            return await _userRepository.RegisterUserAsync(user, data.Password);  
        }
    }
}
