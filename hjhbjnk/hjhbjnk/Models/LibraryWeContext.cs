using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace hjhbjnk.Models
{
    public partial class LibraryWeContext : DbContext
    {
        public LibraryWeContext()
        {
        }

        public LibraryWeContext(DbContextOptions<LibraryWeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAuthor> TblAuthor { get; set; }
        public virtual DbSet<TblBook> TblBook { get; set; }
        public virtual DbSet<TblBookAuthor> TblBookAuthor { get; set; }
        public virtual DbSet<TblBookGenre> TblBookGenre { get; set; }
        public virtual DbSet<TblDirection> TblDirection { get; set; }
        public virtual DbSet<TblGenre> TblGenre { get; set; }
        public virtual DbSet<TblGroup> TblGroup { get; set; }
        public virtual DbSet<TblInstitute> TblInstitute { get; set; }
        public virtual DbSet<TblPost> TblPost { get; set; }
        public virtual DbSet<TblPublisher> TblPublisher { get; set; }
        public virtual DbSet<TblRecord> TblRecord { get; set; }
        public virtual DbSet<TblStudent> TblStudent { get; set; }
        public virtual DbSet<TblWorker> TblWorker { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=LAPTOP-UKDS7GI6\\SQLEXPRESS01;Database=LibraryWe;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblAuthor>(entity =>
            {
                entity.HasKey(e => e.IdAuthor)
                    .HasName("PK_Author");

                entity.ToTable("tblAuthor");

                entity.Property(e => e.IdAuthor).HasColumnName("ID_Author");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TblBook>(entity =>
            {
                entity.HasKey(e => e.IdBook)
                    .HasName("PK_Book");

                entity.ToTable("tblBook");

                entity.Property(e => e.IdBook).HasColumnName("ID_Book");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PublisherId).HasColumnName("Publisher_ID");

                entity.HasOne(d => d.Publisher)
                    .WithMany(p => p.TblBook)
                    .HasForeignKey(d => d.PublisherId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Book_Publisher");
            });

            modelBuilder.Entity<TblBookAuthor>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.AuthorId })
                    .HasName("PK_Book_Author");

                entity.ToTable("tblBook_Author");

                entity.Property(e => e.BookId).HasColumnName("Book_ID");

                entity.Property(e => e.AuthorId).HasColumnName("Author_ID");

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.TblBookAuthor)
                    .HasForeignKey(d => d.AuthorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Book_Author_Author");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.TblBookAuthor)
                    .HasForeignKey(d => d.BookId)
                    .HasConstraintName("FK_Book_Author_Book");
            });

            modelBuilder.Entity<TblBookGenre>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.GenreId })
                    .HasName("PK_Book_Genre");

                entity.ToTable("tblBook_Genre");

                entity.Property(e => e.BookId).HasColumnName("Book_ID");

                entity.Property(e => e.GenreId).HasColumnName("Genre_ID");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.TblBookGenre)
                    .HasForeignKey(d => d.BookId)
                    .HasConstraintName("FK_Book_Genre_Book");

                entity.HasOne(d => d.Genre)
                    .WithMany(p => p.TblBookGenre)
                    .HasForeignKey(d => d.GenreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Book_Genre_Genre");
            });

            modelBuilder.Entity<TblDirection>(entity =>
            {
                entity.HasKey(e => e.IdDirection)
                    .HasName("PK_Direction");

                entity.ToTable("tblDirection");

                entity.Property(e => e.IdDirection).HasColumnName("ID_Direction");

                entity.Property(e => e.InstituteId).HasColumnName("Institute_ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Institute)
                    .WithMany(p => p.TblDirection)
                    .HasForeignKey(d => d.InstituteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Direction_Institute");
            });

            modelBuilder.Entity<TblGenre>(entity =>
            {
                entity.HasKey(e => e.IdGenre)
                    .HasName("PK_Table_1");

                entity.ToTable("tblGenre");

                entity.Property(e => e.IdGenre).HasColumnName("ID_Genre");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<TblGroup>(entity =>
            {
                entity.HasKey(e => e.IdGroup)
                    .HasName("PK_Group");

                entity.ToTable("tblGroup");

                entity.Property(e => e.IdGroup).HasColumnName("ID_Group");

                entity.Property(e => e.DirectionId).HasColumnName("Direction_ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Direction)
                    .WithMany(p => p.TblGroup)
                    .HasForeignKey(d => d.DirectionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Group_Direction");
            });

            modelBuilder.Entity<TblInstitute>(entity =>
            {
                entity.HasKey(e => e.IdInstitute)
                    .HasName("PK_Institute");

                entity.ToTable("tblInstitute");

                entity.Property(e => e.IdInstitute).HasColumnName("ID_Institute");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TblPost>(entity =>
            {
                entity.HasKey(e => e.IdPost)
                    .HasName("PK_Post");

                entity.ToTable("tblPost");

                entity.Property(e => e.IdPost).HasColumnName("ID_Post");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<TblPublisher>(entity =>
            {
                entity.HasKey(e => e.IdPublisher)
                    .HasName("PK_Publisher");

                entity.ToTable("tblPublisher");

                entity.Property(e => e.IdPublisher).HasColumnName("ID_Publisher");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<TblRecord>(entity =>
            {
                entity.HasKey(e => e.IdRecord)
                    .HasName("PK_Record");

                entity.ToTable("tblRecord");

                entity.Property(e => e.IdRecord).HasColumnName("ID_Record");

                entity.Property(e => e.BookId).HasColumnName("Book_ID");

                entity.Property(e => e.DateOfIssue)
                    .HasColumnName("Date_of_issue")
                    .HasColumnType("date");

                entity.Property(e => e.DateOfIssueF)
                    .HasColumnName("Date_of_issue_F")
                    .HasColumnType("date");

                entity.Property(e => e.DateOfIssueP)
                    .HasColumnName("Date_of_issue_P")
                    .HasColumnType("date");

                entity.Property(e => e.Isbn)
                    .IsRequired()
                    .HasColumnName("ISBN")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.StudentId).HasColumnName("Student_ID");

                entity.Property(e => e.WorkerId).HasColumnName("Worker_ID");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.TblRecord)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Record_Book");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.TblRecord)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Record_Student");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.TblRecord)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Record_Worker");
            });

            modelBuilder.Entity<TblStudent>(entity =>
            {
                entity.HasKey(e => e.IdStudent)
                    .HasName("PK_Student");

                entity.ToTable("tblStudent");

                entity.Property(e => e.IdStudent).HasColumnName("ID_Student");

                entity.Property(e => e.CrNumber)
                    .HasColumnName("CR_number")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CsNumber)
                    .IsRequired()
                    .HasColumnName("CS_number")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateCr)
                    .HasColumnName("Date_CR")
                    .HasColumnType("date");

                entity.Property(e => e.DateCs)
                    .HasColumnName("Date_CS")
                    .HasColumnType("date");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("Full_name")
                    .HasMaxLength(50);

                entity.Property(e => e.GroupId).HasColumnName("Group_ID");

                entity.Property(e => e.Telephone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.TblStudent)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Group");
            });

            modelBuilder.Entity<TblWorker>(entity =>
            {
                entity.HasKey(e => e.IdWorker)
                    .HasName("PK_Worker");

                entity.ToTable("tblWorker");

                entity.Property(e => e.IdWorker).HasColumnName("ID_Worker");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("Full_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.PostId).HasColumnName("Post_ID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.TblWorker)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Worker_Post");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
