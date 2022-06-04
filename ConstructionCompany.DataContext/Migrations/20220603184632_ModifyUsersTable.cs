using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class ModifyUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConstructionSiteId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ConstructionSiteId",
                table: "Users",
                column: "ConstructionSiteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ConstructionSites_ConstructionSiteId",
                table: "Users",
                column: "ConstructionSiteId",
                principalTable: "ConstructionSites",
                principalColumn: "ConstructionSiteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_ConstructionSites_ConstructionSiteId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ConstructionSiteId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ConstructionSiteId",
                table: "Users");
        }
    }
}
