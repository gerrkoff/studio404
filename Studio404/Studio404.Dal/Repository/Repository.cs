﻿using System;
using System.Linq;
using System.Linq.Expressions;
using Studio404.Dal.Entity.Base;

namespace Studio404.Dal.Repository
{
    class Repository<T> : IRepository<T> where T : IEntity
    {
        public IQueryable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Save(T entity)
        {
            throw new NotImplementedException();
        }

        public void SaveProperties(T entity, params Expression<Func<T, object>>[] roperties)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}