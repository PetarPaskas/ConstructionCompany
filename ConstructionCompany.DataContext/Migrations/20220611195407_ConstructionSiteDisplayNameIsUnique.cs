using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class ConstructionSiteDisplayNameIsUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DisplayName",
                table: "ConstructionSites",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_ConstructionSites_DisplayName",
                table: "ConstructionSites",
                column: "DisplayName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_ConstructionSites_DisplayName",
                table: "ConstructionSites");

            migrationBuilder.AlterColumn<string>(
                name: "DisplayName",
                table: "ConstructionSites",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
