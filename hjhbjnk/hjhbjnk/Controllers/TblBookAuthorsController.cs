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
    public class TblBookAuthorsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblBookAuthorsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblBookAuthors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblBookAuthor>>> GetTblBookAuthor()
        {
            return await _context.TblBookAuthor.ToListAsync();
        }

        // GET: api/TblBookAuthors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblBookAuthor>> GetTblBookAuthor(int id)
        {
            var tblBookAuthor = await _context.TblBookAuthor.FindAsync(id);

            if (tblBookAuthor == null)
            {
                return NotFound();
            }

            return tblBookAuthor;
        }

        // PUT: api/TblBookAuthors/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblBookAuthor(int id, TblBookAuthor tblBookAuthor)
        {
            if (id != tblBookAuthor.BookId)
            {
                return BadRequest();
            }

            _context.Entry(tblBookAuthor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblBookAuthorExists(id))
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

        // POST: api/TblBookAuthors
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //костыль возвращающий лишь статус одного эмелемнта
        [HttpPost]
        public async Task<ActionResult<TblBookAuthor>> PostTblBookAuthor(List<TblBookAuthor> tblBookAuthorList)
        {
            foreach (TblBookAuthor tblBookAuthor in tblBookAuthorList)
            {
                _context.TblBookAuthor.Add(tblBookAuthor);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (TblBookAuthorExists(tblBookAuthor.BookId))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return CreatedAtAction("GetTblBookAuthor", new { id = tblBookAuthorList[0].BookId }, tblBookAuthorList[0]);
        }

        // DELETE: api/TblBookAuthors/5
        //[HttpDelete("{id}&{ida}")]
        public async Task<ActionResult<TblBookAuthor>> DeleteTblBookAuthor(List<TblBookAuthor> tblBookAuthorList)
        {
            foreach (TblBookAuthor tblBookAuthor in tblBookAuthorList)
            {
                var tblBookAuthorFind = await _context.TblBookAuthor.FindAsync(tblBookAuthor.BookId, tblBookAuthor.AuthorId);
                if (tblBookAuthorFind == null)
                {
                    return NotFound();
                }

                _context.TblBookAuthor.Remove(tblBookAuthorFind);
                await _context.SaveChangesAsync();
            }
            return tblBookAuthorList[0];
        }

        private bool TblBookAuthorExists(int id)
        {
            return _context.TblBookAuthor.Any(e => e.BookId == id);
        }
    }
}
