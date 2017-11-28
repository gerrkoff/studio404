using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;
using Microsoft.EntityFrameworkCore;

namespace Studio404.Dal.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly DbContext _context;

        public Repository(DbContext context)
        {
            _context = context;
            
        }

        private DbSet<T> Entities => _context.Set<T>();

        public IQueryable<T> GetAll()
        {
            return Entities.AsQueryable();
        }

        public void Save(T entity)
        {
            if(entity.Id == 0)
            {
                Entities.Add(entity);
            }
            _context.SaveChanges();
        }

        public void SaveProperties(T entity, params Expression<Func<T, object>>[] properties)
        {
            if (entity.Id == 0)
            {
                return;
            }

            Entities.Attach(entity);

            foreach (var property in properties)
            {
                _context.Entry(entity).Property(property).IsModified = true;
            }
            
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = Activator.CreateInstance<T>();
            entity.Id = id;
            Entities.Attach(entity);
            Entities.Remove(entity);
            _context.SaveChanges();
        }

        public T GetById(int id)
        {
            return Entities.Find(id);
        }
    }
}