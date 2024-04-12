using Api.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(IProductService service, IUserService service2, JWTservice jwtservice) : ControllerBase
    {
        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] int offset,[FromQuery] int number, [FromQuery] string category  )
        {
            return await service.GetNumberOfLatestProductsByOffset(offset, number, category);
        }
        [HttpGet("categories")] 
        public async Task<ActionResult<IEnumerable<string>>> GetAllCategories()
        {
            return await service.GetAllProductCategories();
        }


        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await service.GetProductByID(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        
        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ProductDto dto)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);
                
                var user =  service2.GetUserById(userId);
                
                var product =  await service.CreateProduct(dto.Name, dto.Description, dto.Price, dto.Condition, dto.Category, user);
                
                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
                    
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
            
        }
        /*
        // PUT: api/Product/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            context.Entry(product).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            context.Product.Remove(product);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return context.Product.Any(e => e.Id == id);
        }*/
    }
}
