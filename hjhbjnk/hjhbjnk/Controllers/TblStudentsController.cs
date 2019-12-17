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
    public class TblStudentsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblStudentsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblStudents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblStudent>>> GetTblStudent()
        {
            return await _context.TblStudent.ToListAsync();
        }

        // GET: api/TblStudents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblStudent>> GetTblStudent(int id)
        {
            var tblStudent = await _context.TblStudent.FindAsync(id);

            if (tblStudent == null)
            {
                return NotFound();
            }

            return tblStudent;
        }

        // PUT: api/TblStudents/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblStudent(int id, TblStudent tblStudent)
        {
            if (id != tblStudent.IdStudent)
            {
                return BadRequest();
            }

            _context.Entry(tblStudent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblStudentExists(id))
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

        // POST: api/TblStudents
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblStudent>> PostTblStudent(TblStudent tblStudent)
        {
            _context.TblStudent.Add(tblStudent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblStudent", new { id = tblStudent.IdStudent }, tblStudent);
        }

        // DELETE: api/TblStudents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblStudent>> DeleteTblStudent(int id)
        {
            var tblStudent = await _context.TblStudent.FindAsync(id);
            if (tblStudent == null)
            {
                return NotFound();
            }

            _context.TblStudent.Remove(tblStudent);
            await _context.SaveChangesAsync();

            return tblStudent;
        }

        private bool TblStudentExists(int id)
        {
            return _context.TblStudent.Any(e => e.IdStudent == id);
        }
    }
}
