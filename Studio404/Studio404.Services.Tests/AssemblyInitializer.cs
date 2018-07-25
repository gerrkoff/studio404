using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Studio404.Automapper;

namespace Studio404.Services.Tests
{
    [TestClass]
    public class AssemblyInitializer
    {
        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
        }

        [TestMethod]
        public void Empty()
        {
            
        }
    }
}