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

        IAccountRepository _accountRepository;
        public AccountService(IAccountRepository accountRepository) {
        _accountRepository = accountRepository;
        }

        public async Task<User?> FindUserAsync(string Username) {
            return await _accountRepository.FindUserAsync(Username);
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDTO data)
        {
            User user = new User
            {
                Email = data.Email,
                UserName = data.Login,
                PhoneNumber = data.PhoneNumber,
            };

            return await _accountRepository.RegisterUserAsync(user, data.Password);  
        }

        public async Task<SignInResult> SignInAsync(SignInDTO signInData)
        {
            User? user = await FindUserAsync(signInData.Login);

            if (user == null) 
            {
                return SignInResult.Failed;
            }

            return await _accountRepository.SignInAsync(user, signInData.Password);

        }

        public void SignOutAsync()
        {
            _accountRepository.SignOutAsync();
        }
    }
}
