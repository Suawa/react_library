using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblGenre
    {
        public TblGenre()
        {
            TblBookGenre = new HashSet<TblBookGenre>();
        }

        public int IdGenre { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblBookGenre> TblBookGenre { get; set; }
    }
}
