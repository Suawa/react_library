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
    public class TblPostsController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblPostsController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblPost>>> GetTblPost()
        {
            return await _context.TblPost.ToListAsync();
        }

        // GET: api/TblPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblPost>> GetTblPost(int id)
        {
            var tblPost = await _context.TblPost.FindAsync(id);

            if (tblPost == null)
            {
                return NotFound();
            }

            return tblPost;
        }

        // PUT: api/TblPosts/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblPost(int id, TblPost tblPost)
        {
            if (id != tblPost.IdPost)
            {
                return BadRequest();
            }

            _context.Entry(tblPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblPostExists(id))
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

        // POST: api/TblPosts
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TblPost>> PostTblPost(TblPost tblPost)
        {
            _context.TblPost.Add(tblPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblPost", new { id = tblPost.IdPost }, tblPost);
        }

        // DELETE: api/TblPosts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblPost>> DeleteTblPost(int id)
        {
            var tblPost = await _context.TblPost.FindAsync(id);
            if (tblPost == null)
            {
                return NotFound();
            }

            _context.TblPost.Remove(tblPost);
            await _context.SaveChangesAsync();

            return tblPost;
        }

        private bool TblPostExists(int id)
        {
            return _context.TblPost.Any(e => e.IdPost == id);
        }
    }
}
