using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblInstitute
    {
        public TblInstitute()
        {
            TblDirection = new HashSet<TblDirection>();
        }

        public int IdInstitute { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblDirection> TblDirection { get; set; }
    }
}
