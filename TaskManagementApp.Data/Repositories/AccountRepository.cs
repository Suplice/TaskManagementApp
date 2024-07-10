using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.RepositoryInterfaces;
using TaskManagementApp.Data.Context;
using Microsoft.AspNetCore.Identity;


namespace TaskManagementApp.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountRepository(AppDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public Task<IdentityResult> RegisterUserAsync(User user, string password)
        {
            return _userManager.CreateAsync(user, password);
        }

        public Task<SignInResult> SignInAsync(User user, string password)
        {
            return _signInManager.PasswordSignInAsync(user, password, true, false);
        }

        public Task<User?> FindUserAsync(string username) { 
            return _signInManager.UserManager.FindByNameAsync(username);
        }

        public async void SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

    }
}
