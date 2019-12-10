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
    public class TblBooksController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblBooksController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblBook>>> GetTblBook()
        {
            return await _context.TblBook.Include(x => x.TblBookGenre)
                /*.ThenInclude(tg=>tg.Genre.Name)*/
            .Include(pub => pub.Publisher)
            .ToArrayAsync();

           /* return await _context.TblBook.Select(book => new TblBook
             {
                
             }
            ).ToListAsync();*/
        }

        // GET: api/TblBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblBook>> GetTblBook(int id)
        {
            var tblBook = await _context.TblBook.FindAsync(id);

            if (tblBook == null)
            {
                return NotFound();
            }

            return tblBook;
        }

        // PUT: api/TblBooks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblBook(int id, TblBook tblBook)
        {
            if (id != tblBook.IdBook)
            {
                return BadRequest();
            }

            _context.Entry(tblBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblBookExists(id))
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

        // POST: api/TblBooks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblBook>> PostTblBook(TblBook tblBook)
        {
            _context.TblBook.Add(tblBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblBook", new { id = tblBook.IdBook }, tblBook);
        }

        // DELETE: api/TblBooks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblBook>> DeleteTblBook(int id)
        {
            var tblBook = await _context.TblBook.FindAsync(id);
            if (tblBook == null)
            {
                return NotFound();
            }

            _context.TblBook.Remove(tblBook);
            await _context.SaveChangesAsync(true);

            return tblBook;
        }

        private bool TblBookExists(int id)
        {
            return _context.TblBook.Any(e => e.IdBook == id);
        }
    }
}
