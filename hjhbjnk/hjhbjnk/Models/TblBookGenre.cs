using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblBookGenre
    {
        public int BookId { get; set; }
        public int GenreId { get; set; }

        public virtual TblBook Book { get; set; }
        public virtual TblGenre Genre { get; set; }
    }
}
