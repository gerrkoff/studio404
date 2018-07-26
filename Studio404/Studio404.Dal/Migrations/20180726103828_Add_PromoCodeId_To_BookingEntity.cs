using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Studio404.Dal.Migrations
{
    public partial class Add_PromoCodeId_To_BookingEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PromoCodeId",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_PromoCodes_PromoCodeId",
                table: "Bookings",
                column: "PromoCodeId",
                principalTable: "PromoCodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_PromoCodes_PromoCodeId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "PromoCodeId",
                table: "Bookings");
        }
    }
}
