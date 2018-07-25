using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Studio404.Dal.Migrations
{
    public partial class Add_General_HourCost : Migration
    {
        private const string TABLE_HOUR_COSTS = "HourCosts";
        
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(TABLE_HOUR_COSTS,
                new[] { "Start", "End", "DayType", "Cost", "IsGeneral", "IsDeleted" },
                new object[] { 5, 23, 3, 100d, true, false });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(TABLE_HOUR_COSTS, "IsGeneral", true);
        }
    }
}
