using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Repositories
{
    public class Repository<T> where T:class, IRepository<T>
    {
        private readonly DbContext _context;
        public Repository(DbContext context)
        {
            _context = context;
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().AsEnumerable();
        }
        public T GetFirst(Func<T,bool> func)
        {
            return _context.Set<T>().First(func);
        }
        public T Add(T entity)
        {
            _context.Set<T>().Add(entity);
            return entity;
        }

        public IEnumerable<T> AddRange(IEnumerable<T> entities)
        {
            _context.Set<T>().AddRange(entities);
            return entities;
        }

        public T Find(int id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Remove(T entity)
        {
            _context.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
        }

        public T Update(int id, Func<T, T> modifyFunc)
        {
            var obj = Find(id);
            var res = modifyFunc(obj);
            return res;
        }

        public T UpdateAndSave(int id, Func<T, T> modifyFunc)
        {
            var obj = Find(id);
            var res = modifyFunc(obj);
            _context.SaveChanges();
            return res;
        }

        public IEnumerable<T> Where(Func<T, bool> func)
        {
            return _context.Set<T>().Where(func);
        }

        public DbSet<T> Set()
        {
            return _context.Set<T>();
        }
    }
}
