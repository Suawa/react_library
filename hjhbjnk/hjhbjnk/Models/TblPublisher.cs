using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblPublisher
    {
        public TblPublisher()
        {
            TblBook = new HashSet<TblBook>();
        }

        public int IdPublisher { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblBook> TblBook { get; set; }
    }
}
