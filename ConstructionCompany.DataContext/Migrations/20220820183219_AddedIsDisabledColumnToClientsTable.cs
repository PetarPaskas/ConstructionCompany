using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class AddedIsDisabledColumnToClientsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDisabled",
                table: "Clients",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDisabled",
                table: "Clients");
        }
    }
}
