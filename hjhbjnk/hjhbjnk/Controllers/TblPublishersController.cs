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
    public class TblPublishersController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblPublishersController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblPublishers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblPublisher>>> GetTblPublisher()
        {
            return await _context.TblPublisher.ToListAsync();
        }

        // GET: api/TblPublishers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblPublisher>> GetTblPublisher(int id)
        {
            var tblPublisher = await _context.TblPublisher.FindAsync(id);

            if (tblPublisher == null)
            {
                return NotFound();
            }

            return tblPublisher;
        }

        // PUT: api/TblPublishers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblPublisher(int id, TblPublisher tblPublisher)
        {
            if (id != tblPublisher.IdPublisher)
            {
                return BadRequest();
            }

            _context.Entry(tblPublisher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblPublisherExists(id))
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

        // POST: api/TblPublishers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblPublisher>> PostTblPublisher(TblPublisher tblPublisher)
        {
            _context.TblPublisher.Add(tblPublisher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblPublisher", new { id = tblPublisher.IdPublisher }, tblPublisher);
        }

        // DELETE: api/TblPublishers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblPublisher>> DeleteTblPublisher(int id)
        {
            var tblPublisher = await _context.TblPublisher.FindAsync(id);
            if (tblPublisher == null)
            {
                return NotFound();
            }

            _context.TblPublisher.Remove(tblPublisher);
            await _context.SaveChangesAsync();

            return tblPublisher;
        }

        private bool TblPublisherExists(int id)
        {
            return _context.TblPublisher.Any(e => e.IdPublisher == id);
        }
    }
}
