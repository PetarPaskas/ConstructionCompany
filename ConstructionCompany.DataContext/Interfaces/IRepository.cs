using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConstructionCompany.DataContext.Interfaces
{
    public interface IRepository<T> where T : class 
    {
        public T Add(T entity);
        public IEnumerable<T> AddRange(IEnumerable<T> entities);
        public Task<IEnumerable<T>> AddRangeAndSaveAsync(IEnumerable<T> entities);
        public void Remove(T entity);
        public void RemoveRange(IEnumerable<T> entities);
        public T Find(int id);
        public IEnumerable<T> Where(Func<T, bool> func);
        public T Update(int id, Func<T, T> modifyFunc);
        public T UpdateAndSave(int id, Func<T, T> modifyFunc);
        public IEnumerable<T> GetAll();
        public T GetFirst(Func<T, bool> func);
        public DbSet<T> Set();

    }
}
