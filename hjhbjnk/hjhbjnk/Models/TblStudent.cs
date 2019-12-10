using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblStudent
    {
        public TblStudent()
        {
            TblRecord = new HashSet<TblRecord>();
        }

        public int IdStudent { get; set; }
        public int GroupId { get; set; }
        public string FullName { get; set; }
        public string Telephone { get; set; }
        public string CsNumber { get; set; }
        public DateTime DateCs { get; set; }
        public string CrNumber { get; set; }
        public DateTime? DateCr { get; set; }

        public virtual TblGroup Group { get; set; }
        public virtual ICollection<TblRecord> TblRecord { get; set; }
    }
}
