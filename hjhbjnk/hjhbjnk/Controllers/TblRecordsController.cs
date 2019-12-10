using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hjhbjnk.Models;

namespace hjhbjnk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TblRecordsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblRecordsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblRecord>>> GetTblRecord()
        {
            return await _context.TblRecord.ToListAsync();
        }

        // GET: api/TblRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblRecord>> GetTblRecord(int id)
        {
            var tblRecord = await _context.TblRecord.FindAsync(id);

            if (tblRecord == null)
            {
                return NotFound();
            }

            return tblRecord;
        }

        // PUT: api/TblRecords/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblRecord(int id, TblRecord tblRecord)
        {
            if (id != tblRecord.IdRecord)
            {
                return BadRequest();
            }

            _context.Entry(tblRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblRecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TblRecords
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblRecord>> PostTblRecord(TblRecord tblRecord)
        {
            _context.TblRecord.Add(tblRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblRecord", new { id = tblRecord.IdRecord }, tblRecord);
        }

        // DELETE: api/TblRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblRecord>> DeleteTblRecord(int id)
        {
            var tblRecord = await _context.TblRecord.FindAsync(id);
            if (tblRecord == null)
            {
                return NotFound();
            }

            _context.TblRecord.Remove(tblRecord);
            await _context.SaveChangesAsync();

            return tblRecord;
        }

        private bool TblRecordExists(int id)
        {
            return _context.TblRecord.Any(e => e.IdRecord == id);
        }
    }
}
