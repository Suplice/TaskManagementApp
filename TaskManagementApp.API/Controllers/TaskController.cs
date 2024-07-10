using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.DTO.DTOs;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using TaskManagementApp.Core.ApiResponse;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace TaskManagementApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService) {
            _taskService = taskService;
        }


        private Dictionary<string, List<string>?> GetModelStateErrors(ModelStateDictionary modelState)
        {
            var errors = modelState.ToDictionary(
                k => k.Key,
                v => v.Value?.Errors.Select(e => e.ErrorMessage).ToList());

            return errors;
        }


        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> CreateTask(UserTaskDTO task)
        {
            if (!ModelState.IsValid)
            {
               var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<UserTaskDTO>(false, "ModelState is Invalid", task, errors);

                return BadRequest(response);
            }

            var addedTaskResult = await _taskService.CreateTask(task);

            if (addedTaskResult == false)
            {
                var response = new ApiResponse<UserTaskDTO>(false, "An error occured while trying to create task", task);
                return BadRequest(response);
            }
            
            var SuccessResponse = new ApiResponse<UserTaskDTO>(true, "Event was successfully added", task);

            return Ok(SuccessResponse);
        }

        [Authorize]
        [HttpPost("update")]
        public async Task<IActionResult> ModifyTask(UserTaskDTO task)
        {
            if (!ModelState.IsValid)
            {
                var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<UserTaskDTO>(false, "Model state is invalid", task, errors);

                return BadRequest(response);
            }

            var modifyTaskResult = await _taskService.ModifyTask(task);

            if (modifyTaskResult == false) {

                var response = new ApiResponse<UserTaskDTO>(false, "An error occured while trying to modify task", task);

                return BadRequest(response);
            }

            var successResponse = new ApiResponse<UserTaskDTO>(true, "Task was successfully modified", task);

            return Ok(successResponse);
        }


        public async Task<IActionResult> DeleteTask(UserTaskDTO task)
        {
            if (!ModelState.IsValid)
            {
                var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<UserTaskDTO>(false, "ModelState is invalid", task, errors);

                return BadRequest(response);
            }

            var deleteTaskResult = await _taskService.DeleteTask(task);

            if (deleteTaskResult == false)
            {
                var response = new ApiResponse<UserTaskDTO>(false, "deleting task has failed", task);
                return BadRequest(response);
            }

            var successResponse = new ApiResponse<UserTaskDTO>(true, "deleting task was successful", task);
            return Ok(successResponse);
             

        }

    }
}
