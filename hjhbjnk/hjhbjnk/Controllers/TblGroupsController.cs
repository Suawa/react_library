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
    public class TblGroupsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblGroupsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblGroup>>> GetTblGroup()
        {
            return await _context.TblGroup.Include(x=>x.Direction).ToListAsync();
        }

        // GET: api/TblGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblGroup>> GetTblGroup(int id)
        {
            var tblGroup = await _context.TblGroup.FindAsync(id);

            if (tblGroup == null)
            {
                return NotFound();
            }

            return tblGroup;
        }

        // PUT: api/TblGroups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblGroup(int id, TblGroup tblGroup)
        {
            if (id != tblGroup.IdGroup)
            {
                return BadRequest();
            }

            _context.Entry(tblGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblGroupExists(id))
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

        // POST: api/TblGroups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblGroup>> PostTblGroup(TblGroup tblGroup)
        {
            _context.TblGroup.Add(tblGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblGroup", new { id = tblGroup.IdGroup }, tblGroup);
        }

        // DELETE: api/TblGroups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblGroup>> DeleteTblGroup(int id)
        {
            var tblGroup = await _context.TblGroup.FindAsync(id);
            if (tblGroup == null)
            {
                return NotFound();
            }

            _context.TblGroup.Remove(tblGroup);
            await _context.SaveChangesAsync();

            return tblGroup;
        }

        private bool TblGroupExists(int id)
        {
            return _context.TblGroup.Any(e => e.IdGroup == id);
        }
    }
}
