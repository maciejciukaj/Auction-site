﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AuctionContext))]
    partial class AuctionContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("API.Models.Advertisment", b =>
                {
                    b.Property<long>("AdvertismentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("AdvertismentId"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Price")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("VehicleId")
                        .HasColumnType("bigint");

                    b.HasKey("AdvertismentId");

                    b.HasIndex("UserId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Advertisments");
                });

            modelBuilder.Entity("API.Models.Auction", b =>
                {
                    b.Property<long>("AuctionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("AuctionId"));

                    b.Property<string>("AuctionWinner")
                        .HasColumnType("text");

                    b.Property<string>("CurrentBidder")
                        .HasColumnType("text");

                    b.Property<float>("CurrentPrice")
                        .HasColumnType("real");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("End")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsFinished")
                        .HasColumnType("boolean");

                    b.Property<string>("Owner")
                        .HasColumnType("text");

                    b.Property<DateTime>("Start")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long?>("VehicleId")
                        .HasColumnType("bigint");

                    b.HasKey("AuctionId");

                    b.HasIndex("UserId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Auctions");
                });

            modelBuilder.Entity("API.Models.Offer", b =>
                {
                    b.Property<long>("OfferId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("OfferId"));

                    b.Property<long?>("AuctionId")
                        .HasColumnType("bigint");

                    b.Property<float>("OfferAmount")
                        .HasColumnType("real");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("OfferId");

                    b.HasIndex("AuctionId");

                    b.HasIndex("UserId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("UserId"));

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Models.Vehicle", b =>
                {
                    b.Property<long>("VehicleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("VehicleId"));

                    b.Property<string>("Brand")
                        .HasColumnType("text");

                    b.Property<string>("Color")
                        .HasColumnType("text");

                    b.Property<float>("Engine")
                        .HasColumnType("real");

                    b.Property<bool>("IsCrashed")
                        .HasColumnType("boolean");

                    b.Property<int>("Mileage")
                        .HasColumnType("integer");

                    b.Property<string>("Model")
                        .HasColumnType("text");

                    b.Property<int>("Power")
                        .HasColumnType("integer");

                    b.Property<int>("ProductionYear")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("VehicleId");

                    b.HasIndex("UserId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("API.Models.Advertisment", b =>
                {
                    b.HasOne("API.Models.User", "User")
                        .WithMany("Advertisments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.Vehicle", "Vehicle")
                        .WithMany("Advertisments")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("API.Models.Auction", b =>
                {
                    b.HasOne("API.Models.User", "User")
                        .WithMany("Auctions")
                        .HasForeignKey("UserId");

                    b.HasOne("API.Models.Vehicle", "Vehicle")
                        .WithMany("Auctions")
                        .HasForeignKey("VehicleId");

                    b.Navigation("User");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("API.Models.Offer", b =>
                {
                    b.HasOne("API.Models.Auction", "Auction")
                        .WithMany("Offers")
                        .HasForeignKey("AuctionId");

                    b.HasOne("API.Models.User", "User")
                        .WithMany("Offers")
                        .HasForeignKey("UserId");

                    b.Navigation("Auction");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Vehicle", b =>
                {
                    b.HasOne("API.Models.User", "User")
                        .WithMany("Vehicles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Auction", b =>
                {
                    b.Navigation("Offers");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Navigation("Advertisments");

                    b.Navigation("Auctions");

                    b.Navigation("Offers");

                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("API.Models.Vehicle", b =>
                {
                    b.Navigation("Advertisments");

                    b.Navigation("Auctions");
                });
#pragma warning restore 612, 618
        }
    }
}
