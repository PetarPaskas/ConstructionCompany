using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstructionCompany.DataContext.Migrations
{
    public partial class ConfigurtingClientConstructionSiteRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientConstructionSite");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "ConstructionSites",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConstructionSites_ClientId",
                table: "ConstructionSites",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_ConstructionSites_Clients_ClientId",
                table: "ConstructionSites",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConstructionSites_Clients_ClientId",
                table: "ConstructionSites");

            migrationBuilder.DropIndex(
                name: "IX_ConstructionSites_ClientId",
                table: "ConstructionSites");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "ConstructionSites",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ClientConstructionSite",
                columns: table => new
                {
                    ClientsClientId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ConstructionSitesConstructionSiteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientConstructionSite", x => new { x.ClientsClientId, x.ConstructionSitesConstructionSiteId });
                    table.ForeignKey(
                        name: "FK_ClientConstructionSite_Clients_ClientsClientId",
                        column: x => x.ClientsClientId,
                        principalTable: "Clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientConstructionSite_ConstructionSites_ConstructionSitesConstructionSiteId",
                        column: x => x.ConstructionSitesConstructionSiteId,
                        principalTable: "ConstructionSites",
                        principalColumn: "ConstructionSiteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientConstructionSite_ConstructionSitesConstructionSiteId",
                table: "ClientConstructionSite",
                column: "ConstructionSitesConstructionSiteId");
        }
    }
}
