using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblAuthor
    {
        public TblAuthor()
        {
            TblBookAuthor = new HashSet<TblBookAuthor>();
        }

        public int IdAuthor { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblBookAuthor> TblBookAuthor { get; set; }
    }
}
