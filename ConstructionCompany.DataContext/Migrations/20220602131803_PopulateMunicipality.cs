using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class PopulateMunicipality : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Municipalities(DisplayName, MunicipalityCode) VALUES ('Inđija',1), ('Beograd',2), ('Novi Sad', 3), ('Zrenjanin',4)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Municipalities");
        }
    }
}
