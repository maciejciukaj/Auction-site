using API.Models;


namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);
        Task<bool> SaveAllAsync();

        Task<IEnumerable<User>> GetUsersAsync();

        Task<User> GetUserByIdAsync(long id);

        Task<User> GetUserByUsernameAsync(string username);





    }
}