using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.DTO.DTOs;

namespace TaskManagementApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAccountService _userService;

        public AccountController(IAccountService userService) {
            _userService = userService;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerData)
        {
            if (!ModelState.IsValid) { 
                return BadRequest(ModelState);
            }

            var registerResult = await _userService.RegisterUserAsync(registerData);

            if (!registerResult.Succeeded) {
                foreach (var error in registerResult.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }

            return Ok(new {Message = "User registered successfully"});
        }
    }
}
