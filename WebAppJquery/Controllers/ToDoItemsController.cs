using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAppJquery.Models;

namespace WebAppJquery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToDoItemsController(AppDbContext context)
        {
            _context = context;
            if (_context.ToDoItems.Count() == 0)
            {
                _context.ToDoItems.Add(new ToDoItem { Name = "TodoItem1" });
                _context.SaveChanges();
            }

        }
        [HttpGet]
        public ActionResult<List<ToDoItem>> GetAll()
        {
            return _context.ToDoItems.ToList();
        }
        [HttpGet("{id}", Name = "GetToDo")]
        public ActionResult<ToDoItem> getById(int id)
        {
            var item = _context.ToDoItems.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public ActionResult Create(ToDoItem item)
        {
            _context.ToDoItems.Add(item);
            _context.SaveChanges();
            return CreatedAtRoute("GetToDo", new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, ToDoItem item)
        {
            var toDoItem = _context.ToDoItems.Find(id);
            if (toDoItem == null)
            {
                return NotFound();
            }
            toDoItem.IsComplete = item.IsComplete;
            toDoItem.Name = item.Name;
            _context.ToDoItems.Update(toDoItem);
            _context.SaveChanges();
            return NoContent();

        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var toDoItem = _context.ToDoItems.Find(id);
            if (toDoItem == null)
            {
                return NotFound();
            }
            _context.ToDoItems.Remove(toDoItem);
            _context.SaveChanges();
            return NoContent();
        }

    }
}
