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
    public class TblWorkersController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblWorkersController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblWorkers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblWorker>>> GetTblWorker()
        {
            return await _context.TblWorker.Include(x=>x.Post).ToListAsync();
        }

        // GET: api/TblWorkers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblWorker>> GetTblWorker(int id)
        {
            var tblWorker = await _context.TblWorker.FindAsync(id);

            if (tblWorker == null)
            {
                return NotFound();
            }

            return tblWorker;
        }

        // PUT: api/TblWorkers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblWorker(int id, TblWorker tblWorker)
        {
            if (id != tblWorker.IdWorker)
            {
                return BadRequest();
            }

            _context.Entry(tblWorker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblWorkerExists(id))
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

        // POST: api/TblWorkers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblWorker>> PostTblWorker(TblWorker tblWorker)
        {
            _context.TblWorker.Add(tblWorker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblWorker", new { id = tblWorker.IdWorker }, tblWorker);
        }

        // DELETE: api/TblWorkers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblWorker>> DeleteTblWorker(int id)
        {
            var tblWorker = await _context.TblWorker.FindAsync(id);
            if (tblWorker == null)
            {
                return NotFound();
            }

            _context.TblWorker.Remove(tblWorker);
            await _context.SaveChangesAsync();

            return tblWorker;
        }

        private bool TblWorkerExists(int id)
        {
            return _context.TblWorker.Any(e => e.IdWorker == id);
        }
    }
}
