using System;
using System.Collections.Generic;

namespace hjhbjnk.Models
{
    public partial class TblBook
    {
        public TblBook()
        {
            TblBookAuthor = new HashSet<TblBookAuthor>();
            TblBookGenre = new HashSet<TblBookGenre>();
            TblRecord = new HashSet<TblRecord>();
        }

        public int IdBook { get; set; }
        public int PublisherId { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public int Count { get; set; }

        public virtual TblPublisher Publisher { get; set; }
        public virtual ICollection<TblBookAuthor> TblBookAuthor { get; set; }
        public virtual ICollection<TblBookGenre> TblBookGenre { get; set; }
        public virtual ICollection<TblRecord> TblRecord { get; set; }
    }
}
