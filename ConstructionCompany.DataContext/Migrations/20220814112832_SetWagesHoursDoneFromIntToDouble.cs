using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class SetWagesHoursDoneFromIntToDouble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "HoursDone",
                table: "Wages",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "HoursDone",
                table: "Wages",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
