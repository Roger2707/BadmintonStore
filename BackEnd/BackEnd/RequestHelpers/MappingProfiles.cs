using AutoMapper;
using BackEnd.DTOs;
using BackEnd.Entities;

namespace BackEnd.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateCategoryDTO, Category>();
            CreateMap<UpdateCategoryDTO, Category>();

            CreateMap<CreateBrandDTO, Brand>();
            CreateMap<UpdateBrandDTO, Brand>();

            CreateMap<CreateProductDTO, Product>();
            CreateMap<UpdateProductDTO, Product>();
        }
    }
}
