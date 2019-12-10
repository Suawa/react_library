using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblDirection
    {
        public TblDirection()
        {
            TblGroup = new HashSet<TblGroup>();
        }

        public int IdDirection { get; set; }
        public int InstituteId { get; set; }
        public string Name { get; set; }

        public virtual TblInstitute Institute { get; set; }
        public virtual ICollection<TblGroup> TblGroup { get; set; }
    }
}
