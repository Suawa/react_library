﻿using System;
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
    public class TblBookGenresController : ControllerBase
    {
        private readonly LibraryWeContext _context;

        public TblBookGenresController(LibraryWeContext context)
        {
            _context = context;
        }

        // GET: api/TblBookGenres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblBookGenre>>> GetTblBookGenre()
        {
            return await _context.TblBookGenre.ToListAsync();
        }

        // GET: api/TblBookGenres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblBookGenre>> GetTblBookGenre(int id)
        {
            var tblBookGenre = await _context.TblBookGenre.FindAsync(id);

            if (tblBookGenre == null)
            {
                return NotFound();
            }

            return tblBookGenre;
        }

        // PUT: api/TblBookGenres/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblBookGenre(int id, TblBookGenre tblBookGenre)
        {
            if (id != tblBookGenre.BookId)
            {
                return BadRequest();
            }

            _context.Entry(tblBookGenre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblBookGenreExists(id))
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

        // POST: api/TblBookGenres
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //костыль возвращающий лишь статус одного эмелемнта
        [HttpPost]
        public async Task<ActionResult<TblBookGenre>> PostTblBookGenre(List<TblBookGenre> tblBookGenreList)
        {
            foreach (TblBookGenre tblBookGenre in tblBookGenreList)
            { 
                _context.TblBookGenre.Add(tblBookGenre);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    
                }
            }
            return CreatedAtAction("GetTblBookGenre", new { id = tblBookGenreList[0].BookId }, tblBookGenreList[0]);
        }

        // DELETE: api/TblBookGenres/5
        //[HttpDelete("{id}&{idg}")]
        public async Task<ActionResult<TblBookGenre>> DeleteTblBookGenre(List<TblBookGenre> tblBookGenreList)
        {
            foreach (TblBookGenre tblBookGenre in tblBookGenreList)
            {
                var tblBookGenreFind = await _context.TblBookGenre.FindAsync(tblBookGenre.BookId, tblBookGenre.GenreId);
                if (tblBookGenreFind == null)
                {
                    return NotFound();
                }

                _context.TblBookGenre.Remove(tblBookGenreFind);
                await _context.SaveChangesAsync();           
            }
            return tblBookGenreList[0];
        }

        private bool TblBookGenreExists(int id)
        {
            return _context.TblBookGenre.Any(e => e.BookId == id);
        }
    }
}
