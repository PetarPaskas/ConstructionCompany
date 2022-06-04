using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class PopulateCities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO Cities(DisplayName, CityCode, MunicipalityId) VALUES
                                    ('Beograd', 1,(SELECT MunicipalityId FROM Municipalities WHERE MunicipalityCode = 2)),
                                    ('Novi Sad', 2,(SELECT MunicipalityId FROM Municipalities WHERE MunicipalityCode = 3)),
                                    ('Inđija', 3, (SELECT MunicipalityId FROM Municipalities WHERE MunicipalityCode = 1)),
                                    ('Slankamen', 4, (SELECT MunicipalityId FROM Municipalities WHERE MunicipalityCode = 1)),
                                    ('Zrenjanin', 5, (SELECT MunicipalityId FROM Municipalities WHERE MunicipalityCode = 4))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Cities");
        }
    }
}
