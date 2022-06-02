using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class PopulateProfessions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO Professions(DisplayName, ProfessionCode) VALUES 
                                ('Električar',1), 
                                ('Moler',2), 
                                ('Pomoćni radnik',3), 
                                ('Keramičar',4), 
                                ('Zidar',5), 
                                ('Tesar',6), 
                                ('Rukovoditelj gradilišta',7)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Professions");
        }
    }
}
