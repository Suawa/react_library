using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblGroup
    {
        public TblGroup()
        {
            TblStudent = new HashSet<TblStudent>();
        }

        public int IdGroup { get; set; }
        public int DirectionId { get; set; }
        public string Name { get; set; }

        public virtual TblDirection Direction { get; set; }
        public virtual ICollection<TblStudent> TblStudent { get; set; }
    }
}
