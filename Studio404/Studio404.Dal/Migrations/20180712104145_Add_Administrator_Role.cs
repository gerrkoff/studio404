using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Studio404.Dal.Migrations
{
    public partial class Add_Administrator_Role : Migration
    {
		private const string ADMINISTRATOR_ID = "19e1efaa-75cf-446d-8ae6-4abedbcb0e1b";
		private const string TABLE_ROLES = "AspNetRoles";

		protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.InsertData(TABLE_ROLES,
				new[] { "Id", "Name", "NormalizedName" },
				new[] { ADMINISTRATOR_ID, Roles.ADMINISTRATOR_ROLE_NAME, Roles.ADMINISTRATOR_ROLE_NAME.ToUpper() });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.DeleteData(TABLE_ROLES, "Id", ADMINISTRATOR_ID);
		}
    }
}
