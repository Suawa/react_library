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
    public class TblAuthorsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblAuthorsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblAuthors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblAuthor>>> GetTblAuthor()
        {
            return await _context.TblAuthor.ToListAsync();
        }

        // GET: api/TblAuthors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblAuthor>> GetTblAuthor(int id)
        {
            var tblAuthor = await _context.TblAuthor.FindAsync(id);

            if (tblAuthor == null)
            {
                return NotFound();
            }

            return tblAuthor;
        }

        // PUT: api/TblAuthors/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblAuthor(int id, TblAuthor tblAuthor)
        {
            if (id != tblAuthor.IdAuthor)
            {
                return BadRequest();
            }

            _context.Entry(tblAuthor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblAuthorExists(id))
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

        // POST: api/TblAuthors
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblAuthor>> PostTblAuthor(TblAuthor tblAuthor)
        {
            _context.TblAuthor.Add(tblAuthor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblAuthor", new { id = tblAuthor.IdAuthor }, tblAuthor);
        }

        // DELETE: api/TblAuthors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblAuthor>> DeleteTblAuthor(int id)
        {
            var tblAuthor = await _context.TblAuthor.FindAsync(id);
            if (tblAuthor == null)
            {
                return NotFound();
            }

            _context.TblAuthor.Remove(tblAuthor);
            await _context.SaveChangesAsync();

            return tblAuthor;
        }

        private bool TblAuthorExists(int id)
        {
            return _context.TblAuthor.Any(e => e.IdAuthor == id);
        }
    }
}
