using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisments_Users_UserId",
                table: "Advertisments");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisments_Vehicles_VehicleId",
                table: "Advertisments");

            migrationBuilder.DropColumn(
                name: "Owner",
                table: "Advertisments");

            migrationBuilder.AlterColumn<long>(
                name: "VehicleId",
                table: "Advertisments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Advertisments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisments_Users_UserId",
                table: "Advertisments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisments_Vehicles_VehicleId",
                table: "Advertisments",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "VehicleId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisments_Users_UserId",
                table: "Advertisments");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisments_Vehicles_VehicleId",
                table: "Advertisments");

            migrationBuilder.AlterColumn<long>(
                name: "VehicleId",
                table: "Advertisments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Advertisments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<string>(
                name: "Owner",
                table: "Advertisments",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisments_Users_UserId",
                table: "Advertisments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisments_Vehicles_VehicleId",
                table: "Advertisments",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "VehicleId");
        }
    }
}
