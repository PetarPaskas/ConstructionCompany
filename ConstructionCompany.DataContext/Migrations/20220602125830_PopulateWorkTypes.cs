using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class PopulateWorkTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO WorkTypes(DisplayName, WorkTypeCode) VALUES ('Povremeno',1), ('Stalno',2), ('Ugovor',3), ('Dogovor',4)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM WorkTypes");
        }
    }
}
