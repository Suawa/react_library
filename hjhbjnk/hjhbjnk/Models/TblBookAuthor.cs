using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblBookAuthor
    {
        public int BookId { get; set; }
        public int AuthorId { get; set; }

        public virtual TblAuthor Author { get; set; }
        public virtual TblBook Book { get; set; }
    }
}
