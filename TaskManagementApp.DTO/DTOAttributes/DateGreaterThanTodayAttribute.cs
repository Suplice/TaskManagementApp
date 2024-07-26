using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApp.DTO.DTOAttributes
{
    internal class DateGreaterThanTodayAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var currentValue = DateTime.SpecifyKind((DateTime)value, DateTimeKind.Utc);

            if (currentValue <= DateTime.UtcNow)
            {
                return new ValidationResult(ErrorMessage ?? "DueDate must be later than actual date");
            }

            return ValidationResult.Success;
        }
    }
}
