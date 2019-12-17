using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblWorker
    {
        public TblWorker()
        {
            TblRecord = new HashSet<TblRecord>();
        }

        public int IdWorker { get; set; }
        public int PostId { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }

        public virtual TblPost Post { get; set; }
        public virtual ICollection<TblRecord> TblRecord { get; set; }
    }
}
