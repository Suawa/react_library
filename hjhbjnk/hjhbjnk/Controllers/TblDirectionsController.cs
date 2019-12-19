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
    public class TblDirectionsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblDirectionsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblDirections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblDirection>>> GetTblDirection()
        {
            return await _context.TblDirection.Include(x=>x.Institute).ToListAsync();
        }

        // GET: api/TblDirections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblDirection>> GetTblDirection(int id)
        {
            var tblDirection = await _context.TblDirection.FindAsync(id);

            if (tblDirection == null)
            {
                return NotFound();
            }

            return tblDirection;
        }

        // PUT: api/TblDirections/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblDirection(int id, TblDirection tblDirection)
        {
            if (id != tblDirection.IdDirection)
            {
                return BadRequest();
            }

            _context.Entry(tblDirection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblDirectionExists(id))
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

        // POST: api/TblDirections
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblDirection>> PostTblDirection(TblDirection tblDirection)
        {
            _context.TblDirection.Add(tblDirection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblDirection", new { id = tblDirection.IdDirection }, tblDirection);
        }

        // DELETE: api/TblDirections/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblDirection>> DeleteTblDirection(int id)
        {
            var tblDirection = await _context.TblDirection.FindAsync(id);
            if (tblDirection == null)
            {
                return NotFound();
            }

            _context.TblDirection.Remove(tblDirection);
            await _context.SaveChangesAsync();

            return tblDirection;
        }

        private bool TblDirectionExists(int id)
        {
            return _context.TblDirection.Any(e => e.IdDirection == id);
        }
    }
}
