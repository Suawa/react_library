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
    public class TblInstitutesController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblInstitutesController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblInstitutes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblInstitute>>> GetTblInstitute()
        {
            return await _context.TblInstitute.ToListAsync();
        }

        // GET: api/TblInstitutes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblInstitute>> GetTblInstitute(int id)
        {
            var tblInstitute = await _context.TblInstitute.FindAsync(id);

            if (tblInstitute == null)
            {
                return NotFound();
            }

            return tblInstitute;
        }

        // PUT: api/TblInstitutes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblInstitute(int id, TblInstitute tblInstitute)
        {
            if (id != tblInstitute.IdInstitute)
            {
                return BadRequest();
            }

            _context.Entry(tblInstitute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblInstituteExists(id))
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

        // POST: api/TblInstitutes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblInstitute>> PostTblInstitute(TblInstitute tblInstitute)
        {
            _context.TblInstitute.Add(tblInstitute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblInstitute", new { id = tblInstitute.IdInstitute }, tblInstitute);
        }

        // DELETE: api/TblInstitutes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblInstitute>> DeleteTblInstitute(int id)
        {
            var tblInstitute = await _context.TblInstitute.FindAsync(id);
            if (tblInstitute == null)
            {
                return NotFound();
            }

            _context.TblInstitute.Remove(tblInstitute);
            await _context.SaveChangesAsync();

            return tblInstitute;
        }

        private bool TblInstituteExists(int id)
        {
            return _context.TblInstitute.Any(e => e.IdInstitute == id);
        }
    }
}
