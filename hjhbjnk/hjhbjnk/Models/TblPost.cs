using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblPost
    {
        public TblPost()
        {
            TblWorker = new HashSet<TblWorker>();
        }

        public int IdPost { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblWorker> TblWorker { get; set; }
    }
}
