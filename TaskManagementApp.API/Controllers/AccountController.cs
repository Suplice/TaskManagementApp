using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.DTO.DTOs;

namespace TaskManagementApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAccountService _accountService;

        public AccountController(IAccountService accountService) {
            _accountService = accountService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerData)
        {
            if (!ModelState.IsValid) { 
                return BadRequest(ModelState);
            }

            var registerResult = await _accountService.RegisterUserAsync(registerData);

            if (!registerResult.Succeeded) {
                foreach (var error in registerResult.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }

            return Ok(new {Message = "User registered successfully"});
        }



        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> SignIn(SignInDTO signInData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var signInResult = await _accountService.SignInAsync(signInData);


            if (signInResult.Succeeded)
            {
                var user = await _accountService.FindUserAsync(signInData.Login);

                var userDTO = new UserDTO
                {
                    Login = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                };

                return Ok(userDTO);
            }

            return BadRequest("An error occured while trying to sign in");

        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> SignOut()
        {
            _accountService.SignOutAsync();
            return Ok("Signed out successfully");
        }

    }
}
