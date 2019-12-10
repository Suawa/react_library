using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblRecord
    {
        public int IdRecord { get; set; }
        public int StudentId { get; set; }
        public int BookId { get; set; }
        public int WorkerId { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime DateOfIssueP { get; set; }
        public DateTime? DateOfIssueF { get; set; }
        public string Isbn { get; set; }

        public virtual TblBook Book { get; set; }
        public virtual TblStudent Student { get; set; }
        public virtual TblWorker Worker { get; set; }
    }
}
